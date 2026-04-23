import { forwardRef } from "react";
import logo from "@/assets/sunbird-logo.png";
import type { ProposalData } from "@/lib/proposal-defaults";

const Header = () => (
  <div className="flex items-center justify-between border-b-4 border-brand pb-3 mb-6">
    <img src={logo} alt="Sunbird Power Solutions" className="h-24 object-contain" />
    <div className="text-right text-[10px] leading-tight text-foreground/70">
      <div className="font-semibold text-brand-dark">SUNBIRD POWER SOLUTIONS</div>
      <div>First floor, AKN Arcade, Golf Link Road</div>
      <div>Chevayur, 673017, Calicut</div>
    </div>
  </div>
);

const Footer = () => (
  <div className="absolute bottom-6 left-12 right-12 border-t border-brand/30 pt-2 text-[9px] text-foreground/60 flex justify-between">
    <span>📞 8136888101</span>
    <span>✉ sunbirdpowersolution@gmail.com</span>
    <span>📍 First floor, AKN Arcade, Golf Link Road, Chevayur, 673017, Calicut</span>
  </div>
);

const Page = ({ children }: { children: React.ReactNode }) => (
  <div
    className="proposal-page relative bg-white text-foreground mx-auto shadow-lg"
    style={{ width: "210mm", minHeight: "297mm", padding: "16mm 12mm 22mm" }}
  >
    {children}
    <Footer />
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold text-brand-dark border-l-4 border-brand pl-3 mb-3 mt-2">{children}</h2>
);

