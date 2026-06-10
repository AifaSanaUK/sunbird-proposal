import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProposalForm } from "../components/ProposalForm";
import { defaultProposal, type ProposalData } from "../lib/proposal-defaults";

describe("ProposalForm Capacity Change", () => {
  it("should update KSEB fees and BOM items when capacity is edited", () => {
    const mockOnChange = vi.fn();
    
    render(<ProposalForm data={defaultProposal} onChange={mockOnChange} />);
    
    // Find the Capacity (kWp) input field
    const capacityInput = screen.getByLabelText(/Capacity \(kWp\)/i);
    expect(capacityInput).toBeInTheDocument();
    
    // Simulate user changing capacity to "5"
    fireEvent.change(capacityInput, { target: { value: "5" } });
    
    // Check that onChange was called
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    
    const updatedData = mockOnChange.mock.calls[0][0] as ProposalData;
    expect(updatedData.capacityKwp).toBe("5");
    
    // Check DCDB BOM item update (should be 5KW)
    const dcdbItem = updatedData.bom.find(b => b.particular.toLowerCase() === "dcdb");
    expect(dcdbItem?.specification).toBe("5KW 1 IN 1 OUT");
    
    // Check Inverter BOM item update (should be 5KW)
    const inverterItem = updatedData.bom.find(b => b.particular.toLowerCase() === "inverter");
    expect(inverterItem?.specification).toBe("5KW 1 Phase");
    
    // Check KSEB registration fee update in exclusions:
    // 5kW * 1180 = 5900
    // 80% of 5kW * 1000 = 4000
    const ksebExclusion = updatedData.exclusions.find(ex => ex.includes("KSEB Registration Fee"));
    expect(ksebExclusion).toContain("₹5900/-");
    expect(ksebExclusion).toContain("₹4000/-");
  });

  it("should calculate correctly for 3kW capacity", () => {
    const mockOnChange = vi.fn();
    const customProposal = {
      ...defaultProposal,
      capacityKwp: "5",
      exclusions: defaultProposal.exclusions.map(ex => {
        if (ex.includes("KSEB Registration Fee")) {
          return "KSEB Registration Fee is Excluded (₹5900/-) (80% i.e. ₹4000/- refundable to the Customer from KSEB within 6 months after installation).";
        }
        return ex;
      })
    };
    
    render(<ProposalForm data={customProposal} onChange={mockOnChange} />);
    
    const capacityInput = screen.getByLabelText(/Capacity \(kWp\)/i);
    
    // Change capacity back to 3
    fireEvent.change(capacityInput, { target: { value: "3" } });
    
    const updatedData = mockOnChange.mock.calls[0][0] as ProposalData;
    expect(updatedData.capacityKwp).toBe("3");
    
    const dcdbItem = updatedData.bom.find(b => b.particular.toLowerCase() === "dcdb");
    expect(dcdbItem?.specification).toBe("3KW 1 IN 1 OUT");
    
    const ksebExclusion = updatedData.exclusions.find(ex => ex.includes("KSEB Registration Fee"));
    expect(ksebExclusion).toContain("₹3540/-");
    expect(ksebExclusion).toContain("₹2400/-");
  });

  it("should handle floating point capacity correctly (e.g. 3.5 kW)", () => {
    const mockOnChange = vi.fn();
    
    render(<ProposalForm data={defaultProposal} onChange={mockOnChange} />);
    
    const capacityInput = screen.getByLabelText(/Capacity \(kWp\)/i);
    
    // Change capacity to 3.5
    fireEvent.change(capacityInput, { target: { value: "3.5" } });
    
    const updatedData = mockOnChange.mock.calls[0][0] as ProposalData;
    expect(updatedData.capacityKwp).toBe("3.5");
    
    const dcdbItem = updatedData.bom.find(b => b.particular.toLowerCase() === "dcdb");
    expect(dcdbItem?.specification).toBe("3.5KW 1 IN 1 OUT");
    
    // 3.5 * 1180 = 4130
    // 3.5 * 800 = 2800
    const ksebExclusion = updatedData.exclusions.find(ex => ex.includes("KSEB Registration Fee"));
    expect(ksebExclusion).toContain("₹4130/-");
    expect(ksebExclusion).toContain("₹2800/-");
  });

  it("should handle intermediate empty input values (simulating backspace) and update correctly when a new number is typed", () => {
    const mockOnChange = vi.fn();
    
    const { rerender } = render(<ProposalForm data={defaultProposal} onChange={mockOnChange} />);
    const capacityInput = screen.getByLabelText(/Capacity \(kWp\)/i);
    
    // Simulate clearing the input (backspacing)
    fireEvent.change(capacityInput, { target: { value: "" } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    let updatedData = mockOnChange.mock.calls[0][0] as ProposalData;
    expect(updatedData.capacityKwp).toBe("");
    
    let dcdbItem = updatedData.bom.find(b => b.particular.toLowerCase() === "dcdb");
    expect(dcdbItem?.specification).toBe("KW 1 IN 1 OUT");
    
    // Rerender with the intermediate state
    rerender(<ProposalForm data={updatedData} onChange={mockOnChange} />);
    
    // Simulate user typing "5"
    mockOnChange.mockClear();
    fireEvent.change(capacityInput, { target: { value: "5" } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    updatedData = mockOnChange.mock.calls[0][0] as ProposalData;
    expect(updatedData.capacityKwp).toBe("5");
    
    dcdbItem = updatedData.bom.find(b => b.particular.toLowerCase() === "dcdb");
    expect(dcdbItem?.specification).toBe("5KW 1 IN 1 OUT");
  });
});
