export interface ExpectedResults {
    sensoryRight: string;
    sensoryLeft: string;
    motorRight: string;
    motorLeft: string;
    nli: string;
    ais: string;
    completeness: 'Complete' | 'Incomplete';
    zppSensoryRight: string;
    zppSensoryLeft: string;
    zppMotorRight: string;
    zppMotorLeft: string;
}

export interface ExamData {
    name: string;
    rightMotorScores: Record<string, number>;
    leftMotorScores: Record<string, number>;
    rightLightTouchScores: Record<string, number>;
    leftLightTouchScores: Record<string, number>;
    rightPinPrickScores: Record<string, number>;
    leftPinPrickScores: Record<string, number>;
    vac: boolean;
    dap: boolean;
    lowestNonKeyMuscle: { right: string | null; left: string | null };
    comments: string;
    expected: ExpectedResults;
}

export const exams: ExamData[] = [
    {
        name: 'Learning Case 1',
        rightMotorScores: {
            'C5': 5, 'C6': 4, 'C7': 3, 'C8': 0, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 3, 'C7': 0, 'C8': 0, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 1, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 1, 'C7': 1, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C5',
            sensoryLeft: 'C6',
            motorRight: 'C6',
            motorLeft: 'C6',
            nli: 'C5',
            ais: 'C',
            completeness: 'Complete',
            zppSensoryRight: 'C7',
            zppSensoryLeft: 'C7',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C6'
        }
    },
    {
        name: 'Learning Case 2',
        rightMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 1, 'T5': 1, 'T6': 1, 'T7': 1, 'T8': 1, 'T9': 1,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 1, 'T5': 1, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 1, 'T5': 1, 'T6': 1, 'T7': 1, 'T8': 1, 'T9': 1,
            'T10': 1, 'T11': 1, 'T12': 1, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 1, 'T5': 1, 'T6': 1, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T3',
            sensoryLeft: 'T3',
            motorRight: 'T3',
            motorLeft: 'T3',
            nli: 'T3',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T12',
            zppSensoryLeft: 'T6',
            zppMotorRight: 'T3',
            zppMotorLeft: 'T3'
        }
    },
    {
        name: 'Learning Case 3',
        rightMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 1, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 4, 'C8': 1, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 1, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 1, 'S4-5': 1
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 1, 'C8': 1, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 1, 'S4-5': 1
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C6',
            sensoryLeft: 'C6',
            motorRight: 'C6',
            motorLeft: 'C7',
            nli: 'C6',
            ais: 'B',
            completeness: 'Incomplete',
            zppSensoryRight: 'C7',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'C8',
            zppMotorLeft: 'C8'
        }
    },
    {
        name: 'Learning Case 4',
        rightMotorScores: {
            'C5': 5, 'C6': 4, 'C7': 3, 'C8': 2, 'T1': 1,
            'L2': 3, 'L3': 4, 'L4': 2, 'L5': 2, 'S1': 2
        },
        leftMotorScores: {
            'C5': 5, 'C6': 3, 'C7': 3, 'C8': 2, 'T1': 1,
            'L2': 4, 'L3': 4, 'L4': 3, 'L5': 2, 'S1': 2
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 1, 'T3': 1, 'T4': 1, 'T5': 1, 'T6': 1, 'T7': 1, 'T8': 1, 'T9': 1,
            'T10': 1, 'T11': 1, 'T12': 1, 'L1': 1, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 1, 'T3': 1, 'T4': 1, 'T5': 1, 'T6': 1, 'T7': 1, 'T8': 1, 'T9': 1,
            'T10': 1, 'T11': 1, 'T12': 1, 'L1': 1, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 1, 'T3': 1, 'T4': 1, 'T5': 1, 'T6': 1, 'T7': 1, 'T8': 1, 'T9': 1,
            'T10': 1, 'T11': 1, 'T12': 1, 'L1': 1, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 2, 'L4': 2, 'L5': 2,
            'S1': 2, 'S2': 2, 'S3': 2, 'S4-5': 2
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C5',
            sensoryLeft: 'C5',
            motorRight: 'C6',
            motorLeft: 'C6',
            nli: 'C5',
            ais: 'D',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA'
        }
    },
    {
        name: 'Learning Case 5',
        rightMotorScores: {
            'C5': 4, 'C6': 5, 'C7': 4, 'C8': 5, 'T1': 5,
            'L2': 3, 'L3': 3, 'L4': 2, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 3, 'L3': 1, 'L4': 2, 'L5': 0, 'S1': 1
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 1, 'T8': 1, 'T9': 0,
            'T10': 1, 'T11': 1, 'T12': 1, 'L1': 0, 'L2': 1, 'L3': 0, 'L4': 0, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 1, 'T8': 0, 'T9': 1,
            'T10': 0, 'T11': 1, 'T12': 1, 'L1': 1, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 1, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 1, 'T8': 0, 'T9': 1,
            'T10': 1, 'T11': 0, 'T12': 1, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T6',
            sensoryLeft: 'T6',
            motorRight: 'C5',
            motorLeft: 'T6',
            nli: 'C5',
            ais: 'D',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L4',
            zppMotorLeft: 'S1'
        }
    },
    {
        name: 'Learning Case 6',
        rightMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 3, 'L3': 1, 'L4': 1, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 4, 'L3': 1, 'L4': 0, 'L5': 0, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 1, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 1, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T12',
            sensoryLeft: 'L1',
            motorRight: 'T12',
            motorLeft: 'L2',
            nli: 'T12',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L4',
            zppMotorLeft: 'L3'
        }
    },
    {
        name: 'Learning Case 7',
        rightMotorScores: {
            'C5': 2, 'C6': 1, 'C7': 0, 'C8': 0, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 3, 'C6': 0, 'C7': 0, 'C8': 0, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 1, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 0, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 1, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 0, 'C7': 0, 'C8': 0, 'T1': 0,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'T8': 0, 'T9': 0,
            'T10': 0, 'T11': 0, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0,
            'S1': 0, 'S2': 0, 'S3': 0, 'S4-5': 0
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C5',
            sensoryLeft: 'C5',
            motorRight: 'C4',
            motorLeft: 'C5',
            nli: 'C4',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C6',
            zppSensoryLeft: 'C5',
            zppMotorRight: 'C6',
            zppMotorLeft: 'C5'
        }
    },
    {
        name: 'Learning Case 8',
        rightMotorScores: {
            'C5': 3, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        leftMotorScores: {
            'C5': 2, 'C6': 2, 'C7': 1, 'C8': 1, 'T1': 0,
            'L2': 0, 'L3': 0, 'L4': 0, 'L5': 0, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 1, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 1, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 1, 'T7': 1, 'T8': 0, 'T9': 0,
            'T10': 1, 'T11': 1, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 0, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 1, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 1, 'T8': 0, 'T9': 0,
            'T10': 1, 'T11': 1, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 0, 'S3': 1, 'S4-5': 1
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 1, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 1, 'T3': 0, 'T4': 0, 'T5': 1, 'T6': 1, 'T7': 1, 'T8': 1, 'T9': 1,
            'T10': 1, 'T11': 1, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 1, 'C6': 1, 'C7': 1, 'C8': 1, 'T1': 1,
            'T2': 1, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 1, 'T8': 1, 'T9': 0,
            'T10': 1, 'T11': 1, 'T12': 0, 'L1': 0, 'L2': 0, 'L3': 0, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 1, 'S4-5': 1
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C4',
            sensoryLeft: 'C4',
            motorRight: 'C5',
            motorLeft: 'C4',
            nli: 'C4',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'C8',
            zppMotorLeft: 'C8'
        }
    },
    {
        name: 'Learning Case 9',
        rightMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 5, 'L3': 3, 'L4': 3, 'L5': 3, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 5, 'L3': 3, 'L4': 1, 'L5': 1, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 2, 'S4-5': 2
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 2, 'S3': 2, 'S4-5': 2
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 2, 'S4-5': 2
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 1, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 2, 'S3': 2, 'S4-5': 2
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'L2',
            sensoryLeft: 'L2',
            motorRight: 'L3',
            motorLeft: 'L3',
            nli: 'L2',
            ais: 'D',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA'
        }
    },
    {
        name: 'Learning Case 10',
        rightMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 5, 'L3': 5, 'L4': 4, 'L5': 2, 'S1': 0
        },
        leftMotorScores: {
            'C5': 5, 'C6': 5, 'C7': 5, 'C8': 5, 'T1': 5,
            'L2': 5, 'L3': 5, 'L4': 3, 'L5': 2, 'S1': 0
        },
        rightLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 2, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 0, 'S4-5': 0
        },
        leftLightTouchScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 2, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 0, 'S4-5': 0
        },
        rightPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 2, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 0, 'S4-5': 0
        },
        leftPinPrickScores: {
            'C2': 2, 'C3': 2, 'C4': 2, 'C5': 2, 'C6': 2, 'C7': 2, 'C8': 2, 'T1': 2,
            'T2': 2, 'T3': 2, 'T4': 2, 'T5': 2, 'T6': 2, 'T7': 2, 'T8': 2, 'T9': 2,
            'T10': 2, 'T11': 2, 'T12': 2, 'L1': 2, 'L2': 2, 'L3': 2, 'L4': 1, 'L5': 1,
            'S1': 1, 'S2': 1, 'S3': 0, 'S4-5': 0
        },
        vac: true,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'L3',
            sensoryLeft: 'L3',
            motorRight: 'L4',
            motorLeft: 'L4',
            nli: 'L3',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'S2',
            zppSensoryLeft: 'S2',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA'
        }
    },
];