export const ProposalPreview = forwardRef<HTMLDivElement, { data: ProposalData }>(({ data }, ref) => {
  return (
    <div ref={ref} className="space-y-4">
      {/* Page 1: Cover letter */}
      <Page>
        <Header />
        <div className="text-sm space-y-1 mb-6">
          <div><span className="font-semibold">To:</span> {data.clientName || "________________"}</div>
          <div><span className="font-semibold">Place:</span> {data.place || "________________"}</div>
          <div><span className="font-semibold">Date:</span> {data.date || "____/____/______"}</div>
        </div>

        <h1 className="text-2xl font-extrabold text-brand-dark text-center my-6 leading-tight">
          PROPOSAL FOR {data.capacityKwp || "___"}-KWP ON-GRID SOLAR POWER PLANT
        </h1>

        <p className="text-sm leading-relaxed mb-4">Dear Sir/Madam,</p>
        <p className="text-sm leading-relaxed text-justify mb-4">
          First and foremost, we sincerely thank you for giving us the opportunity to assess your property and evaluate
          your power consumption requirements. After carefully understanding your energy needs and reviewing the site
          layout, we are pleased to present our Solar Power System Proposal. This system has been thoughtfully designed
          to significantly reduce your electricity expenses while providing a reliable and uninterrupted power source,
          subject to usage remaining within the assessed load values.
        </p>
        <p className="text-sm leading-relaxed text-justify mb-4">
          Our proposed solution aims to deliver long-term cost savings while supporting a cleaner, greener, and more
          sustainable energy future. Should you require any further clarification or technical details, please feel
          free to contact us. We look forward to serving you and helping you make a smart investment in sustainable
          energy.
        </p>
        <div className="text-sm mt-8">
          <div className="font-semibold">Warm Regards,</div>
          <div>Sunbird Power Solutions</div>
          <div>Mob: 8136888101</div>
        </div>
      </Page>

      {/* Page 2: BOM */}
      <Page>
        <Header />
        <SectionTitle>Bill of Material</SectionTitle>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th className="border border-brand-dark px-2 py-1.5 w-10">No</th>
              <th className="border border-brand-dark px-2 py-1.5 text-left">Particular</th>
              <th className="border border-brand-dark px-2 py-1.5 text-left">Specification</th>
              <th className="border border-brand-dark px-2 py-1.5 text-left">Make</th>
            </tr>
          </thead>
          <tbody>
            {data.bom.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-brand/5" : ""}>
                <td className="border border-brand/30 px-2 py-1 text-center">{i + 1}</td>
                <td className="border border-brand/30 px-2 py-1">{row.particular}</td>
                <td className="border border-brand/30 px-2 py-1">{row.specification}</td>
                <td className="border border-brand/30 px-2 py-1">{row.make}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>Generation Calculation</SectionTitle>
        <div className="text-sm bg-brand/10 border border-brand/30 rounded p-3">
          Unit generation per sunny day: <span className="font-bold text-brand-dark">Up to {data.unitsPerSunnyDay} units</span>
        </div>
      </Page>

      {/* Page 3: Project cost */}
      <Page>
        <Header />
        <SectionTitle>Project Cost</SectionTitle>
        <div className="text-sm font-semibold mb-2">{data.capacityKwp}KWP ON-GRID SOLAR POWER PLANT</div>
        <table className="w-full text-xs border-collapse mb-6">
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th className="border border-brand-dark px-2 py-1.5 w-12">SL.NO</th>
              <th className="border border-brand-dark px-2 py-1.5 text-left">Particulars</th>
              <th className="border border-brand-dark px-2 py-1.5 w-32 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.projectCost.map((c, i) => (
              <tr key={i}>
                <td className="border border-brand/30 px-2 py-1.5 text-center">{i + 1}</td>
                <td className="border border-brand/30 px-2 py-1.5">{c.particular}</td>
                <td className="border border-brand/30 px-2 py-1.5 text-right">{c.amount}</td>
              </tr>
            ))}
            <tr className="bg-brand/15 font-bold">
              <td colSpan={2} className="border border-brand-dark px-2 py-2 text-right">TOTAL SYSTEM COST TO BE PAID BY CUSTOMER</td>
              <td className="border border-brand-dark px-2 py-2 text-right">{data.totalSystemCost}</td>
            </tr>
          </tbody>
        </table>

        <SectionTitle>For Grid Connectivity</SectionTitle>
        <table className="w-full text-xs border-collapse mb-6">
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th className="border border-brand-dark px-2 py-1.5 w-12">SL.NO</th>
              <th className="border border-brand-dark px-2 py-1.5 text-left">Particulars</th>
              <th className="border border-brand-dark px-2 py-1.5 w-32 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.gridCost.map((c, i) => (
              <tr key={i}>
                <td className="border border-brand/30 px-2 py-1.5 text-center">{i + 1}</td>
                <td className="border border-brand/30 px-2 py-1.5">{c.particular}</td>
                <td className="border border-brand/30 px-2 py-1.5 text-right">{c.amount}</td>
              </tr>
            ))}
            <tr className="bg-brand/15 font-bold">
              <td colSpan={2} className="border border-brand-dark px-2 py-2 text-right">TOTAL AMOUNT</td>
              <td className="border border-brand-dark px-2 py-2 text-right">{data.gridTotal}</td>
            </tr>
          </tbody>
        </table>

        <SectionTitle>How Your System Works</SectionTitle>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            "Generation greater than consumption — export excess units to utility grid",
            "Generation less than consumption — use solar units and import additional units from utility grid",
            "Night — import electricity from utility grid",
          ].map((t, i) => (
            <div key={i} className="border border-brand/40 rounded p-2 bg-brand/5 text-center">{t}</div>
          ))}
        </div>
      </Page>

      {/* Page 4: Exclusions + Bank */}
      <Page>
        <Header />
        <SectionTitle>Exclusions & Inclusions</SectionTitle>
        <ul className="list-disc pl-6 text-sm space-y-1 mb-6">
          {data.exclusions.map((e, i) => <li key={i}>{e}</li>)}
        </ul>

        <SectionTitle>Bank Details</SectionTitle>
        <table className="w-full text-sm border-collapse mb-6">
          <tbody>
            {[
              ["BANK", data.bank.bank],
              ["BRANCH", data.bank.branch],
              ["ACCOUNT NUMBER", data.bank.accountNumber],
              ["ACCOUNT NAME", data.bank.accountName],
              ["IFSC CODE", data.bank.ifsc],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="border border-brand/40 bg-brand/10 px-3 py-2 font-bold w-44">{k}</td>
                <td className="border border-brand/40 px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>Terms & Conditions</SectionTitle>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {data.terms.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </Page>

      {/* Page 5: Warranty + signature */}
      <Page>
        <Header />
        <SectionTitle>Warranty & Services</SectionTitle>
        <ul className="list-disc pl-6 text-sm space-y-1 mb-8">
          {data.warranty.map((w, i) => <li key={i}>{w}</li>)}
        </ul>

        <p className="text-sm mb-2">In case of any further information or clarification, please feel free to contact us.</p>
        <p className="text-sm font-semibold mb-12">Thanking you and assuring you of our best services.</p>

        <div className="grid grid-cols-2 gap-12 mt-16 text-sm">
          <div>
            <div className="font-bold underline mb-10">Client:</div>
            <div className="border-t border-foreground/40 pt-1">Name: {data.clientName}</div>
            <div className="border-t border-foreground/40 mt-6 pt-1">Signature</div>
            <div className="border-t border-foreground/40 mt-6 pt-1">Date: {data.date}</div>
          </div>
          <div>
            <div className="font-bold underline mb-10">Sunbird:</div>
            <div className="border-t border-foreground/40 pt-1">Name</div>
            <div className="border-t border-foreground/40 mt-6 pt-1">Signature</div>
            <div className="border-t border-foreground/40 mt-6 pt-1">Date</div>
          </div>
        </div>
      </Page>
    </div>
  );
});
ProposalPreview.displayName = "ProposalPreview";
