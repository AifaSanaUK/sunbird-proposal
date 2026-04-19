import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, RefreshCw } from "lucide-react";
import { defaultProposal, type ProposalData } from "@/lib/proposal-defaults";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalPreview } from "@/components/ProposalPreview";
import { generatePdf } from "@/lib/generate-pdf";
import { toast } from "sonner";

const Index = () => {
  const [data, setData] = useState<ProposalData>(defaultProposal);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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
      <header className="bg-gradient-to-r from-brand-dark to-brand text-brand-foreground sticky top-0 z-10 shadow-md">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            <div>
              <h1 className="font-bold text-lg leading-tight">Sunbird Proposal Generator</h1>
              <p className="text-xs opacity-90">Fill the details, preview live, download as PDF</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setData(defaultProposal)}>
              <RefreshCw className="h-4 w-4 mr-1" />Reset
            </Button>
            <Button size="sm" onClick={handleGenerate} disabled={generating} className="bg-white text-brand-dark hover:bg-white/90">
              <Download className="h-4 w-4 mr-1" />{generating ? "Generating..." : "Generate PDF"}
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
