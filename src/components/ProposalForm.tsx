import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trash2, Plus } from "lucide-react";
import type { ProposalData } from "@/lib/proposal-defaults";

type Props = { data: ProposalData; onChange: (d: ProposalData) => void };

export const ProposalForm = ({ data, onChange }: Props) => {
  const set = <K extends keyof ProposalData>(k: K, v: ProposalData[K]) => onChange({ ...data, [k]: v });

  return (
    <Card className="p-5 space-y-5">
      <div>
        <h3 className="font-bold text-brand-dark mb-3">Client Details</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Client Name</Label><Input value={data.clientName} onChange={e => set("clientName", e.target.value)} placeholder="Mr/Ms. ..." /></div>
          <div><Label>Place</Label><Input value={data.place} onChange={e => set("place", e.target.value)} /></div>
          <div><Label>Date</Label><Input type="date" value={data.date} onChange={e => set("date", e.target.value)} /></div>
          <div><Label>Capacity (kWp)</Label><Input value={data.capacityKwp} onChange={e => set("capacityKwp", e.target.value)} /></div>
          <div className="col-span-2"><Label>Units / sunny day</Label><Input value={data.unitsPerSunnyDay} onChange={e => set("unitsPerSunnyDay", e.target.value)} /></div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["pricing"]}>
        <AccordionItem value="pricing">
          <AccordionTrigger className="font-semibold">Pricing</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {data.projectCost.map((c, i) => (
              <div key={i} className="grid grid-cols-[1fr_140px_auto] gap-2 items-end">
                <Input value={c.particular} onChange={e => { const n = [...data.projectCost]; n[i] = { ...n[i], particular: e.target.value }; set("projectCost", n); }} />
                <Input value={c.amount} placeholder="₹" onChange={e => { const n = [...data.projectCost]; n[i] = { ...n[i], amount: e.target.value }; set("projectCost", n); }} />
                <Button variant="ghost" size="icon" onClick={() => set("projectCost", data.projectCost.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => set("projectCost", [...data.projectCost, { particular: "", amount: "" }])}><Plus className="h-4 w-4 mr-1" />Add row</Button>
            <div><Label>Total system cost</Label><Input value={data.totalSystemCost} onChange={e => set("totalSystemCost", e.target.value)} placeholder="₹" /></div>

            <div className="pt-3 border-t">
              <div className="font-medium mb-2 text-sm">Grid connectivity</div>
              {data.gridCost.map((c, i) => (
                <div key={i} className="grid grid-cols-[1fr_140px_auto] gap-2 items-end mb-2">
                  <Input value={c.particular} onChange={e => { const n = [...data.gridCost]; n[i] = { ...n[i], particular: e.target.value }; set("gridCost", n); }} />
                  <Input value={c.amount} placeholder="₹" onChange={e => { const n = [...data.gridCost]; n[i] = { ...n[i], amount: e.target.value }; set("gridCost", n); }} />
                  <Button variant="ghost" size="icon" onClick={() => set("gridCost", data.gridCost.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => set("gridCost", [...data.gridCost, { particular: "", amount: "" }])}><Plus className="h-4 w-4 mr-1" />Add row</Button>
              <div className="mt-2"><Label>Grid total</Label><Input value={data.gridTotal} onChange={e => set("gridTotal", e.target.value)} placeholder="₹" /></div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bom">
          <AccordionTrigger className="font-semibold">Bill of Materials ({data.bom.length})</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {data.bom.map((b, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
                <Input placeholder="Particular" value={b.particular} onChange={e => { const n = [...data.bom]; n[i] = { ...n[i], particular: e.target.value }; set("bom", n); }} />
                <Input placeholder="Specification" value={b.specification} onChange={e => { const n = [...data.bom]; n[i] = { ...n[i], specification: e.target.value }; set("bom", n); }} />
                <Input placeholder="Make" value={b.make} onChange={e => { const n = [...data.bom]; n[i] = { ...n[i], make: e.target.value }; set("bom", n); }} />
                <Button variant="ghost" size="icon" onClick={() => set("bom", data.bom.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => set("bom", [...data.bom, { particular: "", specification: "", make: "" }])}><Plus className="h-4 w-4 mr-1" />Add item</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bank">
          <AccordionTrigger className="font-semibold">Bank Details</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-3">
            <div><Label>Bank</Label><Input value={data.bank.bank} onChange={e => set("bank", { ...data.bank, bank: e.target.value })} /></div>
            <div><Label>Branch</Label><Input value={data.bank.branch} onChange={e => set("bank", { ...data.bank, branch: e.target.value })} /></div>
            <div><Label>Account #</Label><Input value={data.bank.accountNumber} onChange={e => set("bank", { ...data.bank, accountNumber: e.target.value })} /></div>
            <div><Label>Account Name</Label><Input value={data.bank.accountName} onChange={e => set("bank", { ...data.bank, accountName: e.target.value })} /></div>
            <div className="col-span-2"><Label>IFSC</Label><Input value={data.bank.ifsc} onChange={e => set("bank", { ...data.bank, ifsc: e.target.value })} /></div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms">
          <AccordionTrigger className="font-semibold">Exclusions / Terms / Warranty</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div><Label>Exclusions & Inclusions (one per line)</Label>
              <Textarea rows={6} value={data.exclusions.join("\n")} onChange={e => set("exclusions", e.target.value.split("\n"))} /></div>
            <div><Label>Terms & Conditions (one per line)</Label>
              <Textarea rows={8} value={data.terms.join("\n")} onChange={e => set("terms", e.target.value.split("\n"))} /></div>
            <div><Label>Warranty (one per line)</Label>
              <Textarea rows={4} value={data.warranty.join("\n")} onChange={e => set("warranty", e.target.value.split("\n"))} /></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
