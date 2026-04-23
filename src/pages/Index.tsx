import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, LogOut, RefreshCw } from "lucide-react";
import { defaultProposal, type ProposalData } from "@/lib/proposal-defaults";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalPreview } from "@/components/ProposalPreview";
import { generatePdf } from "@/lib/generate-pdf";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import logo from "@/assets/sunbird-logo.png";

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
      <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="Sunbird Power Solutions" className="h-16 sm:h-20 object-contain shrink-0" />
            <div className="hidden sm:block min-w-0">
              <h1 className="font-bold text-base leading-tight text-foreground truncate">Proposal Generator</h1>
              <p className="text-xs text-muted-foreground truncate">Fill details, preview live, download as PDF</p>
            </div>
          </div>
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
        <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
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
