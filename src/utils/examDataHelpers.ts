import { ExamData } from "isncsci-ui/dist/esm/core/domain";
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export const exportPDF = async (examData: ExamData, name: string) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text('Exam Data', 10, 20);

    let yPosition = 30;
    doc.setFontSize(12);

    // Add exam data content
    for (const [key, value] of Object.entries(examData)) {
        doc.text(`${key}: ${value}`, 10, yPosition);
        yPosition += 10;
    
      // Check if a new page is needed
        if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
        }
        }
    
    if (Capacitor.isNativePlatform()) {
      // Running on iOS or Android
      // Generate the PDF as a Blob
        const pdfBlob = doc.output('blob');
    
        // Convert the Blob to Base64
        const base64Data = await convertBlobToBase64(pdfBlob);
    
        // Save the PDF file using Capacitor Filesystem
        try {
            const fileName = `${name}.pdf`;
            const result = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Documents,
            recursive: true,
            });
            console.log('PDF saved at:', result.uri);
            alert('PDF saved successfully!');
        } catch (error) {
            console.error('Error saving PDF:', error);
            alert('Failed to save PDF.');
        }
        } else {
        // Running in a web browser
        doc.save(`${name}.pdf`);
        }
    };
    
  // Helper function to convert Blob to Base64
const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
        };
        reader.readAsDataURL(blob);
    });
};