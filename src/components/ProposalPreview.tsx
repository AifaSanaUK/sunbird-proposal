import { forwardRef } from "react";
import logo from "@/assets/sunbird-logo.png";
import systemFlow from "@/assets/system-flow.png";
import hybridFlow from "@/assets/hybrid-system-flow.png";
import seal from "@/assets/company-seal.png";
import coverImage from "@/assets/proposal-cover.png";
import whatWeDo from "@/assets/what-we-do.png";
import type { ProposalData } from "@/lib/proposal-defaults";

const Header = () => (
  <div className="flex items-center justify-between border-b-4 border-brand pb-1 mb-4">
    <img src={logo} alt="Sunbird Power Solutions" className="h-32 object-contain" />
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
      {/* Page 1: Cover image */}
      <div
        className="proposal-page relative bg-white text-foreground mx-auto shadow-lg overflow-hidden"
        style={{ width: "210mm", height: "297mm", padding: 0 }}
      >
        <img
          src={coverImage}
          alt="Business Proposal Cover"
          className="block"
          style={{ width: "210mm", height: "297mm", objectFit: "fill" }}
        />
      </div>

      {/* Page 2: Client details + cover letter + What We Do image */}
      <Page>
        <Header />
        <div className="text-sm space-y-1 mb-6">
          <div><span className="font-semibold">To:</span> {data.clientName || "________________"}</div>
          <div><span className="font-semibold">Place:</span> {data.place || "________________"}</div>
          <div><span className="font-semibold">Date:</span> {data.date || "____/____/______"}</div>
        </div>

        <h1 className="text-xl font-extrabold text-brand-dark text-center my-4 leading-tight tracking-tight">
          PROPOSAL FOR {data.capacityKwp || "___"}-KWP {data.systemType} SOLAR POWER PLANT
        </h1>

        <p className="text-[13px] leading-relaxed mb-2">Dear Sir/Madam,</p>
        <p className="text-[13px] leading-relaxed text-left mb-2" style={{ wordSpacing: "normal", hyphens: "none" }}>
          First and foremost, we sincerely thank you for giving us the opportunity to assess your property and evaluate
          your power consumption requirements. After carefully understanding your energy needs and reviewing the site
          layout, we are pleased to present our Solar Power System Proposal. This system has been thoughtfully designed
          to significantly reduce your electricity expenses while providing a reliable and uninterrupted power source,
          subject to usage remaining within the assessed load values.
        </p>
        <p className="text-[13px] leading-relaxed text-left mb-2" style={{ wordSpacing: "normal", hyphens: "none" }}>
          Our proposed solution aims to deliver long-term cost savings while supporting a cleaner, greener, and more
          sustainable energy future. Should you require any further clarification or technical details, please feel
          free to contact us. We look forward to serving you and helping you make a smart investment in sustainable
          energy.
        </p>
        <div className="text-[13px] mt-1 mb-3 leading-relaxed">
          <div className="font-semibold">Warm Regards,</div>
          <div>Sunbird Power Solutions</div>
          <div>Mob: 8136888101</div>
        </div>

        <div className="flex justify-center">
          <img src={whatWeDo} alt="What We Do — Solar Installation, System Design, Maintenance, Consulting" className="w-full object-contain block" />
        </div>
      </Page>

      {/* Page 2: BOM */}
      <Page>
        <Header />
        <SectionTitle>Bill of Material</SectionTitle>
        <table className="w-full text-[10px] border-collapse" style={{ tableLayout: 'fixed', wordBreak: 'break-word' }}>
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '28%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '24%' }} />
          </colgroup>
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th className="border border-brand-dark px-2 py-4 text-center align-middle leading-relaxed">No</th>
              <th className="border border-brand-dark px-2 py-4 text-left align-middle leading-relaxed">Particular</th>
              <th className="border border-brand-dark px-2 py-4 text-left align-middle leading-relaxed">Specification</th>
              <th className="border border-brand-dark px-2 py-4 text-left align-middle leading-relaxed">Make</th>
            </tr>
          </thead>
          <tbody>
            {data.bom.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-brand/5" : ""}>
                <td className="border border-brand/30 px-2 py-4 text-center align-middle leading-relaxed">{i + 1}</td>
                <td className="border border-brand/30 px-2 py-4 align-middle leading-relaxed">{row.particular}</td>
                <td className="border border-brand/30 px-2 py-4 align-middle leading-relaxed">{row.specification}</td>
                <td className="border border-brand/30 px-2 py-4 align-middle leading-relaxed">{row.make}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>Generation Calculation</SectionTitle>
        <div className="text-sm bg-brand/10 border border-brand/30 rounded p-3">
          Unit generation per sunny day: <span className="font-bold text-brand-dark">Average {data.unitsPerSunnyDay} units</span>
        </div>
      </Page>

      {/* Page 3: Project cost */}
      <Page>
        <Header />
        <SectionTitle>Project Cost</SectionTitle>
        <div className="text-sm font-semibold mb-2">{data.capacityKwp}KWP {data.systemType} SOLAR POWER PLANT</div>
        <table className="w-full text-[10px] border-collapse mb-6" style={{ tableLayout: 'fixed', wordBreak: 'break-word' }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '70%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th className="border border-brand-dark px-2 py-4 text-center align-middle leading-relaxed">SL.NO</th>
              <th className="border border-brand-dark px-2 py-4 text-left align-middle leading-relaxed">Particulars</th>
              <th className="border border-brand-dark px-2 py-4 text-right align-middle leading-relaxed">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.projectCost.map((c, i) => (
              <tr key={i}>
                <td className="border border-brand/30 px-2 py-4 text-center align-middle leading-relaxed">{i + 1}</td>
                <td className="border border-brand/30 px-2 py-4 align-middle leading-relaxed">{c.particular}</td>
                <td className="border border-brand/30 px-2 py-4 text-right align-middle leading-relaxed">{c.amount}</td>
              </tr>
            ))}
            <tr className="bg-brand/15 font-bold">
              <td colSpan={2} className="border border-brand-dark px-2 py-5 text-right align-middle text-[9px] leading-relaxed">TOTAL SYSTEM COST TO BE PAID BY CUSTOMER</td>
              <td className="border border-brand-dark px-2 py-5 text-right align-middle leading-relaxed">{data.totalSystemCost}</td>
            </tr>
          </tbody>
        </table>

        <SectionTitle>For Grid Connectivity</SectionTitle>
        <table className="w-full text-[10px] border-collapse mb-6" style={{ tableLayout: 'fixed', wordBreak: 'break-word' }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '70%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th className="border border-brand-dark px-2 py-4 text-center align-middle leading-relaxed">SL.NO</th>
              <th className="border border-brand-dark px-2 py-4 text-left align-middle leading-relaxed">Particulars</th>
              <th className="border border-brand-dark px-2 py-4 text-right align-middle leading-relaxed">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.gridCost.map((c, i) => (
              <tr key={i}>
                <td className="border border-brand/30 px-2 py-4 text-center align-middle leading-relaxed">{i + 1}</td>
                <td className="border border-brand/30 px-2 py-4 align-middle leading-relaxed">{c.particular}</td>
                <td className="border border-brand/30 px-2 py-4 text-right align-middle leading-relaxed">{c.amount}</td>
              </tr>
            ))}
            <tr className="bg-brand/15 font-bold">
              <td colSpan={2} className="border border-brand-dark px-2 py-5 text-right align-middle leading-relaxed">TOTAL AMOUNT</td>
              <td className="border border-brand-dark px-2 py-5 text-right align-middle leading-relaxed">{data.gridTotal}</td>
            </tr>
          </tbody>
        </table>

        <SectionTitle>How Your System Works</SectionTitle>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {(data.systemType === "Hybrid"
            ? [
              "Generation greater than consumption — power home and charge battery for night use",
              "Generation less than consumption — use stored battery energy to minimize grid imports",
              "Grid Outage / Night — seamless switch to battery backup for 24/7 power security",
            ]
            : [
              "Generation greater than consumption — export excess units to utility grid",
              "Generation less than consumption — use solar units and import additional units from utility grid",
              "Night — import electricity from utility grid",
            ]
          ).map((t, i) => (
            <div key={i} className="border border-brand/40 rounded p-2 bg-brand/5 text-center">{t}</div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <img src={data.systemType === "Hybrid" ? hybridFlow : systemFlow} alt="System flow diagram" className="w-full max-w-[520px] object-contain" />
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
        <table
          className="w-full text-[11px] border-collapse mb-6"
          style={{ tableLayout: "fixed", wordBreak: "break-word" }}
        >
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "65%" }} />
          </colgroup>
          <tbody>
            {[
              { label: "Bank", value: data.bank.bank },
              { label: "Branch", value: data.bank.branch },
              { label: "Account Number", value: data.bank.accountNumber },
              { label: "Account Name", value: data.bank.accountName },
              { label: "Ifsc Code", value: data.bank.ifsc },
            ].map((row, i) => (
              <tr key={i}>
                <td
                  className="border border-brand/40 px-3 py-3 font-bold align-middle"
                  style={{ backgroundColor: "#dbeeff" }}
                >
                  {row.label}
                </td>
                <td className="border border-brand/40 px-3 py-3 align-middle">
                  {row.value}
                </td>
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
        <p className="text-sm font-semibold mb-10">Thanking you and assuring you of our best services.</p>

        <div className="mt-12 flex justify-end">
          <div className="text-center min-w-[240px]">
            <div className="flex justify-center">
              <img src={seal} alt="Company Seal" className="h-32 w-32 object-contain" />
            </div>
            <div className="text-sm font-bold text-brand-dark mt-3">{data.companyName || "Sunbird Power Solutions"}</div>
            <div className="text-xs text-foreground/70 mt-1">Date: {data.date}</div>
          </div>
        </div>
      </Page>
    </div>
  );
});
ProposalPreview.displayName = "ProposalPreview";
