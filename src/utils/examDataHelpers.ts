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

async function svgToPngBase64(svgString: string, width?: number, height?: number): Promise<string> {
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    return new Promise((resolve, reject) => {
        img.onload = () => {
            const scale = 10; // upsample to reduce pixelation
            const targetWidth = width || img.width;
            const targetHeight = height || img.height;

            const canvas = document.createElement("canvas");
            canvas.width = targetWidth * scale;
            canvas.height = targetHeight * scale;

            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const pngBase64 = canvas.toDataURL("image/png");
            URL.revokeObjectURL(svgUrl);
            resolve(pngBase64);
        };
        img.onerror = (error) => {
            URL.revokeObjectURL(svgUrl);
            reject(new Error("Error loading SVG image."));
        };

        img.src = svgUrl;
    });
}

// Helper: force fill colors into fill on ea. shape
const forceInlineFill = (svgEl: SVGElement) => {
    const shapes = svgEl.querySelectorAll('path, polygon, circle, rect, ellipse, line');
    shapes.forEach((shape) => {
        const cs = getComputedStyle(shape);
        const fillColor = cs.fill;
        if (fillColor && fillColor !== 'none') {
            shape.setAttribute('fill', fillColor);
        }
        const strokeColor = cs.stroke;
        if (strokeColor && strokeColor !== 'none') {
            shape.setAttribute('stroke', strokeColor);
        }
    });
}

// Try to locate the live, fully-rendered <svg> from <praxis-isncsci-key-points-diagram>
async function getDiagramSvgElementOrNull(): Promise<SVGElement | null> {

    const diagramHosts: (HTMLElement | null)[] = [
        document.querySelector('praxis-isncsci-key-points-diagram'),
        document.querySelector('ion-modal praxis-isncsci-key-points-diagram'),
    ];

    for (const host of diagramHosts) {
        if (!host) continue;

        await new Promise(r => requestAnimationFrame(r));

        const root = (host as any).shadowRoot ?? host;
        const svg  = root.querySelector('svg') as SVGElement | null;
        if (!svg) continue;

        forceInlineFill(svg);
        return svg;
    }

    return null;
}

