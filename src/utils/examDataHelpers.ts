import { ExamData } from "isncsci-ui/dist/esm/core/domain";
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export const exportPDF = async (examData: ExamData, filename: string) => {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Function to convert rem units to mm
    const remToMm = (rem: number): number => {
        const baseFontSizePx = 16;
        const mmPerPx = 0.264583;
        return rem * baseFontSizePx * mmPerPx;
    };

    // Cell dims - to fit all on 1 page
    const cellWidth = remToMm(1.4); 
    const cellHeight = remToMm(1.4); 

    // Grid widths
    const numColsRight = 3; // observationsRight.length
    const gridWidth = numColsRight * cellWidth;

    // Starting positions for left and right grids (centered)
    const totalGridWidth = gridWidth * 2 + 60; // 60mm space between grids
    const startX = (pageWidth - totalGridWidth) / 2;

    const startXRight = startX;
    const startYRight = 20; 

    const startXLeft = startX + gridWidth + 60; // 60mm space between grids
    const startYLeft = 20; 

    // Sensory and motor levels
    const sensoryLevels = [
        'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'T1',
        'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9',
        'T10', 'T11', 'T12', 'L1', 'L2', 'L3', 'L4', 'L5',
        'S1', 'S2', 'S3', 'S4_5',
    ];

    const motorLevels = [
        'C5', 'C6', 'C7', 'C8', 'T1',
        'L2', 'L3', 'L4', 'L5', 'S1',
    ];

    // Observations for each side
    const observationsRight = ['M', 'LT', 'PP'];
    const observationsLeft = ['LT', 'PP', 'M']; 

    // Set cell border color
    doc.setDrawColor('#d9d9d9');

    // Helper function to draw a side grid
    const drawSideGrid = (
        side: 'Right' | 'Left',
        startX: number,
        startY: number,
        observations: string[],
    ) => {
        const numRows = sensoryLevels.length + 1;
        const numCols = observations.length;

        // Calculate x and y positions
        const getX = (colIndex: number): number => startX + colIndex * cellWidth;
        const getY = (rowIndex: number): number => startY + rowIndex * cellHeight;

        // Draw cells with borders and rounded corners
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const x = getX(col);
                const y = getY(row);
                doc.roundedRect(x, y, cellWidth, cellHeight, 0.5, 0.5, 'D');
            }
        }

        // Draw headers
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        // Side label at the top
        const sideLabelX = startX + gridWidth / 2;
        doc.text(side, sideLabelX, startY - cellHeight / 2, {
            align: 'center',
            baseline: 'middle',
        });

        // Observations headers
        observations.forEach((obs, index) => {
            const x = getX(index) + cellWidth / 2;
            const y = getY(0) + cellHeight / 2;
            doc.text(obs, x, y, { align: 'center', baseline: 'middle' });
        });

        // Draw level labels and populate cells
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
    
        sensoryLevels.forEach((level, rowIndex) => {
            const y = getY(rowIndex + 1) + cellHeight / 2;

            // Level label position
            let labelX: number;
            let align: 'left' | 'right';
            let displayLevel = level.replace('_', '/'); 

            if (side === 'Right') {
            // Level labels on the left of the grid
            labelX = startX - 2;
            align = 'right';
            } else {
            // Left side: Level labels on the right of the grid
            labelX = startX + gridWidth + 2;
            align = 'left';
            }
    
            // Draw level label
            doc.text(displayLevel, labelX, y, { align, baseline: 'middle' });
    
            observations.forEach((obs, obsIndex) => {
            const x = getX(obsIndex) + cellWidth / 2;
    
            // Determine observation type
            let obsType: 'Motor' | 'LightTouch' | 'PinPrick';
            if (obs === 'M') {
                obsType = 'Motor';
            } else if (obs === 'LT') {
                obsType = 'LightTouch';
            } else if (obs === 'PP') {
                obsType = 'PinPrick';
            } else {
                return;
            }
    
            // Skip motor observations for non-motor levels
            if (obsType === 'Motor' && !motorLevels.includes(level)) {
                return;
            }
    
            // Construct the key for examData
            const sideKey = side.toLowerCase();
            const key = `${sideKey}${obsType}${level}`;
    
            // Get the value from examData
            const value = (examData as Record<string, any>)[key];
            if (value !== null && value !== undefined) {
                doc.text(value.toString(), x, y, { align: 'center', baseline: 'middle' });
            }
            });
        });
    };

        // Grids for both sides
        drawSideGrid('Right', startXRight, startYRight, observationsRight);
        drawSideGrid('Left', startXLeft, startYLeft, observationsLeft);
    
        // VAC on the left side
        const vacX = startXRight;
        const vacY = startYRight + (sensoryLevels.length + 1) * cellHeight + 10; // 10mm below the grid
    
        // VAC value cells dimensions
        const vacCellWidth = cellWidth * 2; // double width for value
        const vacCellHeight = cellHeight;
    
        // Draw VAC cell borders
        doc.roundedRect(vacX, vacY, vacCellWidth, vacCellHeight, 0.5, 0.5, 'D'); 
    
        // Text for VAC
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Voluntary Anal Contraction (VAC):', vacX - 2, vacY + vacCellHeight / 2, {
        align: 'right',
        baseline: 'middle',
        });

        // VAC value aligned with the third cell
        const vacValueX = vacX + vacCellWidth + cellWidth / 2;
        const vacValue = examData.voluntaryAnalContraction ? 'Yes' : 'No';
        doc.text(vacValue, vacValueX, vacY + vacCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
        });
    
        // DAP on the right side
        const dapCellWidth = cellWidth * 2; // double width for value
        const dapCellHeight = cellHeight;
        const dapX = startXLeft + gridWidth - dapCellWidth; // Align to the right side of the grid
        const dapY = startYLeft + (sensoryLevels.length + 1) * cellHeight + 10; // 10mm below the grid
    
        // Draw DAP cell borders
        doc.roundedRect(dapX, dapY, dapCellWidth, dapCellHeight, 0.5, 0.5, 'D'); 
    
        // DAP value
        const dapValue = examData.deepAnalPressure ? 'Yes' : 'No';
        const dapValueX = dapX + dapCellWidth / 2;
        doc.text(dapValue, dapValueX, dapY + dapCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
        });
    
        // Text for DAP on the right side of its value
        doc.text('Deep Anal Pressure (DAP):', dapX + dapCellWidth + 2, dapY + dapCellHeight / 2, {
        align: 'left',
        baseline: 'middle',
        });
    
        // Lowest Non-Key Muscle with Motor Function
        const lnkY = Math.max(vacY, dapY) + dapCellHeight + 10; // 10mm below VAC and DAP
    
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
    
        const lnkText = 'Lowest Non-Key Muscle with Motor Function';
        doc.text(lnkText, pageWidth / 2, lnkY, {
        align: 'center',
        baseline: 'middle',
        });
    
        const lnkValueY = lnkY + 5;
    
        doc.text(`Right: ${examData.rightLowestNonKeyMuscleWithMotorFunction || ''}`, pageWidth / 2, lnkValueY, {
        align: 'center',
        baseline: 'middle',
        });
    
        doc.text(`Left: ${examData.leftLowestNonKeyMuscleWithMotorFunction || ''}`, pageWidth / 2, lnkValueY + 5, {
        align: 'center',
        baseline: 'middle',
        });
    
        // Comments and Cell Comments
        const commentsY = lnkValueY + 10; // 10mm below 
    
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
    
        // Comments
        const comments = examData.comments || '';
        const cellComments = examData.cellComments || '';
    
        const commentText = `Cell Comments: ${cellComments}\nComments: ${comments}`;
    
        // Split comments into lines if too long
        const commentLines = doc.splitTextToSize(commentText, pageWidth - 40); // 20mm margin ea. side
    
        doc.text(commentLines, pageWidth / 2, commentsY, {
        align: 'center',
        });
    
        // Generate the PDF as a blob
        const pdfOutput = doc.output('blob');
    
        // Check if running on a mobile device
        if (Capacitor.isNativePlatform()) {
        try {
            // Convert the blob to base64
            const reader = new FileReader();
            reader.readAsDataURL(pdfOutput);
            reader.onloadend = async () => {
            const base64data = reader.result as string;
            const base64Content = base64data.split(',')[1];
    
            // Save the PDF file using Capacitor Filesystem API
            await Filesystem.writeFile({
                path: filename,
                data: base64Content,
                directory: Directory.Documents,
                recursive: true,
            });
    
            console.log('PDF file saved successfully.');
            };
        } catch (error) {
            console.error('Error saving PDF file', error);
        }
        } else {
        // Running in a web browser
        doc.save(filename);
        }
};
