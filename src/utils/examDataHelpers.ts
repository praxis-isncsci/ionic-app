import { ExamData } from "isncsci-ui/dist/esm/core/domain";
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export const exportPDF = async (examData: ExamData, filename: string) => {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Page dims
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Function to convert rem units to mm
    const remToMm = (rem: number): number => {
        const baseFontSizePx = 16;
        const mmPerPx = 0.264583;
        return rem * baseFontSizePx * mmPerPx;
    };

    // Cell dimensions - to fit all on 1 page
    const cellWidth = remToMm(1.4); 
    const cellHeight = remToMm(1.4); 

    // Grid widths
    const numColsRight = 3; 
    const gridWidth = numColsRight * cellWidth;

    // Starting positions for left and right grids (centered)
    const totalGridWidth = gridWidth * 2 + 60; // 60mm space b/n grids
    const startX = (pageWidth - totalGridWidth) / 2;

    const startXRight = startX;
    const startYRight = 20; 

    const startXLeft = startX + gridWidth + 60; // 60mm space b/n grids
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
        'L2', 'L3', 'L4', 'L5', 'S1'
    ];

    // Observations for each side
    const observationsRight = ['M', 'LT', 'PP'];
    const observationsLeft = ['LT', 'PP', 'M']; 

    // Set cell border color
    doc.setDrawColor('#d9d9d9');

    // Helper function to draw a grid
    const drawSideGrid = (
        side: 'Right' | 'Left',
        startX: number,
        startY: number,
        observations: string[],
    ) => {
        const headerHeight = cellHeight; 
        const gridStartY = startY + headerHeight; // grid starts below the headers

        const numRows = sensoryLevels.length;
        const numCols = observations.length;

        // Calculate x and y positions
        const getX = (colIndex: number): number => startX + colIndex * cellWidth;
        const getY = (rowIndex: number): number => gridStartY + rowIndex * cellHeight;

        // Draw cells 
        for (let row = 0; row < numRows; row++) {
            const level = sensoryLevels[row];
            for (let col = 0; col < numCols; col++) {
                const obs = observations[col];

                // skip cells in "M" column for non-motor levels
                if (obs === 'M' && !motorLevels.includes(level)) {
                    continue;
                }

                const x = getX(col);
                const y = getY(row);
                doc.roundedRect(x, y, cellWidth, cellHeight, 0.5, 0.5, 'D');
            }
        }

        // Draw observations headers above the grid
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        observations.forEach((obs, index) => {
            const x = getX(index) + cellWidth / 2;
            const y = startY + headerHeight / 2;
            doc.text(obs, x, y, { align: 'center', baseline: 'middle' });
        });

        // Side label at the top
        const sideLabelX = startX + gridWidth / 2;
        doc.text(side, sideLabelX, startY - 2, { 
            align: 'center',
            baseline: 'bottom',
        });

        // Draw level labels and populate cells
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');

        sensoryLevels.forEach((level, rowIndex) => {
            const y = getY(rowIndex) + cellHeight / 2;

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
                // No values for "M" column for non-motor levels
                if (obs === 'M' && !motorLevels.includes(level)) {
                    return;
                }

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

    // Draw grids for both sides
    drawSideGrid('Right', startXRight, startYRight, observationsRight);
    drawSideGrid('Left', startXLeft, startYLeft, observationsLeft);

    // VAC and DAP positions
    const vacY = startYRight + cellHeight + sensoryLevels.length * cellHeight + 10; // 10mm below the grid

    // VAC on the right side
    const vacX = startXRight + gridWidth / 2 - cellWidth; // Centered under right grid
    const vacCellWidth = cellWidth * 2;
    const vacCellHeight = cellHeight;

    // Draw VAC cell borders
    doc.roundedRect(vacX, vacY, vacCellWidth, vacCellHeight, 0.5, 0.5, 'D'); 

    // VAC value inside the cell
    const vacValue = examData.voluntaryAnalContraction ?? '';
    doc.text(vacValue.toString(), vacX + vacCellWidth / 2, vacY + vacCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // Text for VAC above the cell
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Voluntary Anal Contraction (VAC):', vacX + vacCellWidth / 2, vacY - 2, {
        align: 'center',
        baseline: 'bottom',
    });

    // DAP on the left side
    const dapY = startYLeft + cellHeight + sensoryLevels.length * cellHeight + 10; // 10mm below the grid
    const dapX = startXLeft + gridWidth / 2 - cellWidth; // Centered under left grid
    const dapCellWidth = cellWidth * 2;
    const dapCellHeight = cellHeight;

    // Draw DAP cell borders
    doc.roundedRect(dapX, dapY, dapCellWidth, dapCellHeight, 0.5, 0.5, 'D'); 

    // DAP value inside the cell
    const dapValue = examData.deepAnalPressure ?? '';
    doc.text(dapValue.toString(), dapX + dapCellWidth / 2, dapY + dapCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // Text for DAP above the cell
    doc.text('Deep Anal Pressure (DAP):', dapX + dapCellWidth / 2, dapY - 2, {
        align: 'center',
        baseline: 'bottom',
    });

    // Positions for the content below
    const contentY = Math.max(vacY, dapY) + vacCellHeight + 10; // 10mm below VAC and DAP

    const columnWidth = pageWidth - 40; // 20mm margin on each side
    const contentX = 20; // Left margin

    // Set text color to black for labels
    doc.setTextColor(0);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    doc.text('Lowest Non-Key Muscle with Motor Function', contentX, contentY, {
        align: 'left',
        baseline: 'top',
    });

    const lnkValueY = contentY + 5;

    doc.text(`Right: ${examData.rightLowestNonKeyMuscleWithMotorFunction || ''}`, contentX, lnkValueY, {
        align: 'left',
        baseline: 'top',
    });

    doc.text(`Left: ${examData.leftLowestNonKeyMuscleWithMotorFunction || ''}`, contentX, lnkValueY + 5, {
        align: 'left',
        baseline: 'top',
    });

    // Comments section
    const commentsLabelY = lnkValueY + 15; 

    doc.text('Comments:', contentX, commentsLabelY, {
        align: 'left',
        baseline: 'top',
    });

    // Set text color to lighter gray for comments values
    doc.setTextColor(150);

    // Cell Comments 
    const cellCommentsValueY = commentsLabelY + 10; 
    const cellComments = examData.cellComments || '';
    const cellCommentsLines = doc.splitTextToSize(cellComments, columnWidth - 10);
    doc.text(cellCommentsLines, contentX, cellCommentsValueY);

    // Comments in the box
    const commentsText = examData.comments || '';
    const commentLines = doc.splitTextToSize(commentsText, columnWidth - 5);

    // Calc. the height req'd for the comments box
    const lineHeight = 5; 
    const commentsY = cellCommentsValueY + cellCommentsLines.length * lineHeight + 5; 
    const commentsHeight = commentLines.length * lineHeight + 4;

    // Draw a rectangle around the comments
    doc.roundedRect(contentX, commentsY, columnWidth, commentsHeight, 0.5, 0.5, 'D');

    // Add the comments inside the box
    doc.text(commentLines, contentX + 3, commentsY + 2, {
        align: 'left',
        baseline: 'top',
    });

    // Reset text color to black
    doc.setTextColor(0);

    // Classification Section
    let classificationY = commentsY + commentsHeight + 10; 

    // Ensure the page height within the range
    if (classificationY + 50 > pageHeight) {
        doc.addPage();
        classificationY = 20; // Reset Y position for new page
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    doc.text('Classification', pageWidth / 2, classificationY, {
        align: 'center',
        baseline: 'top',
    });

    const classificationContentY = classificationY + 10;

    // Calc. positions for sections
    const numSections = 5; // Number of sections to display side by side
    const sectionSpacing = 5; // Spacing between sections
    const availableWidth = pageWidth - 2 * contentX - (numSections - 1) * sectionSpacing;
    const sectionWidth = availableWidth / numSections;

    const sectionPositions = Array.from({ length: numSections }, (_, i) => contentX + i * (sectionWidth + sectionSpacing));

    // Set font size for content
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    // Section 1: Neurological Levels
    let x = sectionPositions[0];
    let y = classificationContentY;

    doc.text('Neurological Levels', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });

    y += 5;

    doc.text('Sensory', x, y, { align: 'left', baseline: 'top' });
    doc.text(`R: ${examData.rightSensory || ''}`, x, y + 5, { align: 'left', baseline: 'top' });
    doc.text(`L: ${examData.leftSensory || ''}`, x, y + 10, { align: 'left', baseline: 'top' });

    y += 15;

    doc.text('Motor', x, y, { align: 'left', baseline: 'top' });
    doc.text(`R: ${examData.rightMotor || ''}`, x, y + 5, { align: 'left', baseline: 'top' });
    doc.text(`L: ${examData.leftMotor || ''}`, x, y + 10, { align: 'left', baseline: 'top' });

    // Section 2: Neurological Level of Injury
    x = sectionPositions[1];
    y = classificationContentY;

    doc.text('Neurological Level of Injury', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });

    y += 10;

    doc.text(examData.neurologicalLevelOfInjury || '', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });

    // Section 3: ASIA Impairment Scale
    x = sectionPositions[2];
    y = classificationContentY;

    doc.text('ASIA Impairment Scale', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });

    y += 10;

    doc.text(examData.asiaImpairmentScale || '', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });
    doc.text(examData.injuryComplete || '', x + sectionWidth / 2, y + 5, {
        align: 'center',
        baseline: 'top',
    });

    // Section 4: Zone of Partial Preservation
    x = sectionPositions[3];
    y = classificationContentY;

    doc.text('Zone of Partial Preservation', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });

    y += 5;

    doc.text('Sensory', x, y, { align: 'left', baseline: 'top' });
    doc.text(`R: ${examData.rightSensoryZpp || ''}`, x, y + 5, { align: 'left', baseline: 'top' });
    doc.text(`L: ${examData.leftSensoryZpp || ''}`, x, y + 10, { align: 'left', baseline: 'top' });

    y += 15;

    doc.text('Motor', x, y, { align: 'left', baseline: 'top' });
    doc.text(`R: ${examData.rightMotorZpp || ''}`, x, y + 5, { align: 'left', baseline: 'top' });
    doc.text(`L: ${examData.leftMotorZpp || ''}`, x, y + 10, { align: 'left', baseline: 'top' });

    // Section 5: Sub-scores (if enough space)
    x = sectionPositions[4];
    y = classificationContentY;

    doc.text('Sub-scores', x + sectionWidth / 2, y, {
        align: 'center',
        baseline: 'top',
    });

    y += 5;

    const subscores = [
        { label: 'UEMS', right: examData.rightUpperMotorTotal || '', left: examData.leftUpperMotorTotal || '' },
        { label: 'LEMS', right: examData.rightLowerMotorTotal || '', left: examData.leftLowerMotorTotal || '' },
        { label: 'Light Touch', right: examData.rightLightTouchTotal || '', left: examData.leftLightTouchTotal || '' },
        { label: 'Pin Prick', right: examData.rightPinPrickTotal || '', left: examData.leftPinPrickTotal || '' },
    ];

    subscores.forEach((score) => {
        doc.text(score.label, x, y, { align: 'left', baseline: 'top' });
        doc.text(`R: ${score.right}`, x, y + 5, { align: 'left', baseline: 'top' });
        doc.text(`L: ${score.left}`, x, y + 10, { align: 'left', baseline: 'top' });
        y += 15;
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