export interface AnswerKey {
    sensoryLevels: string;
    motorLevels: string;
    nli: string;
    completeness: string;
    ais: string;
    sensoryZpp: string;
    motorZpp: string;
}
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
    answerKey: AnswerKey;
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
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C7',
            zppSensoryLeft: 'C7',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C6',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The right sensory level is C5, and the left sensory level is C6 as sensory function is intact from C2 through these dermatomes on the respective sides.',
                motorLevels: '<u>Motor levels:</u> The motor level is C6 bilaterally as this is the most caudal key muscle on each side with a motor score >3, and all motor function above this level is presumed to be intact. Even though the right C7 myotome has a motor score of 3, right C6 motor function is impaired (4/5), so C7 does not satisfy the motor level criteria (all motor function rostral to the motor level must be intact).',
                nli: '<u>NLI:</u> The NLI is C5 as this is the most caudal level with intact sensory function and at least antigravity strength (>3/5), and all sensorimotor function above this level is intact. More simply stated, C5 is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> There is no sensory function preserved in the S4-5 dermatome on either side and no DAP sensation. Therefore, the sensory ZPPs are applicable and are C7 bilaterally as this is the most caudal segment on each side with any preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is applicable bilaterally because VAC is absent. The motor ZPP is C7 on the right and C6 on the left, as these are the most caudal myotomes on the respective sides with any preserved motor function.'
            }
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
            zppMotorLeft: 'T3',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is T3 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The motor level is T3 bilaterally. Motor function is intact in the C5-T1 key muscles bilaterally and because myotomes T2-L1 are not clinically testable, the motor level is presumed to be the same as the sensory level (T3).',
                nli: '<u>NLI:</u> The NLI is T3 as each of the motor and sensory levels is T3.',
                completeness: '<u>Completeness:</u> There is no sacral sparing (sensorimotor function in the lowest sacral segments is absent), so this is a complete injury.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is T12 on the right and T6 on the left because these are the most caudal segments on the respective sides with any sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is T3 bilaterally because there is no preserved motor function in clinically testable key muscles caudal to the motor level. Even though the sensory ZPP extends to T12 on the right and T6 on the left, it is important to note that motor function does not follow sensory function when determining the motor ZPPs.'
            }
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
            zppMotorLeft: 'C8',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C6 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The motor level is C6 on the right and C7 on the left as these myotomes represent the most caudal segments on the respective sides with a motor grade >3, with intact motor function rostral to these levels.',
                nli: '<u>NLI:</u> The NLI is C6 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sensory sacral sparing (preserved S4-5 PP and LT sensation on the left), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is B due to preserved left S4-5 PP and LT sensation. The injury is not motor incomplete because there is no VAC, nor is there any motor function more than 3 segments below the motor level on either side.',
                sensoryZpp: '<u>Sensory ZPPs:</u> Because DAP sensation is absent and there is no PP or LT sensation at the right S4-5 dermatome, the right sensory ZPP is applicable and is C7 as this is the most caudal segment on the right side with any preserved sensory function. The left sensory ZPP is NA because there is preserved PP and LT sensation in the left S4-5 dermatome. This is a unique case in which there is a unilateral sensory ZPP.',
                motorZpp: '<u>Motor ZPPs:</u> In the absence of VAC, the motor ZPP is applicable and is C8 bilaterally as this is the most caudal segment on each side with any motor function.'
            }
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
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C5 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The motor level is C6 bilaterally as this is the most caudal key muscle with a motor grade >3, and all motor function rostral to this level is intact.',
                nli: '<u>NLI:</u> The NLI is C5 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory and motor function in the lowest sacral segments (DAP is present, S4-5 LT/PP sensation is preserved bilaterally, and VAC is present), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is D. Because VAC is present, this is a motor incomplete injury. Even if VAC had been absent, this would still qualify as a motor incomplete injury because there is sensory sacral sparing and preserved motor function more than 3 segments below the motor level of C6 on both sides. Half (9/18) of the key muscles below the NLI (C5) have a motor grade >3, so this injury just barely meets the criteria for AIS D grade.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the lowest sacral segments (i.e., VAC is present).'
            }
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
            zppMotorLeft: 'S1',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is T6 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The right motor level is C5 because this is the most caudal key muscle with a grade >3, and motor function above this level is presumed to be intact. Although there is no testable motor function at the C2-C4 myotomes, the motor grade at each of these segments is considered to be 5 as sensory function of all corresponding dermatomes above the sensory level is intact. Of note, because weakness in the right elbow flexors/extensors is much more rostral to the bilateral sensory levels of T6 (and left motor level of T6), it is recommended that the examiner evaluates for a non-SCI condition that may be the cause of the upper extremity motor impairment. The left motor level is T6 (following the sensory level) because all motor function is presumed to be intact through this level.',
                nli: '<u>NLI:</u> The NLI is C5 because this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the lowest sacral segments as S4-5 LT sensation is preserved bilaterally, so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is D. This case meets criteria for a motor incomplete lesion. Even though VAC is absent, there is sensory sacral sparing and preserved motor function more than 3 levels below the motor level on both the right and left sides. Because at least half (in this case 11/18) of the key muscles below the NLI (C5) have a motor grade >3, this injury is classified as AIS D.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (LT sensation is preserved in the left and right S4-5 dermatome).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP, which is applicable bilaterally in the absence of VAC, is L4 on the right and S1 on the left because these are the most caudal segments on the respective sides with preserved motor function.'
            }
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
            zppMotorLeft: 'L3',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is T12 on the right and L1 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.',
                motorLevels: '<u>Motor levels:</u> The right motor level is T12 and defers to the sensory level as it is presumed that motor function is intact through this segment. The left motor level is L2 because this is the most caudal key muscle with a grade >3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is T12 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the most caudal sacral segments (DAP is present and S4-5 LT/PP sensation is preserved bilaterally), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is C. Although VAC is absent, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing at right L4, which is more than 3 segments below the right motor level of T12. This injury is AIS C grade (and not AIS D) because less than half (2/10) of the key muscles below the NLI (T12) have a motor grade >3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is applicable bilaterally because VAC is absent. The motor ZPP is L4 on the right and L3 on the left as these are the most caudal segments on the respective sides with preserved motor function.'
            }
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
            zppMotorLeft: 'C5',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C5 bilaterally because sensory function is intact from C2 through this dermatome on each side.',
                motorLevels: '<u>Motor levels:</u> The right motor level is C4 because motor function is presumed to be intact from C2 through this level as sensory function is intact in these dermatomes (C2-C4) without a testable myotome. Because the motor grade is <3 at the right elbow flexors, the right motor level cannot be C5. The left motor level is C5 because this is the most caudal key muscle with a grade >3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is C4 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is C6 on the right and C5 on the left, as these are the most caudal segments on the respective sides with preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is C6 on the right and C5 on the left, as these are the most caudal myotomes on the respective sides with any motor function. If there are no segments with partially preserved function below the motor level, as in this case on the left, the motor level is entered in the box for ZPP.'
            }
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
            zppMotorLeft: 'C8',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C4 bilaterally because sensory function is intact from C2 through this dermatome on each side.',
                motorLevels: '<u>Motor levels:</u> The right motor level is C5 because this is the most caudal key muscle with a grade >3, and all muscle function above this level is presumed to be intact. The left motor level is C4 because strength in the left elbow flexors (C5) is only 2; the motor level defers to the sensory level of C4 as it is presumed that motor function is intact through this level.',
                nli: '<u>NLI:</u> The NLI is C4 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the most caudal sacral segments (S4-5 LT/PP sensation are preserved bilaterally), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is C. Although VAC is absent, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing at left C8, which is more than 3 levels below the left motor level of C4. This injury is AIS grade C (and not AIS D) because less than half (in this case only 1/10) of key muscles caudal to the NLI (C4) have a motor grade >3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (preserved LT/PP sensation in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is applicable because there is no VAC present. The motor ZPP is C8 bilaterally as this is the lowest segment with preserved motor function on each side.'
            }
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
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is L2 bilaterally as sensory function is intact from C2 through this dermatome on both sides. Note that even though LT and PP sensation are intact at the S3 and S4-5 dermatomes on the right and S2 through S4-5 dermatomes on the left, there is impaired sensation above these levels; therefore, S4-5 does not satisfy sensory level criteria, even though this is the most caudal dermatome on both sides with intact PP and LT sensation.',
                motorLevels: '<u>Motor levels:</u> The motor level is L3 bilaterally as this is the most caudal key muscle with a motor grade >3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is L2 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory and motor function in the most caudal sacral segments (DAP is present, S4-5 LT/PP sensation is preserved bilaterally, and VAC is present), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is D. Because VAC is present, this is a motor incomplete injury. Exactly half (4/8) of the key muscles below the NLI (L2) have a motor grade >3, so this injury meets criteria for AIS D grade.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sparing in the most caudal sacral segments on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).'
            }
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
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is L3 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The motor level is L4 bilaterally as this is the most caudal key muscle on each side with a grade >3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is L3 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> Although there is no sparing of sensory function in the lowest sacral segments, there is motor sacral sparing (VAC is preserved), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The injury severity is motor incomplete (at least AIS C) because VAC is present. This injury is classified as AIS C (and not AIS D) because less than half (in this case only 2/6) of key muscles below the NLI (L3) have a motor grade >3. This is an example of a rare case in which VAC is present while S4-5 PP/LT and DAP sensation are absent (reported in 1.4% of motor incomplete injuries17). If results of the ISNCSCI exam reveal this scenario, it would be worthwhile to carefully evaluate the rectal exam findings to ensure VAC is indeed present and that a reflex contraction of the external anal sphincter was not mistaken for a voluntary contraction.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPPs are applicable because there is no sensory function in the lowest sacral segments. The sensory ZPP is S2 bilaterally as this is the most caudal segment on both sides with partially preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because VAC is present.'
            }
        }
    },
];