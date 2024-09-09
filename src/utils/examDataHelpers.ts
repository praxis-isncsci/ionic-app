export const convertExamDataToGridModel = (examData: any) => {
    const gridModel = [];
    const levels = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4_5'];

    for (const level of levels) {
        const row = [
            null,
            createCell(examData[`rightLightTouch${level}`], `right-light-touch-${level.toLowerCase()}`),
            createCell(examData[`rightPinPrick${level}`], `right-pin-prick-${level.toLowerCase()}`),
            createCell(examData[`leftLightTouch${level}`], `left-light-touch-${level.toLowerCase()}`),
            createCell(examData[`leftPinPrick${level}`], `left-pin-prick-${level.toLowerCase()}`),
            null
        ];

        // Add motor cells for specific levels
        if (['C5', 'C6', 'C7', 'C8', 'T1', 'L2', 'L3', 'L4', 'L5', 'S1'].includes(level)) {
            row[0] = createCell(examData[`rightMotor${level}`], `right-motor-${level.toLowerCase()}`);
            row[5] = createCell(examData[`leftMotor${level}`], `left-motor-${level.toLowerCase()}`);
        }

        gridModel.push(row);
    }

    return gridModel;
};

const createCell = (value: string, name: string) => {
    return {
        value,
        label: value,
        name,
        considerNormal: null,
        reasonImpairmentNotDueToSci: null,
        reasonImpairmentNotDueToSciSpecify: null,
        error: null
    };
};