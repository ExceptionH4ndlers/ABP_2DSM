import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportChartToPDF = async (elementId: string, fileName: string) => {
  const chartElement = document.getElementById(elementId);
  if (!chartElement) {
    console.error(`Elemento com id "${elementId}" não encontrado`);
    return;
  }

  // Captura o gráfico como imagem
  const canvas = await html2canvas(chartElement, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  // Cria o PDF
  const pdf = new jsPDF("landscape", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Ajusta a imagem ao tamanho do PDF
  pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);

  // Nome descritivo com timestamp
  const finalName = `${fileName}_${new Date().toISOString().split("T")[0]}.pdf`;

  pdf.save(finalName);
};