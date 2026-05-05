import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, LogOut, RefreshCw } from "lucide-react";
import { defaultProposal, type ProposalData } from "@/lib/proposal-defaults";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalPreview } from "@/components/ProposalPreview";
import { generatePdf } from "@/lib/generate-pdf";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import logo from "@/assets/sunbird-logo.jpg";

const Index = () => {
  const [data, setData] = useState<ProposalData>(defaultProposal);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  const handleGenerate = async () => {
    if (!previewRef.current) return;
    setGenerating(true);
    try {
      const safe = (data.clientName || "client").replace(/[^a-z0-9]+/gi, "_");
      await generatePdf(previewRef.current, `Sunbird_Proposal_${safe}_${data.date}.pdf`);
      toast.success("PDF downloaded");
    } catch (e) {
      toast.error("Failed to generate PDF");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm" style={{height: '72px'}}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between relative gap-3">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <img src={logo} alt="Sunbird Power Solutions" className="h-6 sm:h-8 object-contain" />
          </div>
          {/* Center: Title — absolutely positioned to be truly centered */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center hidden sm:block">
            <h1 className="font-bold text-base leading-tight text-foreground">Proposal Generator</h1>
            <p className="text-xs text-muted-foreground">Fill details, preview live, download as PDF</p>
          </div>
          {/* Right: Buttons */}
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setData(defaultProposal)}>
              <RefreshCw className="h-4 w-4 sm:mr-1" /><span className="hidden sm:inline">Reset</span>
            </Button>
            <Button size="sm" onClick={handleGenerate} disabled={generating} className="bg-brand hover:bg-brand-dark text-brand-foreground">
              <Download className="h-4 w-4 sm:mr-1" /><span className="hidden sm:inline">{generating ? "Generating..." : "Generate PDF"}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6 grid lg:grid-cols-[420px_1fr] gap-6">
        <aside className="lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-72px)] lg:overflow-y-auto">
          <ProposalForm data={data} onChange={setData} />
        </aside>
        <section className="overflow-x-auto">
          <div className="origin-top scale-[0.85] lg:scale-100">
            <ProposalPreview ref={previewRef} data={data} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
