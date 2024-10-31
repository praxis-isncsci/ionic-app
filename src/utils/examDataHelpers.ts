import { ExamData } from "isncsci-ui/dist/esm/core/domain";
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

// --------------- GRID AND SPACING --------------------
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

const cellHeight = 4.5;
const totalsCellHeight = cellHeight * 1.3;

const cellWidthsRight = [10.5, 12, 12];
const distancesRight = [0, 3.8, 3.8];

const cellWidthsLeft = [12, 12, 10.5];
const distancesLeft = [0, 3.8, 0.95];

const gridTotalWidthRight = cellWidthsRight.reduce((a, b) => a + b, 0) + distancesRight.reduce((a, b) => a + b, 0);
const gridTotalWidthLeft = cellWidthsLeft.reduce((a, b) => a + b, 0) + distancesLeft.reduce((a, b) => a + b, 0);

const startXRight = 78.5;
const gridStartY = 30;

const levelsBesideLT = new Set(['C2', 'C3', 'C4', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1', 'S2', 'S3', 'S4_5']);
const levelsBesideM = new Set(['C5', 'C6', 'C7', 'C8', 'T1', 'L2', 'L3', 'L4', 'L5', 'S1']);

const levelsToAdjustLeft = new Set(['C5', 'C6', 'C7', 'C8', 'T1', 'L2', 'L3', 'L4', 'L5', 'S1']);

const labelOffsetRight = 7;
const labelOffsetLeft = 11;
const labelOffsetLeftAdjust = -3.5;

const levelDescriptions: { [key: string]: string } = {
    'C5': 'Elbow flexors',
    'C6': 'Wrist extensors',
    'C7': 'Elbow extensors',
    'C8': 'Finger flexors',
    'T1': 'Finger abductors (little finger)',
    'L2': 'Hip flexors',
    'L3': 'Knee extensors',
    'L4': 'Ankle dorsiflexors',
    'L5': 'Long toe extensors',
    'S1': 'Ankle plantar flexors',
};

const s4_5RowIndex = sensoryLevels.indexOf('S4_5');
const vacDapY = gridStartY + s4_5RowIndex * cellHeight + cellHeight;
const totalsRowY = vacDapY + cellHeight + 1;
const subscoreStartY = totalsRowY + totalsCellHeight + 15;

// --------------- LOGO --------------------
const addLogo = async (doc: jsPDF) => {
    const logoX = 8.6;
    const logoY = 5.5;
    const logoWidth = 128.4;
    const logoHeight = 16.3;

    try {
        const logoUrl = Capacitor.isNativePlatform()
            ? Capacitor.convertFileSrc('assets/logo.jpg')
            : 'assets/logo.jpg';

        const response = await fetch(logoUrl);
        const blob = await response.blob();
        const logoBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        doc.addImage(logoBase64, 'JPEG', logoX, logoY, logoWidth, logoHeight);
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);
        doc.rect(logoX, logoY, logoWidth, logoHeight);
    } catch (error) {
        console.error('Error fetching logo image:', error);
    }
};

// --------------- BODY DIAGRAM --------------------
const addBodyDiagram = async (doc: jsPDF) => {
    const diagramX = 112;
    const diagramY = 30;
    const diagramWidth = 60;
    const diagramHeight = 135;

    try {
        const diagramUrl = Capacitor.isNativePlatform()
            ? Capacitor.convertFileSrc('assets/body-diagram.jpg')
            : 'assets/body-diagram.jpg';

        const response = await fetch(diagramUrl);
        const blob = await response.blob();
        const diagramBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        doc.addImage(diagramBase64, 'JPEG', diagramX, diagramY, diagramWidth, diagramHeight);
    } catch (error) {
        console.error('Error fetching body diagram image:', error);
    }
};

// --------------- WORKSHEET INFO --------------------
const addWorksheetInfo = (doc: jsPDF, examDate?: Date) => {
    const fieldXStart = 139;
    const fieldYStart = 9.5;

    doc.setFontSize(8);

    const fields = [
        { label: "Patient Name", x: fieldXStart, y: fieldYStart, lineWidth: 58.8 },
        { label: "Date/Time of Exam", x: fieldXStart + 79, y: fieldYStart, lineWidth: 31 },
        { label: "Examiner Name", x: fieldXStart, y: fieldYStart + 8, lineWidth: 56 },
        { label: "Signature", x: fieldXStart + 79, y: fieldYStart + 8, lineWidth: 43.5 },
    ];

    fields.forEach(field => {
        doc.text(field.label, field.x, field.y);

        const labelWidth = doc.getTextWidth(field.label);
        const lineStartX = field.x + labelWidth + 1;
        const lineEndX = lineStartX + field.lineWidth;

        doc.setLineWidth(0.2);
        doc.line(lineStartX, field.y + 0.5, lineEndX, field.y + 0.5);
        if (field.label === "Date/Time of Exam" && examDate) {
            doc.setFont('helvetica', 'normal');
            const dateStr = examDate.toLocaleString();
            doc.text(dateStr, lineStartX + 2, field.y);
        }
    });
};

// --------------- HEADINGS AND LABELS --------------------
const addHeadingsAndLabels = (doc: jsPDF) => {
    doc.setFontSize(23);
    doc.setFont('helvetica', 'bold');
    doc.text('RIGHT', 22, 31.3);
    doc.text('LEFT', 238, 31.3);

    const headings = [
        // RIGHT SIDE
        { text: 'MOTOR', x: 58, y: 27.2, size: 11 },
        { text: 'SENSORY', x: 87, y: 26, size: 11 },
        { text: 'KEY MUSCLES', x: 55, y: 31.2, size: 8 },
        { text: 'KEY SENSORY POINTS', x: 80.5, y: 30, size: 8 },
        { text: 'Light Touch (LTR)', x: 76.5, y: 33, size: 6 },
        { text: 'Pin Prick (PPR)', x: 96, y: 33, size: 6 },
        // LEFT SIDE
        { text: 'MOTOR', x: 213.6, y: 27.2, size: 11 },
        { text: 'SENSORY', x: 179.6, y: 26, size: 11 },
        { text: 'KEY MUSCLES', x: 210.6, y: 31.2, size: 8 },
        { text: 'KEY SENSORY POINTS', x: 173.1, y: 30, size: 8 },
        { text: 'Light Touch (LTL)', x: 169.1, y: 33, size: 6 },
        { text: 'Pin Prick (PPL)', x: 188.6, y: 33, size: 6 },
    ];

    headings.forEach(heading => {
        doc.setFontSize(heading.size);
        doc.text(heading.text, heading.x, heading.y);
    });
};

const calculateXPositions = (startX: number, observations: string[], cellWidths: number[], distances: number[]) => {
    const xPositions: number[] = [];
    let cumulativeX = startX;
    for (let i = 0; i < observations.length; i++) {
        cumulativeX += distances[i];
        xPositions.push(cumulativeX);
        cumulativeX += cellWidths[i];
    }
    return xPositions;
};

const drawSideGrid = (
    doc: jsPDF,
    examData: ExamData,
    side: 'Right' | 'Left',
    startX: number,
    startY: number,
    observations: string[],
    cellWidths: number[],
    xPositions: number[],
) => {
    const headerHeight = cellHeight;
    const gridStartYWithHeader = startY + headerHeight;
    const numRows = sensoryLevels.length;

    // Draw cells
    for (let row = 0; row < numRows; row++) {
        const level = sensoryLevels[row];
        for (let col = 0; col < observations.length; col++) {
            const obs = observations[col];
            if (obs === 'M' && !motorLevels.includes(level)) continue;

            const x = xPositions[col] - cellWidths[col];
            const y = gridStartYWithHeader + row * cellHeight;
            const width = cellWidths[col];

            doc.setLineWidth(level === 'S4_5' ? 0.5 : 0.2);

            const isPPColumn = obs === 'PP';

            // Set fill color for PP columns only
            if (isPPColumn) {
                doc.setFillColor(245, 245, 245); // Grey backgrnd
                doc.rect(x, y, width, cellHeight, 'FD'); // Fill and stroke
            } else {
                doc.setFillColor(255, 255, 255); // White backgrnd
                doc.rect(x, y, width, cellHeight, 'S'); // Stroke only
            }
        }
    }

    doc.setLineWidth(0.2);

    const indexOfLT = observations.indexOf('LT');
    const indexOfM = observations.indexOf('M');

    sensoryLevels.forEach((level, rowIndex) => {
        const y = gridStartYWithHeader + rowIndex * cellHeight + cellHeight / 2;
        let labelX: number;
        let align: 'left' | 'right';
        const displayLevel = level === 'S4_5' ? 'S4-5' : level;

        const labelOffset = side === 'Right' ? labelOffsetRight : levelsToAdjustLeft.has(level) ? labelOffsetLeftAdjust : labelOffsetLeft;

        if (levelsBesideLT.has(level)) {
            labelX = side === 'Right'
                ? xPositions[indexOfLT] - cellWidths[indexOfLT] / 2 - labelOffset
                : xPositions[indexOfLT] + cellWidths[indexOfLT] / 2 + labelOffset;
            align = side === 'Right' ? 'right' : 'left';
        } else if (levelsBesideM.has(level)) {
            labelX = side === 'Right'
                ? xPositions[indexOfM] - cellWidths[indexOfM] / 2 - labelOffset
                : xPositions[indexOfM] + cellWidths[indexOfM] / 2 + labelOffset;
            align = side === 'Right' ? 'right' : 'left';
        } else {
            labelX = side === 'Right' ? startX - 2 : xPositions[xPositions.length - 1] + cellWidths[cellWidths.length - 1] + labelOffset;
            align = side === 'Right' ? 'right' : 'left';
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(displayLevel, labelX, y, { align, baseline: 'middle' });

        if (side === 'Left' && levelDescriptions[level]) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(7);
            doc.text(levelDescriptions[level], labelX + 5, y, { align: 'left', baseline: 'middle' });
        }


        // Helper function to format values
        const formatValue = (value: any): string => {
            const valueStr = value.toString();
            // Replace one or more '*' at the end with a single '*'
            return valueStr.replace(/\*+$/, '*');
        };

        observations.forEach((obs, col) => {
            if (obs === 'M' && !motorLevels.includes(level)) return;
            const xCenter = xPositions[col] - cellWidths[col] / 2;
            const obsType = obs === 'M' ? 'Motor' : obs === 'LT' ? 'LightTouch' : 'PinPrick';
            const sideKey = side.toLowerCase();
            const key = `${sideKey}${obsType}${level}`;
            const value = (examData as Record<string, any>)[key];

            if (value !== null && value !== undefined) {
                const displayValue = formatValue(value);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(6);
                doc.text(displayValue, xCenter, y, { align: 'center', baseline: 'middle' });
            }
        });
    });
};

// --------------- VAC and DAP Positions --------------------
const addVACAndDAP = (doc: jsPDF, examData: ExamData, startXLeft: number) => {
    const vacDapCellWidth = 10.5;

    // VAC
    const vacX = startXRight - 28;
    doc.setLineWidth(0.5);
    doc.rect(vacX, vacDapY, vacDapCellWidth, cellHeight);

    const vacValue = examData.voluntaryAnalContraction ?? '';
    doc.text(vacValue.toString(), vacX + vacDapCellWidth / 2, vacDapY + cellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const vacTextY = vacDapY - 1;
    doc.text('(VAC) Voluntary Anal Contraction', vacX - 2, vacTextY, {
        align: 'right',
        baseline: 'top',
    });

    doc.setFontSize(6);
    const yesNoVacY = vacTextY + 3;
    doc.text('(Yes/No)', vacX - 2, yesNoVacY, {
        align: 'right',
        baseline: 'top',
    });

    // DAP
    const dapX = startXLeft + cellWidthsLeft[0] + distancesLeft[1] + cellWidthsLeft[1] + distancesLeft[2] + 7;
    doc.rect(dapX, vacDapY, vacDapCellWidth, cellHeight);

    const dapValue = examData.deepAnalPressure ?? '';
    doc.text(dapValue.toString(), dapX + vacDapCellWidth / 2, vacDapY + cellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    doc.setFontSize(7);
    const dapTextY = vacDapY - 1;
    doc.text('(DAP) Deep Anal Pressure', dapX + vacDapCellWidth + 2, dapTextY, {
        align: 'left',
        baseline: 'top',
    });

    const yesNoDapY = dapTextY + 3;
    doc.text('(Yes/No)', dapX + vacDapCellWidth + 2, yesNoDapY, {
        align: 'left',
        baseline: 'top',
    });

    doc.setLineWidth(0.2);
};

// --------------- TOTALS --------------------
const drawTotals = (doc: jsPDF, examData: ExamData, side: 'Right' | 'Left', observations: string[], cellWidths: number[], xPositions: number[]) => {
    const totalsTextX = side === 'Right' ? startXRight - 12 : startXLeft + 30;
    const totalsTextY = totalsRowY + 2;

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(`${side.toUpperCase()} TOTALS`, totalsTextX, totalsTextY, { align: side === 'Right' ? 'right' : 'left', baseline: 'top' });
    doc.setFont('helvetica', 'normal');
    doc.text('(MAXIMUM)', totalsTextX, totalsTextY + 3.5, { align: side === 'Right' ? 'right' : 'left', baseline: 'top' });

    const bracketedValues = side === 'Right' ? ['(50)', '(56)', '(56)'] : ['(56)', '(56)', '(50)'];

    observations.forEach((obs, col) => {
        const x = xPositions[col] - cellWidths[col];
        const width = cellWidths[col];
        const xCenter = x + width / 2;

        doc.rect(x, totalsRowY, width, totalsCellHeight);

        const totalKey = `${side.toLowerCase()}${obs === 'M' ? 'MotorTotal' : obs === 'LT' ? 'LightTouchTotal' : 'PinPrickTotal'}`;
        const totalValue = examData[totalKey as keyof ExamData] || '';

        doc.text(totalValue.toString(), xCenter, totalsRowY + totalsCellHeight / 2, {
            align: 'center',
            baseline: 'middle',
        });

        doc.text(bracketedValues[col], xCenter, totalsRowY + totalsCellHeight / 2 + 3.5, {
            align: 'center',
            baseline: 'top',
        });
    });
};

// --------------- SUBSCORES --------------------
const addSubscores = (doc: jsPDF, examData: ExamData) => {
    const reducedCellWidth = 8.9;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('MOTOR SUBSCORES', startXRight - 68, subscoreStartY - 6, { align: 'left' });
    doc.text('SENSORY SUBSCORES', startXLeft - 32, subscoreStartY - 6, { align: 'left' });

    let currentX = startXRight - 65;

    const drawLabelCellWithMax = (label: string, value: string, maxText: string, x: number) => {
        doc.rect(x, subscoreStartY - cellHeight, reducedCellWidth, cellHeight);
        doc.setFont('helvetica', 'normal');
        doc.text(value, x + reducedCellWidth / 2, subscoreStartY - cellHeight / 2, {
            align: 'center',
            baseline: 'middle',
        });
        doc.setFont('helvetica', 'bold');
        doc.text(label, x - 0.8, subscoreStartY - cellHeight / 2, { align: 'right', baseline: 'middle' });
        doc.setFont('helvetica', 'normal');
        doc.text(maxText, x + reducedCellWidth / 2, subscoreStartY + 1.2, {
            align: 'center',
            baseline: 'top',
        });
        return x + reducedCellWidth + 2;
    };

    // Helper function to calculate total or return empty string
    const calculateTotal = (value1?: string, value2?: string) => {
        const num1 = parseInt(value1 || '', 10);
        const num2 = parseInt(value2 || '', 10);

        if (isNaN(num1) && isNaN(num2)) {
            return '';
        } else {
            return ((isNaN(num1) ? 0 : num1) + (isNaN(num2) ? 0 : num2)).toString();
        }
    };

    const rightUpperMotorTotal = examData.rightUpperMotorTotal;
    const leftUpperMotorTotal = examData.leftUpperMotorTotal;
    const uemsTotal = calculateTotal(rightUpperMotorTotal, leftUpperMotorTotal);

    currentX = drawLabelCellWithMax('UER', rightUpperMotorTotal || '', 'MAX (25)', currentX);
    currentX += 8;
    currentX = drawLabelCellWithMax('+ UEL', leftUpperMotorTotal || '', '(25)', currentX);
    currentX += 21;
    currentX = drawLabelCellWithMax('= UEMS TOTAL', uemsTotal, '(50)', currentX);
    currentX += 10;

    const rightLowerMotorTotal = examData.rightLowerMotorTotal;
    const leftLowerMotorTotal = examData.leftLowerMotorTotal;
    const lemsTotal = calculateTotal(rightLowerMotorTotal, leftLowerMotorTotal);

    currentX = drawLabelCellWithMax('LER', rightLowerMotorTotal || '', 'MAX (25)', currentX);
    currentX += 7;
    currentX = drawLabelCellWithMax('+ LEL', leftLowerMotorTotal || '', '(25)', currentX);
    currentX += 20;
    currentX = drawLabelCellWithMax('= LEMS TOTAL', lemsTotal, '(50)', currentX);
    currentX += 10;

    const rightLightTouchTotal = examData.rightLightTouchTotal;
    const leftLightTouchTotal = examData.leftLightTouchTotal;
    const ltTotal = calculateTotal(rightLightTouchTotal, leftLightTouchTotal);

    currentX = drawLabelCellWithMax('LTR', rightLightTouchTotal || '', 'MAX (56)', currentX);
    currentX += 7;
    currentX = drawLabelCellWithMax('+ LTL', leftLightTouchTotal || '', '(56)', currentX);
    currentX += 15.6;
    currentX = drawLabelCellWithMax('= LT TOTAL', ltTotal, '(112)', currentX);
    currentX += 10;

    const rightPinPrickTotal = examData.rightPinPrickTotal;
    const leftPinPrickTotal = examData.leftPinPrickTotal;
    const ppTotal = calculateTotal(rightPinPrickTotal, leftPinPrickTotal);

    currentX = drawLabelCellWithMax('PPR', rightPinPrickTotal || '', 'MAX (56)', currentX);
    currentX += 7.5;
    currentX = drawLabelCellWithMax('+ PPL', leftPinPrickTotal || '', '(56)', currentX);
    currentX += 16;
    drawLabelCellWithMax('= PP TOTAL', ppTotal, '(112)', currentX);
};

// --------------- Classification Box --------------------
const addClassificationBox = (doc: jsPDF, examData: ExamData) => {
    const boxWidth = 262;
    const boxHeight = 14.5;
    const boxX = (pageWidth - boxWidth) / 2;
    const boxY = subscoreStartY + cellHeight + 5;

    doc.setLineWidth(0.2);
    doc.rect(boxX, boxY, boxWidth, boxHeight);

    let contentX = boxX + 15;
    let contentY = boxY + 4;

    // NEUROLOGICAL LEVELS
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('NEUROLOGICAL', contentX, contentY, { align: 'center' });
    contentY += 3.5;
    doc.text('LEVELS', contentX, contentY, { align: 'center' });

    // Steps 1-6 for classification
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);
    contentY += 2.5;
    doc.text('Steps 1-6 for classification', contentX, contentY, { align: 'center' });
    contentY += 2;
    doc.text('as on reverse', contentX, contentY, { align: 'center' });

    // 1. SENSORY
    contentX += 32;
    contentY = boxY + 7.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('1. SENSORY', contentX, contentY, { align: 'right' });

    const cellWidth = 8;
    const cellHeightBox = 3.8;
    const cellY = contentY - 3;
    const cellX_R = contentX + 1;
    const cellX_L = cellX_R + cellWidth + 2;

    doc.setFontSize(7);
    doc.text('R', cellX_R + cellWidth / 2, cellY - 1, { align: 'center' });
    doc.text('L', cellX_L + cellWidth / 2, cellY - 1, { align: 'center' });

    doc.rect(cellX_R, cellY, cellWidth, cellHeightBox);
    doc.rect(cellX_L, cellY, cellWidth, cellHeightBox);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(examData.rightSensory || '', cellX_R + cellWidth / 2, cellY + cellHeightBox / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(examData.leftSensory || '', cellX_L + cellWidth / 2, cellY + cellHeightBox / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // 2. MOTOR
    contentY += 4.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('2. MOTOR', contentX, contentY, { align: 'right' });

    const motorCellY = contentY - 2.8;

    doc.rect(cellX_R, motorCellY, cellWidth, cellHeightBox);
    doc.rect(cellX_L, motorCellY, cellWidth, cellHeightBox);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(examData.rightMotor || '', cellX_R + cellWidth / 2, motorCellY + cellHeightBox / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(examData.leftMotor || '', cellX_L + cellWidth / 2, motorCellY + cellHeightBox / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // 3. NEUROLOGICAL LEVEL OF INJURY (NLI)
    contentX += 40;
    contentY = boxY + 7.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('3. NEUROLOGICAL LEVEL', contentX, contentY, { align: 'center' });
    contentY += 3.5;
    doc.text('OF INJURY (NLI)', contentX, contentY, { align: 'center' });

    const nliCellWidth = 11;
    const nliCellHeight = 4.5;
    const nliCellX = contentX + 19;
    const nliCellY = boxY + 7;

    doc.rect(nliCellX, nliCellY, nliCellWidth, nliCellHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(examData.neurologicalLevelOfInjury || '', nliCellX + nliCellWidth / 2, nliCellY + nliCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // 4. COMPLETE OR INCOMPLETE?
    contentX += 85;
    contentY = boxY + 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('4. COMPLETE OR INCOMPLETE?', contentX, contentY, { align: 'right' });
    contentY += 2.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text('Incomplete = Any sensory or motor function in S4-5', contentX, contentY, { align: 'right' });

    const compCellWidth = 8;
    const compCellHeight = 4;
    const compCellX = contentX + 2;
    const compCellY = boxY + 2.8;

    doc.setLineWidth(0.5);
    doc.rect(compCellX, compCellY, compCellWidth, compCellHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(examData.injuryComplete || '', compCellX + compCellWidth / 2, compCellY + compCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    doc.setLineWidth(0.2);

    // 5. ASIA IMPAIRMENT SCALE (AIS)
    contentY += 4.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('5. ASIA IMPAIRMENT SCALE (AIS)', contentX, contentY, { align: 'right' });

    const aisCellWidth = 11;
    const aisCellHeight = 4.7;
    const aisCellX = contentX + 2;
    const aisCellY = compCellY + compCellHeight + 2;

    doc.rect(aisCellX, aisCellY, aisCellWidth, aisCellHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(examData.asiaImpairmentScale || '', aisCellX + aisCellWidth / 2, aisCellY + aisCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // 6. ZONE OF PARTIAL PRESERVATION (ZPP)
    contentX += 38;
    contentY = boxY + 3;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);
    doc.text('(In injuries with absent motor OR sensory function in S4-5 only)', contentX - 26, contentY, { align: 'left' });

    contentY += 3.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('6. ZONE OF PARTIAL', contentX, contentY, { align: 'center' });
    contentY += 3.5;
    doc.text('PRESERVATION (ZPP)', contentX, contentY, { align: 'center' });
    contentY += 2.5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);
    doc.text('Most caudal levels with any innervation', contentX, contentY, { align: 'center' });

    const zppCellWidth = 8;
    const zppCellHeight = 4;
    const zppCellY_Sensory = boxY + 4;

    const zppHeaderY = boxY + 3;
    const zppCellX_R = contentX + 33;
    const zppCellX_L = zppCellX_R + zppCellWidth + 2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('R', zppCellX_R + zppCellWidth / 2, zppHeaderY, { align: 'center' });
    doc.text('L', zppCellX_L + zppCellWidth / 2, zppHeaderY, { align: 'center' });

    // SENSORY ZPP
    doc.setFontSize(8);
    doc.text('SENSORY', contentX + 32, zppCellY_Sensory + 3, { align: 'right' });

    doc.rect(zppCellX_R, zppCellY_Sensory, zppCellWidth, zppCellHeight);
    doc.rect(zppCellX_L, zppCellY_Sensory, zppCellWidth, zppCellHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(examData.rightSensoryZpp || '', zppCellX_R + zppCellWidth / 2, zppCellY_Sensory + zppCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(examData.leftSensoryZpp || '', zppCellX_L + zppCellWidth / 2, zppCellY_Sensory + zppCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });

    // MOTOR ZPP
    const zppCellY_Motor = zppCellY_Sensory + zppCellHeight + 1;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('MOTOR', contentX + 32, zppCellY_Motor + 3, { align: 'right' });

    doc.rect(zppCellX_R, zppCellY_Motor, zppCellWidth, zppCellHeight);
    doc.rect(zppCellX_L, zppCellY_Motor, zppCellWidth, zppCellHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(examData.rightMotorZpp || '', zppCellX_R + zppCellWidth / 2, zppCellY_Motor + zppCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(examData.leftMotorZpp || '', zppCellX_L + zppCellWidth / 2, zppCellY_Motor + zppCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });
};

// --------------- Footer --------------------
const addFooter = (doc: jsPDF) => {
    const boxY = subscoreStartY + cellHeight + 5;
    const boxHeight = 14.5;
    const footerTextY = boxY + boxHeight + 2.5;

    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(7);

    const centeredText = 'This form may be copied freely but should not be altered without permission from the American Spinal Injury Association.';
    doc.text(centeredText, pageWidth / 2, footerTextY, { align: 'center' });

    const rightAlignedText = 'REV 04/19';
    doc.text(rightAlignedText, pageWidth - 10, footerTextY, { align: 'right' });
};

// --------------- RIGHT Side Comments Box --------------------
const addCommentsBox = (doc: jsPDF, examData: ExamData) => {
    const commentsBoxX = 11;
    const commentsBoxY = 72;
    const commentsBoxWidth = 56.8;
    const commentsBoxHeight = 51;

    doc.setLineWidth(0.5);
    doc.rect(commentsBoxX, commentsBoxY, commentsBoxWidth, commentsBoxHeight);

    let textX = commentsBoxX + 2;
    let textY = commentsBoxY + 5;

    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(8);
    doc.text('Comments', textX, textY);

    textX += 15;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.text('Non-key Muscle? Reason for NT?', textX, textY);

    textX -= 15;
    textY += 3.5;
    doc.text('Pain? Non-SCI condition?):', textX, textY);

    textY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const comments = examData.comments || '';
    const commentsLines = doc.splitTextToSize(comments, commentsBoxWidth - 4);
    doc.text(commentsLines, textX, textY);

    textY += commentsLines.length * 4;
    const cellComments = examData.cellComments || '';
    if (cellComments) {
        textY += 2;
        const cellCommentsLines = doc.splitTextToSize(cellComments, commentsBoxWidth - 4);
        doc.text(cellCommentsLines, textX, textY);
    }

    // UER and LER labels
    const uerX = commentsBoxX + 10;
    let uerY = commentsBoxY - 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('UER', uerX, uerY, { align: 'center' });

    uerY += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('(Upper Extremity Right)', uerX, uerY, { align: 'center' });

    let lerY = commentsBoxY + commentsBoxHeight + 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('LER', uerX, lerY, { align: 'center' });

    lerY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('(Lower Extremity Right)', uerX, lerY, { align: 'center' });
};

// --------------- LEFT Side Box and Text --------------------
const addLeftSideBox = (doc: jsPDF) => {
    const rightBoxX = 215.2;
    const rightBoxY = 80;
    const rightBoxWidth = 48;
    const rightBoxHeight = 26;

    doc.setLineWidth(0.5);
    doc.rect(rightBoxX, rightBoxY, rightBoxWidth, rightBoxHeight);

    const boxText = [
        '0 = Total paralysis',
        '1 = Palpable or visible contraction',
        '2 = Active movement, gravity eliminated',
        '3 = Active movement, against gravity',
        '4 = Active movement, against some resistance',
        '5 = Active movement, against full resistance',
        'NT = Not testable',
        '0*, ..., 4*, NT* = Non-SCI condition present'
    ];

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);

    const textX = rightBoxX + 2.5;
    let textY = rightBoxY + 2.5;

    boxText.forEach(line => {
        doc.text(line, textX, textY);
        textY += 2.8;
    });

    const motorTextX = rightBoxX + rightBoxWidth / 2;
    let motorTextY = rightBoxY - 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('MOTOR', motorTextX, motorTextY, { align: 'center' });

    motorTextY += 3;
    doc.setFontSize(7);
    doc.text('(SCORING ON REVERSE SIDE)', motorTextX, motorTextY, { align: 'center' });

    let sensoryTextY = rightBoxY + rightBoxHeight + 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SENSORY', motorTextX, sensoryTextY, { align: 'center' });

    sensoryTextY += 3;
    doc.setFontSize(7);
    doc.text('(SCORING ON REVERSE SIDE)', motorTextX, sensoryTextY, { align: 'center' });

    const sensoryBoxY = sensoryTextY + 1;
    const sensoryBoxHeight = 9;

    doc.setLineWidth(0.5);
    doc.rect(rightBoxX, sensoryBoxY, rightBoxWidth, sensoryBoxHeight);

    const leftTextLines = ['0 = Absent', '1 = Altered', '2 = Normal'];
    const rightTextLines = ['NT = Not testable', '0*, 1*, NT* = Non-SCI', 'condition present'];

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);

    let textYStart = sensoryBoxY + 2.1;
    const columnGap = 2;
    const columnWidth = (rightBoxWidth - 4 - columnGap) / 2;
    const leftColumnX = rightBoxX + 2;
    const rightColumnX = leftColumnX + columnWidth + columnGap;

    const maxLines = Math.max(leftTextLines.length, rightTextLines.length);

    for (let i = 0; i < maxLines; i++) {
        if (i < leftTextLines.length) {
            doc.text(leftTextLines[i], leftColumnX, textYStart);
        }
        if (i < rightTextLines.length) {
            doc.text(rightTextLines[i], rightColumnX, textYStart);
        }
        textYStart += 2.8;
    }

    const uelX = rightBoxX + 40;
    let uelY = 57;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('UEL', uelX, uelY, { align: 'center' });

    uelY += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('(Upper Extremity Left)', uelX, uelY, { align: 'center' });

    let lelY = 134;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('LEL', uelX, lelY, { align: 'center' });

    lelY += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('(Lower Extremity Left)', uelX, lelY, { align: 'center' });
};


let pageWidth: number,
    totalGridWidth: number,
    spaceBetweenGrids: number,
    startXLeft: number;

export const exportPDF = async (examData: ExamData, filename: string, examDate?: Date) => {
    const doc = new jsPDF('l', 'mm', 'letter');

    // Page dimensions
    pageWidth = doc.internal.pageSize.getWidth();
    totalGridWidth = pageWidth - 2 * 66;
    spaceBetweenGrids = totalGridWidth - gridTotalWidthRight - gridTotalWidthLeft;
    startXLeft = startXRight + gridTotalWidthRight + spaceBetweenGrids;

    await addLogo(doc);
    addWorksheetInfo(doc, examDate);
    addHeadingsAndLabels(doc);

    const observationsRight = ['M', 'LT', 'PP'];
    const observationsLeft = ['LT', 'PP', 'M'];
    const xPositionsRight = calculateXPositions(startXRight, observationsRight, cellWidthsRight, distancesRight);
    const xPositionsLeft = calculateXPositions(startXLeft, observationsLeft, cellWidthsLeft, distancesLeft);

    drawSideGrid(doc, examData, 'Right', startXRight, gridStartY, observationsRight, cellWidthsRight, xPositionsRight);
    drawSideGrid(doc, examData, 'Left', startXLeft, gridStartY, observationsLeft, cellWidthsLeft, xPositionsLeft);


    await addBodyDiagram(doc);
    addVACAndDAP(doc, examData, startXLeft);


    drawTotals(doc, examData, 'Right', observationsRight, cellWidthsRight, xPositionsRight);
    drawTotals(doc, examData, 'Left', observationsLeft, cellWidthsLeft, xPositionsLeft);
    addSubscores(doc, examData);
    addClassificationBox(doc, examData);
    addFooter(doc);
    addCommentsBox(doc, examData);
    addLeftSideBox(doc);

    // Generate the PDF as a blob
    const pdfOutput = doc.output('blob');

    const pdfFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

    // Save the PDF file
    if (Capacitor.isNativePlatform()) {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(pdfOutput);
            reader.onloadend = async () => {
                const base64data = reader.result as string;
                const base64Content = base64data.split(',')[1];

                await Filesystem.writeFile({
                    path: pdfFilename,
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
        doc.save(pdfFilename);
    }
};