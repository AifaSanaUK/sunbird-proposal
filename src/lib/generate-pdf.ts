import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePdf(container: HTMLElement, filename: string) {
  const pages = Array.from(container.querySelectorAll<HTMLElement>(".proposal-page"));
  if (!pages.length) return;
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], { scale: 2, backgroundColor: "#ffffff", useCORS: true });
    const img = canvas.toDataURL("image/jpeg", 0.95);
    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 0, 0, pdfW, pdfH);
  }
  pdf.save(filename);
}