// --------------- BODY DIAGRAM --------------------
const addBodyDiagram = async (doc: jsPDF) => {
    const diagramX = 109;
    const diagramY = 45;
    const diagramWidth = 65;
    const diagramHeight = 115;

    const fallbackX = 98;
    const fallbackY = 25;
    const fallbackWidth = 80;
    const fallbackHeight = 150;


    let usedFallback = false;
    let finalSvgString: string | null = null;
    try {
        const realSvgElement = await getDiagramSvgElementOrNull();
        if (realSvgElement) {
            // Serialize inline-styled <svg> to string
            finalSvgString = new XMLSerializer().serializeToString(realSvgElement);
        }
    } catch(e) {
        console.warn('No colorized diagram from component, fallback to local file.', e);
    }

    if (!finalSvgString) {
        usedFallback = true;
        try {
            const diagramUrl = Capacitor.isNativePlatform()
                ? Capacitor.convertFileSrc('assets/c-isncsci-body-diagram.svg')
                : 'assets/c-isncsci-body-diagram.svg';

            const resp = await fetch(diagramUrl);
            finalSvgString = await resp.text();
        } catch(err) {
            console.error('Error fetching fallback SVG', err);
            // no diagram to show
            return;
        }
    }

    try {

        // Convert final SVG to base64 PNG
        const diagramBase64 = await svgToPngBase64(finalSvgString, diagramWidth, diagramHeight);

        if (usedFallback) {
            // Fallback = original sizing, no additional scaling
            doc.addImage(
                diagramBase64,
                'PNG',
                fallbackX,
                fallbackY,
                fallbackWidth,
                fallbackHeight
            );
            console.log('[PDF] Used fallback uncolored SVG, no scaling.');
        } else {

            doc.addImage(
                diagramBase64,
                'PNG',
                diagramX,
                diagramY,
                diagramWidth,
                diagramHeight
            );
            console.log('[PDF] Used actual colorized diagram at 70% scale.');
        }
    } catch (error) {
        console.error('Error converting diagram to PNG:', error);
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
        { text: 'Light Touch (LTL)', x: 170, y: 33, size: 6 },
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

        if (value1 === 'ND' || value2 === 'ND') {
            return 'ND';
        } else {

        const num1 = parseInt(value1 || '', 10);
        const num2 = parseInt(value2 || '', 10);
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

// --------------- helper to remove ND range from classification and export as ND
const removeNDRange = (value?: string): string => {
    if (!value) return '';
    if (value.startsWith('ND*:')) {
        return 'ND*';
    }
    if (value.startsWith('ND:')) {
        return 'ND';
    }
    return value;
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
    doc.text(removeNDRange(examData.rightSensory) || '', cellX_R + cellWidth / 2, cellY + cellHeightBox / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(removeNDRange(examData.leftSensory) || '', cellX_L + cellWidth / 2, cellY + cellHeightBox / 2, {
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
    doc.text(removeNDRange(examData.rightMotor) || '', cellX_R + cellWidth / 2, motorCellY + cellHeightBox / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(removeNDRange(examData.leftMotor) || '', cellX_L + cellWidth / 2, motorCellY + cellHeightBox / 2, {
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
    doc.text(removeNDRange(examData.neurologicalLevelOfInjury) || '', nliCellX + nliCellWidth / 2, nliCellY + nliCellHeight / 2, {
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
    doc.text(removeNDRange(examData.asiaImpairmentScale) || '', aisCellX + aisCellWidth / 2, aisCellY + aisCellHeight / 2, {
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
    doc.text(removeNDRange(examData.rightSensoryZpp) || '', zppCellX_R + zppCellWidth / 2, zppCellY_Sensory + zppCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(removeNDRange(examData.leftSensoryZpp) || '', zppCellX_L + zppCellWidth / 2, zppCellY_Sensory + zppCellHeight / 2, {
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
    doc.text(removeNDRange(examData.rightMotorZpp) || '', zppCellX_R + zppCellWidth / 2, zppCellY_Motor + zppCellHeight / 2, {
        align: 'center',
        baseline: 'middle',
    });
    doc.text(removeNDRange(examData.leftMotorZpp) || '', zppCellX_L + zppCellWidth / 2, zppCellY_Motor + zppCellHeight / 2, {
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
    doc.text('(Non-key Muscle? Reason for NT?', textX, textY);

    textX -= 15;
    textY += 3.5;
    doc.text('Pain? Non-SCI condition?):', textX, textY);

    textY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const checkValInNonKeyMuscle = (val: unknown): string => {
        if (val === null || val === undefined || val === 'None') {
            return '';
        }
        return String(val);
    }
    const rightVal = checkValInNonKeyMuscle(examData.rightLowestNonKeyMuscleWithMotorFunction);
    const leftVal = checkValInNonKeyMuscle(examData.leftLowestNonKeyMuscleWithMotorFunction);
    
    let nonKeyMuscleMessage = '';
    if (rightVal && leftVal) {
    nonKeyMuscleMessage = `Motor function present in non-key muscle at ${rightVal} on the right and at ${leftVal} on the left.`;
    } else if (rightVal) {
    nonKeyMuscleMessage = `Motor function present in non-key muscle at ${rightVal} on the right.`;
    } else if (leftVal) {
    nonKeyMuscleMessage = `Motor function present in non-key muscle at ${leftVal} on the left.`;
    }

    if (nonKeyMuscleMessage) {
        const nonKeyMuscleLines = doc.splitTextToSize(nonKeyMuscleMessage, commentsBoxWidth - 4);
        doc.text(nonKeyMuscleLines, textX, textY);
        textY += nonKeyMuscleLines.length * 4;
        textY += 2;
    }
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

    const addBodyDiagramFallback = async (doc: jsPDF) => {
        const fallbackUrl = Capacitor.isNativePlatform()
            ? Capacitor.convertFileSrc('assets/c-isncsci-body-diagram.svg')
            : 'assets/c-isncsci-body-diagram.svg';
        try {
            const resp = await fetch(fallbackUrl);
            const svgText = await resp.text();
            const diagramWidth = 65;
            const diagramHeight = 115;
            const fallbackX = 98;
            const fallbackY = 25;
            const fallbackWidth = 80;
            const fallbackHeight = 150;
            const diagramBase64 = await svgToPngBase64(svgText, diagramWidth, diagramHeight);
            doc.addImage(diagramBase64, 'PNG', fallbackX, fallbackY, fallbackWidth, fallbackHeight);
            console.log('[PDF] Used fallback uncolored SVG.');
        } catch (err) {
            console.error("Error fetching fallback uncolored SVG", err);
        }
    };

    export const generatePDFBlob = async (examData: ExamData, filename: string, examDate?: Date, useUncoloredSVG: boolean = false): Promise<Blob> => {
        const doc = new jsPDF('l', 'mm', 'letter');
    
        // Page dimensions
        pageWidth = doc.internal.pageSize.getWidth();
        totalGridWidth = pageWidth - 2 * 66;
        spaceBetweenGrids = totalGridWidth - gridTotalWidthRight - gridTotalWidthLeft;
        startXLeft = startXRight + gridTotalWidthRight + spaceBetweenGrids;
    
        // 1st PAGE
        await addLogo(doc);
        addWorksheetInfo(doc, examDate);
        addHeadingsAndLabels(doc);
    
        const observationsRight = ['M', 'LT', 'PP'];
        const observationsLeft = ['LT', 'PP', 'M'];
        const xPositionsRight = calculateXPositions(startXRight, observationsRight, cellWidthsRight, distancesRight);
        const xPositionsLeft = calculateXPositions(startXLeft, observationsLeft, cellWidthsLeft, distancesLeft);
    
        drawSideGrid(doc, examData, 'Right', startXRight, gridStartY, observationsRight, cellWidthsRight, xPositionsRight);
        drawSideGrid(doc, examData, 'Left', startXLeft, gridStartY, observationsLeft, cellWidthsLeft, xPositionsLeft);
    
        if (useUncoloredSVG) {
            await addBodyDiagramFallback(doc);
        } else {
            await addBodyDiagram(doc);
        }
        addVACAndDAP(doc, examData, startXLeft);
    
        drawTotals(doc, examData, 'Right', observationsRight, cellWidthsRight, xPositionsRight);
        drawTotals(doc, examData, 'Left', observationsLeft, cellWidthsLeft, xPositionsLeft);
        addSubscores(doc, examData);
        addClassificationBox(doc, examData);
        addFooter(doc);
        addCommentsBox(doc, examData);
        addLeftSideBox(doc);
    
        // 2nd PAGE
        doc.addPage();
    
        // LOGOS (second page)
        const addLogos = async (doc: jsPDF) => {
            const logoX = 105;
            const logoY = 161;
            const logoWidth = 71;
            const logoHeight = 38;
    
            try {
                const logoUrl = Capacitor.isNativePlatform()
                    ? Capacitor.convertFileSrc('assets/logos-second-page.jpg')
                    : 'assets/logos-second-page.jpg';
    
                const response = await fetch(logoUrl);
                const blob = await response.blob();
                const logoBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
    
                doc.addImage(logoBase64, 'JPEG', logoX, logoY, logoWidth, logoHeight);
            } catch (error) {
                console.error('Error fetching logo image:', error);
            }
        };
    
        await addLogos(doc);
    
        // ---------------- MUSCLE FUNCTION GRADING (second page) ----------------
        doc.setFont('helvetica', 'bold');
        doc.setCharSpace(-0.1); 
        doc.setFontSize(14);
    
        let secondpageY = 8; 
        const titleX = 8;
        const muscleTitle = "Muscle Function Grading";
    
        // Print the title - underlined
        doc.text(muscleTitle, titleX, secondpageY);
        const muscleTitleWidth = doc.getTextWidth(muscleTitle);
        doc.setLineWidth(0.2);
        doc.line(titleX, secondpageY + 1, titleX + muscleTitleWidth - 2, secondpageY + 1);
    
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setCharSpace(-0.05); 
    
        secondpageY += 7;
    
        const muscleFunctionBullets = [
            { boldLabel: "0", text: "= Total paralysis" },
            { boldLabel: "1", text: "= Palpable or visible contraction" },
            { boldLabel: "2", text: "= Active movement, full range of motion (ROM) with gravity eliminated" },
            { boldLabel: "3", text: "= Active movement, full ROM against gravity" },
            { boldLabel: "4", text: "= Active movement, full ROM against gravity and moderate resistance in a muscle specific position" },
            { boldLabel: "5", text: "= (normal) active movement, full ROM against gravity and full resistance in a functional muscle position expected from an otherwise unimpaired person" },
            { boldLabel: "NT", text: "= Not testable. (i.e. due to immobilization, severe pain such that the patient cannot be graded, amputation of limb, or contracture of > 50% of the normal ROM)" },
            { boldLabel: "0*, ..., 4*, NT*", text: "= Non-SCI condition present" },
        ];
    
        doc.setFontSize(5.5);
        doc.text("a", titleX + 50, secondpageY + 38.5);
        doc.setFontSize(7.5);
    
        const printBulletFirstColumn = (boldLabel: string, normalText: string, wrapWidth: number) => {
            doc.setCharSpace(-0.05);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
    
            const fullString = `${boldLabel} ${normalText}`.trim();
            const wrappedLines = doc.splitTextToSize(fullString, wrapWidth);
            if (wrappedLines.length === 0) return;
            const firstLine = wrappedLines[0];
            const labelWithSpace = boldLabel + ' ';
            const labelWidth = doc.getTextWidth(labelWithSpace);
            doc.setFont('helvetica', 'bold');
            doc.text(boldLabel, titleX, secondpageY);
            doc.setFont('helvetica', 'normal');
            const remainder = firstLine.slice(labelWithSpace.length);
            doc.text(remainder, titleX + labelWidth, secondpageY);
            for (let i = 1; i < wrappedLines.length; i++) {
                secondpageY += 4; 
                doc.text(wrappedLines[i], titleX, secondpageY);
            }
            secondpageY += 4;
        };
    
        const leftColumnWrapWidth = 98;
        muscleFunctionBullets.forEach((item) => {
            printBulletFirstColumn(item.boldLabel, item.text, leftColumnWrapWidth);
        });
    
        // ---------------- SENSORY GRADING ----------------
        secondpageY += 5;
        doc.setFont('helvetica', 'bold');
        doc.setCharSpace(-0.1);
        doc.setFontSize(14);
    
        const sensoryTitle = "Sensory Grading";
        doc.text(sensoryTitle, titleX, secondpageY);
        const sensoryTitleWidth = doc.getTextWidth(sensoryTitle);
        doc.setLineWidth(0.2);
        doc.line(titleX, secondpageY + 1, titleX + sensoryTitleWidth - 1, secondpageY + 1);
    
        secondpageY += 5;
    
        const printSensoryLine = (lines: { text: string; bold?: boolean }[], startX: number, startY: number): number => {
            let currentX = startX;
            lines.forEach((line) => {
                if (line.bold) {
                    doc.setFont('helvetica', 'bold');
                } else {
                    doc.setFont('helvetica', 'normal');
                }
                const segmentWidth = doc.getTextWidth(line.text);
                doc.text(line.text, currentX, startY);
                currentX += segmentWidth;
            });
            return currentX;
        };
    
        const line1Segments = [
            { text: "0", bold: true },
            { text: " = Absent ", bold: false },
            { text: "1", bold: true },
            { text: " = Altered, either decreased/impaired sensation or hypersensitivity", bold: false },
        ];
        doc.setFontSize(7.5);
        doc.setCharSpace(-0.05); 
        printSensoryLine(line1Segments, titleX, secondpageY);
        secondpageY += 4;
    
        const line2Segments = [
            { text: "2", bold: true },
            { text: " = Normal ", bold: false },
            { text: "NT", bold: true },
            { text: " = Not testable", bold: false },
        ];
        printSensoryLine(line2Segments, titleX, secondpageY);
        secondpageY += 4;
    
        const line3Segments = [
            { text: "0*, 1*, NT*", bold: true },
            { text: " = Non-SCI condition present", bold: false },
        ];
        const xEndOfLine3 = printSensoryLine(line3Segments, titleX, secondpageY);
        doc.setFontSize(5.5);
        doc.text("a", xEndOfLine3, secondpageY - 1.2);
        doc.setFontSize(7.5);
        printSensoryLine(line3Segments, titleX, secondpageY);
        secondpageY += 5;
    
        doc.setFontSize(5.5);
        doc.text("a", titleX, secondpageY - 1.2);
        doc.setFontSize(7.5);
    
        const noteText = `   Note: Abnormal motor and sensory scores should be tagged with a “*” to indicate an impairment due to a non-SCI condition. The non-SCI condition should be explained in the comments box together with information about how the score is rated for classification purposes (at least normal / not normal for classification).`;
        const printWrappedParagraph = (text: string, wrapWidth: number, fontSize: number = 7.5) => {
            doc.setCharSpace(-0.05);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(fontSize);
            const lines = doc.splitTextToSize(text, wrapWidth);
            lines.forEach((line: string) => {
                doc.text(line, titleX, secondpageY);
                secondpageY += 3.5; 
            });
            secondpageY += 2;
        };
        printWrappedParagraph(noteText, leftColumnWrapWidth, 7.2);
    
        // ---------------- When to Test Non-Key Muscles: ----------------
        secondpageY += 5; 
        doc.setFont('helvetica', 'bold');
        doc.setCharSpace(-0.1);
        doc.setFontSize(14);
        const whenToTestTitle = "When to Test Non-Key Muscles:";
        doc.text(whenToTestTitle, titleX, secondpageY);
        const whenToTestTitleWidth = doc.getTextWidth(whenToTestTitle);
        doc.setLineWidth(0.2);
        doc.line(titleX, secondpageY + 1, titleX + whenToTestTitleWidth - 1.2, secondpageY + 1);
        secondpageY += 5;
        const whenToTestText = `
        In a patient with an apparent AIS B classification, non-key muscle functions more than 3 levels below the motor level on each side should be tested to most accurately classify the injury (differentiate between AIS B and C).`.trim();
        printWrappedParagraph(whenToTestText, leftColumnWrapWidth, 7.5);
    
        // ---------------- MOVEMENT ROOT LEVEL SECTION  ----------------
        const movementPairs = [
            {
                lines: [
                    { label: "Shoulder:", rest: " Flexion, extension, abduction, adduction, internal and external rotation" },
                    { label: "Elbow:", rest: " Supination" }
                ],
                root: "C5"
            },
            {
                lines: [
                    { label: "Elbow:", rest: " Pronation" },
                    { label: "Wrist:", rest: " Flexion" }
                ],
                root: "C6"
            },
            {
                lines: [
                    { label: "Finger:", rest: " Flexion at proximal joint, extension" },
                    { label: "Thumb:", rest: " Flexion, extension and abduction in plane of thumb" }
                ],
                root: "C7"
            },
            {
                lines: [
                    { label: "Finger:", rest: " Flexion at MCP joint" },
                    { label: "Thumb:", rest: " Opposition, adduction and abduction perpendicular to palm" }
                ],
                root: "C8"
            },
            {
                lines: [
                    { label: "Finger:", rest: " Abduction of the index finger" }
                ],
                root: "T1"
            },
            {
                lines: [
                    { label: "Hip:", rest: " Adduction" }
                ],
                root: "L2"
            },
            {
                lines: [
                    { label: "Hip:", rest: " External rotation" }
                ],
                root: "L3"
            },
            {
                lines: [
                    { label: "Hip:", rest: " Extension, abduction, internal rotation" },
                    { label: "Knee:", rest: " Flexion" },
                    { label: "Ankle:", rest: " Inversion and eversion" },
                    { label: "Toe:", rest: " MP and IP extension" }
                ],
                root: "L4"
            },
            {
                lines: [
                    { label: "Hallux and Toe:", rest: " DIP and PIP flexion and abduction" }
                ],
                root: "L5"
            },
            {
                lines: [
                    { label: "Hallux:", rest: " Adduction" }
                ],
                root: "S1"
            },
        ];
    
        const printMovementPairs = (
            pairs: { lines: { label: string; rest: string }[]; root: string; }[],
            startX: number,
            secondpageY: number,
            widthLeft: number,
            widthRight: number
        ) => {
            const pairSpacing = 1.5; 
            const lineSpacing = 3;
        
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
        
            doc.text('Movement', startX, secondpageY);
        
            const rootHeadingX = startX + widthLeft - 5; 
            doc.text('Root Level', rootHeadingX, secondpageY);
        
            doc.setFont('helvetica');
            doc.setFontSize(7.2);
        
            let currentY = secondpageY + 5;
        
            pairs.forEach((pair) => {
                interface WrappedLine { text: string; labelLen: number; isFirstSubline: boolean; }
                const allSublines: WrappedLine[] = [];
                pair.lines.forEach(({ label, rest }) => {
                    const fullLine = label + ' ' + rest;
                    const sublines: string[] = doc.splitTextToSize(fullLine, widthLeft);
                    const labelLen = (label + ' ').length;
                    sublines.forEach((sub: string, i: number) => {
                        allSublines.push({ text: sub, labelLen, isFirstSubline: i === 0 });
                    });
                });
        
                const totalHeight = allSublines.length * lineSpacing + 1;
                doc.setFillColor(245, 245, 245);
                const totalWidth = widthLeft + widthRight - 5;
                doc.rect(startX, currentY - 3, totalWidth, totalHeight, 'F');
        
                let localY = currentY;
                allSublines.forEach(({ text, labelLen, isFirstSubline }) => {
                    if (isFirstSubline) {
                        doc.setFont('helvetica', 'bold');
                        const labelPart = text.slice(0, labelLen);
                        doc.text(labelPart, startX, localY);
                        doc.setFont('helvetica', 'normal');
                        const remainder = text.slice(labelLen);
                        const boldWidth = doc.getTextWidth(labelPart);
                        doc.text(remainder, startX + boldWidth, localY);
                    } else {
                        doc.setFont('helvetica', 'normal');
                        doc.text(text, startX, localY);
                    }
                    localY += lineSpacing;
                });
        
                doc.setFont('helvetica', 'bold');
                const rootX = startX + widthLeft + 3;
                const rootCenterY = currentY - 1.8 + (totalHeight / 2);
                doc.text(pair.root, rootX, rootCenterY);
        
                currentY += totalHeight + pairSpacing;
            });
        };
    
        const widthLeft = 75;
        const widthRight = 17;
        printMovementPairs(movementPairs, titleX, secondpageY, widthLeft, widthRight);
    
        // ---------------- MIDDLE COLUMN BOX ----------------
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setCharSpace(-0.1);
        const AISTitleX = 110;
        const AISTitleXY = 8;
        
        const AISTitle = "ASIA Impairment Scale (AIS)";
        doc.text(AISTitle, AISTitleX, AISTitleXY);
        const AISTitleWidth = doc.getTextWidth(AISTitle);
        doc.setLineWidth(0.2);
        doc.line(AISTitleX, AISTitleXY + 1, AISTitleX + AISTitleWidth - 2, AISTitleXY + 1);
        
        const boxX = 104;
        const boxY = 13;
        const boxWidth = 76;
        const boxHeight = 131;
        
        doc.setLineWidth(0.5);
        doc.rect(boxX, boxY, boxWidth, boxHeight);
        
        const textX = boxX + 3;
        let textY = boxY + 6;
        
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        
        const printBullet = (boldLabel: string, normalText: string, maxWidth: number) => {
            doc.setCharSpace(-0.05);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
        
            const fullString = `${boldLabel} ${normalText}`.trim();
            const wrappedLines = doc.splitTextToSize(fullString, maxWidth);
            if (wrappedLines.length > 0) {
                const firstLine = wrappedLines[0];
                const labelWidth = doc.getTextWidth(boldLabel + ' ');
                doc.setFont('helvetica', 'bold');
                doc.text(boldLabel, textX, textY);
                doc.setFont('helvetica', 'normal');
                const remainder = firstLine.slice((boldLabel + ' ').length);
                doc.text(remainder, textX + labelWidth, textY);
                for (let i = 1; i < wrappedLines.length; i++) {
                    textY += 3.3;
                    doc.text(wrappedLines[i], textX, textY);
                }
                textY += 8;
            }
        };
        
        printBullet('A = Complete.', ` No sensory or motor function is preserved in the sacral segments S4-5.`, boxWidth - 6);
        printBullet('B = Sensory Incomplete.', `  Sensory but not motor function is preserved below the neurological level and includes the sacral segments S4-5 (light touch or pin prick at S4-5 or deep anal pressure) AND no motor function is preserved more than three levels below the motor level on either side of the body.`, boxWidth - 6);
        printBullet('C = Motor Incomplete.', `  Motor function is preserved at the most caudal sacral segments for voluntary anal contraction (VAC) OR the patient meets the criteria for sensory incomplete status (sensory function preserved at the most caudal sacral segments (S4-S5) by LT, PP or DAP), and has some sparing of motor function more than three levels below the ipsilateral motor level on either side of the body. (This includes key or non-key muscle functions to determine motor incomplete status.) For AIS C – less than half of key muscle functions below the single NLI have a muscle grade >= 3.`, boxWidth - 6);
        printBullet('D = Motor Incomplete.', `  Motor incomplete status as defined above, with at least half (half or more) of key muscle functions below the single NLI having a muscle grade >= 3.`, boxWidth - 6);
        printBullet('E = Normal.', ` If sensation and motor function as tested with the ISNCSCI are graded as normal in all segments, and the patient had prior deficits, then the AIS grade is E. Someone without an initial SCI does not receive an AIS grade.`, boxWidth - 6);
        printBullet('Using ND:', ` To document the sensory, motor and NLI levels, the ASIA Impairment Scale grade, and/or the zone of partial preservation (ZPP) when they are unable to be determined based on the examination results.`, boxWidth - 6);
        
        // ------------- STEPS IN CLASSIFICATION --------------
        const addStepsColumn = (startX: number, startY: number, columnWidth: number) => {
            const printWrapped = (text: string, fontSize: number = 7.5, style: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal') => {
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', style);
                const lines = doc.splitTextToSize(text.trim(), columnWidth);
                lines.forEach((line: string) => {
                    doc.text(line, startX, currentY);
                    currentY += lineSpacing;
                });
            };
        
            type TextSegment = { text: string; style: 'normal' | 'bold' | 'italic' | 'bolditalic'; };
            interface WordObject { word: string; style: 'normal' | 'bold' | 'italic' | 'bolditalic'; }
        
            const printWrappedSegments = (segments: TextSegment[], startX: number, startY: number, columnWidth: number, lineSpacing = 3.5, fontSize = 7.5) => {
                doc.setFontSize(fontSize);
                let currentY = startY;
                const wordObjects: WordObject[] = [];
                segments.forEach(({ text, style }) => {
                    const words = text.split(/\s+/);
                    words.forEach((w, i) => {
                        const withSpace = (i < words.length - 1) ? (w + ' ') : w;
                        wordObjects.push({ word: withSpace, style });
                    });
                });
                let currentLine: WordObject[] = [];
                let currentLineWidth = 0;
                const printLine = () => {
                    let offsetX = startX;
                    for (const wObj of currentLine) {
                        doc.setFont('helvetica', wObj.style);
                        const wordWidth = doc.getTextWidth(wObj.word);
                        doc.text(wObj.word, offsetX, currentY);
                        offsetX += wordWidth;
                    }
                    currentY += lineSpacing;
                    currentLine = [];
                    currentLineWidth = 0;
                };
                for (const wObj of wordObjects) {
                    doc.setFont('helvetica', wObj.style);
                    const wWidth = doc.getTextWidth(wObj.word);
                    if (currentLineWidth + wWidth > columnWidth && currentLine.length > 0) {
                        printLine();
                    }
                    currentLine.push(wObj);
                    currentLineWidth += wWidth;
                }
                if (currentLine.length > 0) {
                    printLine();
                }
                return currentY;
            };
        
            let currentY = startY;
            const lineSpacing = 3.5;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setCharSpace(-0.1);
            currentY += lineSpacing + 2;
            const stepsTitleX = startX + 15;
            const stepsTitle = "Steps in Classification";
            doc.text(stepsTitle, stepsTitleX, startY);
            const stepsTitleWidth = doc.getTextWidth(stepsTitle);
            doc.setLineWidth(0.2);
            doc.line(stepsTitleX, startY + 1, stepsTitleX + stepsTitleWidth - 2, startY + 1);
            doc.setCharSpace(-0.05);
            printWrapped(`The following order is recommended for determining the classification of individuals with SCI.`, 7.5, 'normal');
            currentY += 2;
            printWrapped(`1. Determine sensory levels for right and left sides.`, 8, 'bold');
            printWrapped(`The sensory level is the most caudal, intact dermatome for both pin prick and light touch sensation.`, 7.5, 'italic');
            currentY += 2;
            printWrapped(`2. Determine motor levels for right and left sides.`, 8, 'bold');
            printWrapped(`Defined by the lowest key muscle function that has a grade of at least 3 (on supine testing), providing the key muscle functions represented by segments above that level are judged to be intact (graded as a 5). 
            Note: in regions where there is no myotome to test, the motor level is presumed to be the same as the sensory level, if testable motor function above that level is also normal.`, 7.5, 'italic');
            currentY += 2;
            printWrapped(`3. Determine the neurological level of injury (NLI)`, 8, 'bold');
            printWrapped(`This refers to the most caudal segment of the cord with intact sensation and antigravity (3 or more) muscle function strength, provided that there is normal (intact) sensory and motor function rostrally respectively. The NLI is the most cephalad of the sensory and motor levels determined in steps 1 and 2.`, 7.5, 'italic');
            currentY += 2;
            printWrapped(`4. Determine whether the injury is Complete or Incomplete.`, 8, 'bold');
        
            const paragraphSegments: TextSegment[] = [
                { text: `(i.e. absence or presence of sacral sparing).\nIf voluntary anal contraction = `, style: 'italic' },
                { text: `No`, style: 'bolditalic' },
                { text: ` AND all S4-5 sensory scores = `, style: 'italic' },
                { text: `0`, style: 'bolditalic' },
                { text: ` AND deep anal pressure = `, style: 'italic' },
                { text: `No`, style: 'bolditalic' },
                { text: `, then injury is `, style: 'italic' },
                { text: `Complete`, style: 'bolditalic' },
                { text: `. Otherwise, injury is `, style: 'italic' },
                { text: `Incomplete`, style: 'bolditalic' },
                { text: `.`, style: 'italic' }
            ];
        
            currentY = printWrappedSegments(paragraphSegments, startX, currentY, 95);
            currentY += 2;
            const printUnderlinedCompleteLine = (prefixText: string, suffixText: string, startX: number, currentY: number): number => {
                doc.setFont("helvetica", "bold");
                doc.setFontSize(7.5);
                doc.text(prefixText, startX, currentY);
                let offsetX = startX + doc.getTextWidth(prefixText);
                const completeWord = "Complete";
                doc.text(completeWord, offsetX, currentY);
                doc.setDrawColor(0, 0, 0);
                doc.setLineWidth(0.2);
                const underlineY = currentY + 1;
                const completeWidth = doc.getTextWidth(completeWord);
                doc.line(offsetX, underlineY, offsetX + completeWidth, underlineY);
                offsetX += completeWidth;
                doc.text(suffixText, offsetX, currentY);
                return currentY + 6;
            };
        
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text("5. Determine ASIA Impairment Scale (AIS) Grade:", startX, currentY);
            currentY += 5;
            currentY = printUnderlinedCompleteLine("Is injury ", "? If YES, AIS = A", startX + 3, currentY);
            doc.setFont("helvetica", "bold");
            const boldNo1 = "NO ";
            doc.text(boldNo1, startX + 13.5, currentY);
            const noX1 = startX + 13.5 + doc.getTextWidth(boldNo1);
            const drawDownArrow = (doc: jsPDF, x: number, y: number, stemLen = 2.5, tipSize = 2): void => {
                doc.setLineWidth(0.8);
                doc.setDrawColor(0, 0, 0);
                doc.line(x, y - stemLen, x, y);
                doc.setFillColor(0, 0, 0);
                doc.triangle(x - 1.2, y, x + 1.2, y, x, y + tipSize, "F");
            };
            drawDownArrow(doc, noX1 + 2, currentY, 3, 2);
            doc.setFont("helvetica", "normal");
            currentY += 5;
            currentY = printUnderlinedCompleteLine("Is injury Motor ", "? If YES, AIS = B", startX + 3, currentY);
            doc.setFont("helvetica", "bold");
            const boldNo2 = "NO ";
            doc.text(boldNo2, startX + 13.5, currentY);
            const noX2 = startX + 13.5 + doc.getTextWidth(boldNo2);
            drawDownArrow(doc, noX2 + 2, currentY, 3, 2);
            doc.setFont("helvetica", "normal");
            const wrapStartX2 = noX2 + 8;
            const wrapWidth = 57;
            const noText2 = `(No=voluntary anal contraction OR motor function more than three levels below the motor level on a given side, if the patient has sensory incomplete classification)`;
            const wrapped2 = doc.splitTextToSize(noText2, wrapWidth);
            wrapped2.forEach((line: string) => {
                doc.text(line, wrapStartX2, currentY);
                currentY += 3.2;
            });
            currentY += 2;
            const underlineSubstring = (text: string, substr: string, x: number, y: number): void => {
                doc.text(text, x, y);
                const index = text.indexOf(substr);
                if (index < 0) return;
                const prefix = text.slice(0, index);
                const prefixWidth = doc.getTextWidth(prefix);
                const substrWidth = doc.getTextWidth(substr);
                const underlineY = y + 0.5; 
                const startX = x + prefixWidth;
                const endX = startX + substrWidth;
                doc.setDrawColor(0);
                doc.setLineWidth(0.2);
                doc.line(startX, underlineY, endX, underlineY);
            };
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            underlineSubstring("Are at least half (half or more) of the key muscles below the", "at least", startX, currentY);
            currentY += 3.5;
            underlineSubstring("neurological level of injury graded 3 or better?", "neurological", startX, currentY);
            currentY += 6;
            doc.setFont("helvetica", "bold");
            const noX = startX + 20;
            const yesX = startX + 45;
            doc.text("NO", noX-4, currentY);
            doc.text("YES", yesX-5, currentY);
            const arrowStemY = currentY + 1;
            const noTextWidth = doc.getTextWidth("NO");
            drawDownArrow(doc, noX + noTextWidth / 2, arrowStemY, 3, 2);
            const yesTextWidth = doc.getTextWidth("YES");
            drawDownArrow(doc, yesX + yesTextWidth / 2, arrowStemY, 3, 2);
            currentY += 6.5;
            doc.text("AIS=C", noX - 2.5, currentY);
            doc.text("AIS=D", yesX - 2, currentY);
            currentY += 6;
            doc.text("If sensation and motor function is normal in all segments, AIS=E", startX, currentY);
            currentY += 3.5;
            doc.setFont("helvetica", "italic");
            doc.setFontSize(7.5);
            doc.setCharSpace(-0.1);
            const noteLines = doc.splitTextToSize(
                `Note: AIS E is used in follow-up testing when an individual with a documented SCI has recovered normal function. If at initial testing no deficits are found, the individual is neurologically intact: the ASIA Impairment Scale does not apply.`,
                95
            );
            noteLines.forEach((line: string) => {
                doc.text(line, startX, currentY);
                currentY += 4;
            });
            currentY += 2;
            printWrapped(`6. Determine the zone of partial preservation (ZPP)`, 8, 'bold');
            printWrapped(
            `The ZPP is used only in injuries with absent motor (no VAC) OR sensory function (no DAP and no LT and no PP sensation) in the lowest sacral segments S4-5, and refers to those dermatomes and myotomes caudal to the sensory and motor levels that remain partially innervated. With sacral sparing of sensory function, the sensory ZPP is not applicable and therefore “NA” is recorded in the block of the worksheet. Accordingly, if VAC is present, the motor ZPP is not applicable and is noted as “NA”.`,
            7.5,
            'italic'
            );
        };
    
        addStepsColumn(186, 8, 85);
    
        // Generate the PDF as a blob
        const pdfOutput = doc.output('blob');
        const pdfFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
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
        } 
        // else {
        //     doc.save(pdfFilename);
        // }
        return doc.output("blob");
    };

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                const base64 = dataUrl.split(',')[1];
                resolve(base64);
            };
            reader.onerror = () => reject(new Error('Error reading PDF blob'));
            reader.readAsDataURL(blob);
            });
    };
    
    export const exportPDF = async (
        examData: ExamData,
        filename: string,
        examDate?: Date
    ): Promise<void> => {
        const pdfBlob = await generatePDFBlob(examData, filename, examDate);
        const pdfFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
        if (Capacitor.isNativePlatform()) {
            try {
            const base64Content = await blobToBase64(pdfBlob);
            await Filesystem.writeFile({
                path: pdfFilename,
                data: base64Content,
                directory: Directory.Documents,
                recursive: true,
            });
            console.log("PDF file saved successfully.");
            } catch (error) {
            console.error("Error saving PDF file", error);
            }
        } else {
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = pdfFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };