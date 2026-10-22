import { jsPDF } from 'jspdf';

export function downloadCertificatePDF(certificate) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor(250, 252, 255);
  doc.rect(0, 0, width, height, 'F');

  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(3);
  doc.rect(10, 10, width - 20, height - 20);

  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1);
  doc.rect(14, 14, width - 28, height - 28);

  const cornerSize = 12;
  doc.setFillColor(37, 99, 235);
  doc.triangle(10, 10, 10 + cornerSize, 10, 10, 10 + cornerSize, 'F');
  doc.triangle(width - 10, 10, width - 10 - cornerSize, 10, width - 10, 10 + cornerSize, 'F');
  doc.triangle(10, height - 10, 10 + cornerSize, height - 10, 10, height - 10 - cornerSize, 'F');
  doc.triangle(width - 10, height - 10, width - 10 - cornerSize, height - 10, width - 10, height - 10 - cornerSize, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(11, 31, 58);
  doc.text('EVENTFLOW COLLEGE OF ENGINEERING & TECHNOLOGY', width / 2, 32, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Affiliated to State University • Accredited Grade A+ • ISO 9001:2015 Certified', width / 2, 38, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(37, 99, 235);
  doc.text((certificate.title || 'CERTIFICATE OF PARTICIPATION').toUpperCase(), width / 2, 58, { align: 'center' });

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.line(width / 2 - 60, 64, width / 2 + 60, 64);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('This is proudly presented to', width / 2, 76, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text(certificate.studentName || 'Student Name', width / 2, 90, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text(`Roll No: ${certificate.rollNo || 'N/A'}  •  Department: ${certificate.department || 'N/A'}`, width / 2, 98, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text('for successful active participation and demonstrated commitment in the event', width / 2, 114, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(37, 99, 235);
  doc.text(`"${certificate.eventName || 'College Event'}"`, width / 2, 126, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Issued on: ${certificate.issueDate || new Date().toISOString().slice(0, 10)}`, width / 2, 136, { align: 'center' });

  const sigY = 170;

  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(35, sigY, 95, sigY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(certificate.organizerName || 'Event Coordinator', 65, sigY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Faculty Event Coordinator', 65, sigY + 11, { align: 'center' });

  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(254, 243, 199);
  doc.circle(width / 2, sigY + 2, 14, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(180, 83, 9);
  doc.text('OFFICIAL', width / 2, sigY + 1, { align: 'center' });
  doc.text('SEAL', width / 2, sigY + 5, { align: 'center' });

  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(width - 95, sigY, width - 35, sigY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(certificate.directorName || 'Dr. V. K. Verma', width - 65, sigY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Dean / College Principal', width - 65, sigY + 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Certificate ID: ${certificate.certificateNo || 'EF-2026-GEN'} • Verified EventFlow Academic Credential Record`, width / 2, 196, { align: 'center' });

  const safeFilename = `${certificate.studentName || 'Student'}_${certificate.eventName || 'Certificate'}.pdf`.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(safeFilename);
}
