
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import { formatDate } from './formatters';

// Type extension for autoTable
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export const exportToCSV = (data: any[], filename: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (
  title: string, 
  headers: string[], 
  rows: any[][], 
  summary?: { label: string; value: string }[]
) => {
  // Use any to avoid complex and often broken type definitions for jsPDF with plugins across different build environments
  const doc = new jsPDF() as any;
  const timestamp = formatDate(new Date().toISOString());

  // Branded Header
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.setFillColor(15, 23, 42); // slate-900
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.rect(0, 0, 210, 40, 'F');
  
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.setTextColor(255, 255, 255);
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.setFontSize(22);
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.setFont('helvetica', 'bold');
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.text('SwiftDrop Logistics', 15, 20);
  
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.setFontSize(10);
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.setFont('helvetica', 'normal');
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.text(`Report: ${title}`, 15, 30);
  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.text(`Generated: ${timestamp}`, 140, 30);

  // Summary Metrics Section
  if (summary) {
    // Fix: standard jsPDF method called via any cast to resolve property visibility error
    doc.setTextColor(15, 23, 42);
    // Fix: standard jsPDF method called via any cast to resolve property visibility error
    doc.setFontSize(12);
    // Fix: standard jsPDF method called via any cast to resolve property visibility error
    doc.setFont('helvetica', 'bold');
    // Fix: standard jsPDF method called via any cast to resolve property visibility error
    doc.text('Key Performance Indicators', 15, 55);
    
    let y = 65;
    summary.forEach(item => {
      // Fix: standard jsPDF method called via any cast to resolve property visibility error
      doc.setFontSize(10);
      // Fix: standard jsPDF method called via any cast to resolve property visibility error
      doc.setFont('helvetica', 'normal');
      // Fix: standard jsPDF method called via any cast to resolve property visibility error
      doc.text(`${item.label}:`, 15, y);
      // Fix: standard jsPDF method called via any cast to resolve property visibility error
      doc.setFont('helvetica', 'bold');
      // Fix: standard jsPDF method called via any cast to resolve property visibility error
      doc.text(item.value, 60, y);
      y += 8;
    });
  }

  // Data Table
  // Fix: autoTable method from plugin called via any cast to resolve property visibility error
  doc.autoTable({
    startY: summary ? 100 : 50,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] }, // blue-500
    styles: { fontSize: 8, cellPadding: 3 },
  });

  // Fix: standard jsPDF method called via any cast to resolve property visibility error
  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
};
