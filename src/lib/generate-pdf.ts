import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generate PDF reliably across desktop and mobile.
 * Mobile browsers shrink/scale layouts and use small viewports — that breaks
 * html2canvas (columns crash, text overlaps). Fix: clone the source into a
 * detached, fixed-width (210mm = 794px @ 96dpi) container so rendering is
 * deterministic and identical to desktop output.
 */
export async function generatePdf(container: HTMLElement, filename: string) {
  const A4_WIDTH_PX = 794; // 210mm at 96 DPI
  const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI

  // Build an offscreen stage at exact A4 width so mobile viewport doesn't matter
  const stage = document.createElement("div");
  stage.style.cssText = `
    position: fixed;
    left: -10000px;
    top: 0;
    width: ${A4_WIDTH_PX}px;
    background: #ffffff;
    z-index: -1;
    pointer-events: none;
  `;
  const clone = container.cloneNode(true) as HTMLElement;
  // Reset transforms/scales applied by responsive wrappers
  clone.style.transform = "none";
  clone.querySelectorAll<HTMLElement>("*").forEach((el) => {
    if (el.style.transform) el.style.transform = "none";
  });
  stage.appendChild(clone);
  document.body.appendChild(stage);

  // Wait one frame so layout/fonts settle
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  if ((document as any).fonts?.ready) {
    try { await (document as any).fonts.ready; } catch {}
  }

  try {
    const pages = Array.from(stage.querySelectorAll<HTMLElement>(".proposal-page"));
    if (!pages.length) return;

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const canvas = await html2canvas(page, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: A4_WIDTH_PX,
        windowHeight: A4_HEIGHT_PX,
        width: A4_WIDTH_PX,
        height: page.offsetHeight,
      });
      const img = canvas.toDataURL("image/jpeg", 0.95);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 0, 0, pdfW, pdfH);
    }
    pdf.save(filename);
  } finally {
    document.body.removeChild(stage);
  }
}
