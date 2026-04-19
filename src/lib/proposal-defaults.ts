export type BomItem = { particular: string; specification: string; make: string };
export type CostItem = { particular: string; amount: string };
export type BankDetails = { bank: string; branch: string; accountNumber: string; accountName: string; ifsc: string };

export type ProposalData = {
  // Client
  clientName: string;
  place: string;
  date: string;
  capacityKwp: string;
  // Generation
  unitsPerSunnyDay: string;
  // BOM
  bom: BomItem[];
  // Pricing
  projectCost: CostItem[];
  totalSystemCost: string;
  gridCost: CostItem[];
  gridTotal: string;
  // Bank
  bank: BankDetails;
  // Terms / warranty
  terms: string[];
  warranty: string[];
  exclusions: string[];
};

export const defaultProposal: ProposalData = {
  clientName: "",
  place: "",
  date: new Date().toISOString().slice(0, 10),
  capacityKwp: "5",
  unitsPerSunnyDay: "20",
  bom: [
    { particular: "Solar panel", specification: "MONOPERC HALF CUT DCR MODULE-540 WATT 9nos", make: "APS" },
    { particular: "Inverter", specification: "5KW 1 Phase", make: "APS" },
    { particular: "Panel structure for flat roof", specification: "With 1 meter panel height", make: "APPOLO/EQUIVALENT" },
    { particular: "Solar meter", specification: "1 phase", make: "Secure/L&T" },
    { particular: "DCDB", specification: "5kw 1 IN 2 OUT", make: "C&S/Havells/Finder" },
    { particular: "ACDB", specification: "220V, 50HZ", make: "C&S/Havells/Finder" },
    { particular: "DC Cable", specification: "4SQ - 30 meter", make: "Realcab/Polycab/Equivalent" },
    { particular: "AC cable", specification: "4SQ - 10 meter", make: "Realcab/RR/Equivalent" },
    { particular: "Earthing copper cable", specification: "10sq - 20 meter", make: "RR/Equivalent" },
    { particular: "Lightning arrester", specification: "As per standard", make: "Excel/Equivalent" },
    { particular: "Earthing rod", specification: "As per Standard", make: "Excel/Equivalent" },
    { particular: "Backfill compound bag (chemical)", specification: "20 kg", make: "Excel/Equivalent" },
    { particular: "L.A Down Conductor", specification: "50 mm", make: "Excel/Canberry" },
    { particular: "MC-4 connector", specification: "30A - 4 pair", make: "Elcom/Equivalent" },
    { particular: "PVC Wiring Pipe / Bend", specification: "As per Standard", make: "Supreme/Equivalent" },
    { particular: "End Clamp", specification: "As per Standard", make: "Crystal" },
    { particular: "Mid clamp", specification: "As per Standard", make: "Crystal" },
    { particular: "Cable Tie", specification: "300mm - 1pkt", make: "Snap Lock" },
    { particular: "Meter box", specification: "1 phase", make: "Snap Lock" },
  ],
  projectCost: [
    { particular: "System price after subsidy", amount: "" },
    { particular: "MNRE Subsidy Amount (credited to consumer bank account upon completion)", amount: "" },
  ],
  totalSystemCost: "",
  gridCost: [
    { particular: "Solar Registration Fees ₹1000 + GST/kW (paid extra to KSEB; 80% refundable after 6 months of energization & commissioning)", amount: "" },
  ],
  gridTotal: "",
  bank: { bank: "", branch: "", accountNumber: "", accountName: "Sunbird Power Solutions", ifsc: "" },
  exclusions: [
    "GST Included in the price (5% for solar module and inverter, 18% for other items and labor).",
    "Structure Cost (1m height) Included.",
    "KSEB Feasibility Charges Included.",
    "KSEB Registration Fee is Excluded (₹5900/-) (80% i.e. ₹4000/- refundable to the Customer from KSEB within 6 months after installation).",
    "Solar Meter Charge Included and Net Meter charge included.",
    "Design Charge is Included.",
  ],
  terms: [
    "The price quoted by SUNBIRD is valid for Seven (7) days only.",
    "Payment terms: 60% advance with confirmed work order, 30% after material delivery, 10% after installation and commissioning.",
    "All access and permits shall be provided by the customer.",
    "The customer must not interrupt the works; any delay or extra cost caused will be chargeable.",
    "Union interference / local labor issues shall be sorted out by the client.",
    "Customer is responsible for safety & security of materials until handed to SUNBIRD personnel for installation.",
    "This proposal is confidential and shall not be disclosed to any third party.",
    "Any modification due to non-conformity of KSEB / Central / Kerala Govt. standards shall be carried by the customer.",
    "Customer needs to pay additional amount for anything not included in this quotation.",
    "Natural calamities are not included in any product warranty.",
  ],
  warranty: [
    "Solar Inverter warranted by SUNWAYS — 10 Years.",
    "Solar PV Modules: PREMIER (As per MNRE standard) — 12-year manufacturer warranty and 25/30-year performance warranty as per the Module Manufacturer.",
    "Service — 5 Years free service (panel washing not included).",
  ],
};
