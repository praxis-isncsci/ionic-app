import type { MotorLevel, SensoryLevel, MotorMuscleValue, SensoryPointValue  } from 'isncsci-ui/dist/esm/core/domain';

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
    completeness: 'Complete' | 'Incomplete' | 'ND';
    zppSensoryRight: string;
    zppSensoryLeft: string;
    zppMotorRight: string;
    zppMotorLeft: string;
    answerKey: AnswerKey;
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface PracticeExam {
    name: string;
    workbookName: string;
    difficulty: Difficulty;
    acknowledgment: string;

    rightMotorScores:  Partial<Record<MotorLevel, MotorMuscleValue>>;
    leftMotorScores:   Partial<Record<MotorLevel, MotorMuscleValue>>;
    rightLightTouchScores: Partial<Record<SensoryLevel, SensoryPointValue>>;
    leftLightTouchScores:  Partial<Record<SensoryLevel, SensoryPointValue>>;
    rightPinPrickScores:   Partial<Record<SensoryLevel, SensoryPointValue>>;
    leftPinPrickScores:    Partial<Record<SensoryLevel, SensoryPointValue>>;

    vac: boolean;
    dap: boolean;
    lowestNonKeyMuscle: {
        right: MotorLevel | null;
        left : MotorLevel | null;
    };

    comments: string;
    expected: ExpectedResults;
}

export const exams: PracticeExam[] = [
    {
        name: 'Learning Case 1',
        workbookName: 'Learning Case 1',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '3', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '3', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
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
                motorLevels: '<u>Motor levels:</u> The motor level is C6 bilaterally as this is the most caudal key muscle on each side with a motor score ≥3, and all motor function above this level is presumed to be intact. Even though the right C7 myotome has a motor score of 3, right C6 motor function is impaired (4/5), so C7 does not satisfy the motor level criteria (all motor function rostral to the motor level must be intact).',
                nli: '<u>NLI:</u> The NLI is C5 as this is the most caudal level with intact sensory function and at least antigravity strength (≥3/5), and all sensorimotor function above this level is intact. More simply stated, C5 is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> There is no sensory function preserved in the S4-5 dermatome on either side and no DAP sensation. Therefore, the sensory ZPPs are applicable and are C7 bilaterally as this is the most caudal segment on each side with any preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is applicable bilaterally because VAC is absent. The motor ZPP is C7 on the right and C6 on the left, as these are the most caudal myotomes on the respective sides with any preserved motor function.'
            }
        }
    },
    {
        name: 'Learning Case 1',
        workbookName: 'Learning Case 2',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '1', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
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
        name: 'Learning Case 2',
        workbookName: 'Learning Case 3',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '1', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '4', 'C8': '1', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
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
                motorLevels: '<u>Motor levels:</u> The motor level is C6 on the right and C7 on the left as these myotomes represent the most caudal segments on the respective sides with a motor grade ≥3, with intact motor function rostral to these levels.',
                nli: '<u>NLI:</u> The NLI is C6 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sensory sacral sparing (preserved S4-5 PP and LT sensation on the left), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is B due to preserved left S4-5 PP and LT sensation. The injury is not motor incomplete because there is no VAC, nor is there any motor function more than 3 segments below the motor level on either side.',
                sensoryZpp: '<u>Sensory ZPPs:</u> Because DAP sensation is absent and there is no PP or LT sensation at the right S4-5 dermatome, the right sensory ZPP is applicable and is C7 as this is the most caudal segment on the right side with any preserved sensory function. The left sensory ZPP is NA because there is preserved PP and LT sensation in the left S4-5 dermatome. This is a unique case in which there is a unilateral sensory ZPP.',
                motorZpp: '<u>Motor ZPPs:</u> In the absence of VAC, the motor ZPP is applicable and is C8 bilaterally as this is the most caudal segment on each side with any motor function.'
            }
        }
    },
    {
        name: 'Learning Case 2',
        workbookName: 'Learning Case 4',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '3', 'C8': '2', 'T1': '1',
            'L2': '3', 'L3': '4', 'L4': '2', 'L5': '2', 'S1': '2'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '3', 'C7': '3', 'C8': '2', 'T1': '1',
            'L2': '4', 'L3': '4', 'L4': '3', 'L5': '2', 'S1': '2'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
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
                motorLevels: '<u>Motor levels:</u> The motor level is C6 bilaterally as this is the most caudal key muscle with a motor grade ≥3, and all motor function rostral to this level is intact.',
                nli: '<u>NLI:</u> The NLI is C5 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory and motor function in the lowest sacral segments (DAP is present, S4-5 LT/PP sensation is preserved bilaterally, and VAC is present), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is D. Because VAC is present, this is a motor incomplete injury. Even if VAC had been absent, this would still qualify as a motor incomplete injury because there is sensory sacral sparing and preserved motor function more than 3 segments below the motor level of C6 on both sides. Half (9/18) of the key muscles below the NLI (C5) have a motor grade ≥3, so this injury just barely meets the criteria for AIS D grade.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the lowest sacral segments (i.e., VAC is present).'
            }
        }
    },
    {
        name: 'Learning Case 3',
        workbookName: 'Learning Case 5',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '4', 'C6': '5', 'C7': '4', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '3', 'L4': '2', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '1', 'L4': '2', 'L5': '0', 'S1': '1'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '1',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '1',
            'T10': '1', 'T11': '0', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
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
                motorLevels: '<u>Motor levels:</u> The right motor level is C5 because this is the most caudal key muscle with a grade ≥3, and motor function above this level is presumed to be intact. Although there is no testable motor function at the C2-C4 myotomes, the motor grade at each of these segments is considered to be 5 as sensory function of all corresponding dermatomes above the sensory level is intact. Of note, because weakness in the right elbow flexors/extensors is much more rostral to the bilateral sensory levels of T6 (and left motor level of T6), it is recommended that the examiner evaluates for a non-SCI condition that may be the cause of the upper extremity motor impairment. The left motor level is T6 (following the sensory level) because all motor function is presumed to be intact through this level.',
                nli: '<u>NLI:</u> The NLI is C5 because this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the lowest sacral segments as S4-5 LT sensation is preserved bilaterally, so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is D. This case meets criteria for a motor incomplete lesion. Even though VAC is absent, there is sensory sacral sparing and preserved motor function more than 3 levels below the motor level on both the right and left sides. Because at least half (in this case 11/18) of the key muscles below the NLI (C5) have a motor grade ≥3, this injury is classified as AIS D.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (LT sensation is preserved in the left and right S4-5 dermatome).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP, which is applicable bilaterally in the absence of VAC, is L4 on the right and S1 on the left because these are the most caudal segments on the respective sides with preserved motor function.'
            }
        }
    },
    {
        name: 'Learning Case 3',
        workbookName: 'Learning Case 6',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '1', 'L4': '1', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '4', 'L3': '1', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
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
                motorLevels: '<u>Motor levels:</u> The right motor level is T12 and defers to the sensory level as it is presumed that motor function is intact through this segment. The left motor level is L2 because this is the most caudal key muscle with a grade ≥3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is T12 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the most caudal sacral segments (DAP is present and S4-5 LT/PP sensation is preserved bilaterally), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is C. Although VAC is absent, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing at right L4, which is more than 3 segments below the right motor level of T12. This injury is AIS C grade (and not AIS D) because less than half (2/10) of the key muscles below the NLI (T12) have a motor grade ≥3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is applicable bilaterally because VAC is absent. The motor ZPP is L4 on the right and L3 on the left as these are the most caudal segments on the respective sides with preserved motor function.'
            }
        }
    },
    {
        name: 'Learning Case 4',
        workbookName: 'Learning Case 7',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '2', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '3', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
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
                motorLevels: '<u>Motor levels:</u> The right motor level is C4 because motor function is presumed to be intact from C2 through this level as sensory function is intact in these dermatomes (C2-C4) without a testable myotome. Because the motor grade is <3 at the right elbow flexors, the right motor level cannot be C5. The left motor level is C5 because this is the most caudal key muscle with a grade ≥3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is C4 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is C6 on the right and C5 on the left, as these are the most caudal segments on the respective sides with preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is C6 on the right and C5 on the left, as these are the most caudal myotomes on the respective sides with any motor function. If there are no segments with partially preserved function below the motor level, as in this case on the left, the motor level is entered in the box for ZPP.'
            }
        }
    },
    {
        name: 'Learning Case 5',
        workbookName: 'Learning Case 8',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '3', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '2', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '1', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
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
                motorLevels: '<u>Motor levels:</u> The right motor level is C5 because this is the most caudal key muscle with a grade ≥3, and all muscle function above this level is presumed to be intact. The left motor level is C4 because strength in the left elbow flexors (C5) is only 2; the motor level defers to the sensory level of C4 as it is presumed that motor function is intact through this level.',
                nli: '<u>NLI:</u> The NLI is C4 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the most caudal sacral segments (S4-5 LT/PP sensation are preserved bilaterally), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is C. Although VAC is absent, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing at left C8, which is more than 3 levels below the left motor level of C4. This injury is AIS grade C (and not AIS D) because less than half (in this case only 1/10) of key muscles caudal to the NLI (C4) have a motor grade ≥3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (preserved LT/PP sensation in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is applicable because there is no VAC present. The motor ZPP is C8 bilaterally as this is the lowest segment with preserved motor function on each side.'
            }
        }
    },
    {
        name: 'Learning Case 6',
        workbookName: 'Learning Case 9',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '3', 'L4': '3', 'L5': '3', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '3', 'L4': '1', 'L5': '1', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '2', 'S4_5': '2'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '2', 'S4_5': '2'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '2', 'S3': '2', 'S4_5': '2'
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
                motorLevels: '<u>Motor levels:</u> The motor level is L3 bilaterally as this is the most caudal key muscle with a motor grade ≥3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is L2 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory and motor function in the most caudal sacral segments (DAP is present, S4-5 LT/PP sensation is preserved bilaterally, and VAC is present), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is D. Because VAC is present, this is a motor incomplete injury. Exactly half (4/8) of the key muscles below the NLI (L2) have a motor grade ≥3, so this injury meets criteria for AIS D grade.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sparing in the most caudal sacral segments on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).'
            }
        }
    },
    {
        name: 'Learning Case 4',
        workbookName: 'Learning Case 10',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '5', 'L4': '4', 'L5': '2', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '5', 'L4': '3', 'L5': '2', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '0', 'S4_5': '0'
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
                motorLevels: '<u>Motor levels:</u> The motor level is L4 bilaterally as this is the most caudal key muscle on each side with a grade ≥3, and all motor function above this level is presumed to be intact.',
                nli: '<u>NLI:</u> The NLI is L3 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> Although there is no sparing of sensory function in the lowest sacral segments, there is motor sacral sparing (VAC is preserved), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The injury severity is motor incomplete (at least AIS C) because VAC is present. This injury is classified as AIS C (and not AIS D) because less than half (in this case only 2/6) of key muscles below the NLI (L3) have a motor grade ≥3. This is an example of a rare case in which VAC is present while S4-5 PP/LT and DAP sensation are absent (reported in 1.4% of motor incomplete injuries17). If results of the ISNCSCI exam reveal this scenario, it would be worthwhile to carefully evaluate the rectal exam findings to ensure VAC is indeed present and that a reflex contraction of the external anal sphincter was not mistaken for a voluntary contraction.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPPs are applicable because there is no sensory function in the lowest sacral segments. The sensory ZPP is S2 bilaterally as this is the most caudal segment on both sides with partially preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because VAC is present.'
            }
        }
    },
    {
        name: 'Learning Case 5',
        workbookName: 'Learning Case 11',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T11',
            sensoryLeft: 'T11',
            motorRight: 'T11',
            motorLeft: 'T11',
            nli: 'T11',
            ais: 'B',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L2',
            zppMotorLeft: 'L2',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is T11 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> Bilateral motor levels follow the sensory levels and are T11 because motor function is presumed to be intact from C2 through T11 on both sides.',
                nli: '<u>NLI:</u> The NLI is T11 as each of the motor and sensory levels is also T11.',
                completeness: '<u>Completeness:</u> There is sensory sacral sparing (preserved S4-5 PP/LT and DAP sensation), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is B because this is a sensory incomplete injury. The injury is not motor incomplete because there is no VAC, nor is there any motor function more than 3 levels below the motor level on either side. Although there is motor function at L2 bilaterally, this is exactly 3 levels below the motor level of T11 and therefore does not satisfy the criteria for motor incomplete status.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is preserved DAP and S4-5 LT/PP sensation.',
                motorZpp: '<u>Motor ZPPs:</u> Because there is no preservation of VAC, the motor ZPPs are applicable and are L2 bilaterally, as this is the most caudal segment with any motor function.'
            }
        }
    },
    {
        name: 'Learning Case 6',
        workbookName: 'Learning Case 12',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '3', 'C6': '2', 'C7': '1', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '3', 'C6': '1', 'C7': '1', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C4',
            sensoryLeft: 'C3',
            motorRight: 'C5',
            motorLeft: 'C3',
            nli: 'C3',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C4 on the right and C3 on the left as sensory function is intact from C2 through these dermatomes on the respective sides.',
                motorLevels: '<u>Motor levels:</u> The right motor level is C5 because this is the most caudal key muscle with a grade ≥3, and all muscle function above this level is presumed to be intact. The left motor level is C3 because the motor level defers to the sensory level on this side; while the left elbow flexors (C5) have a motor grade of 3, it cannot be presumed that motor function on the left side is intact at C4 as sensory function is impaired at that segment.',
                nli: '<u>NLI:</u> The NLI is C3 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is sparing of sensory function in the most caudal sacral segments (S4-5 LT sensation is preserved bilaterally), so this is an incomplete injury.',
                ais: '<u>AIS:</u> The AIS grade is C. Although VAC is absent, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing at the left C7 myotome, which is more than 3 segments below the left motor level of C3. This injury is AIS C grade (and not AIS D) because less than half (in this case only 2/20) of key muscles below the NLI (C3) have a motor grade ≥3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (preserved LT sensation in the S4-5 dermatome bilaterally).',
                motorZpp: '<u>Motor ZPPs:</u> There is no VAC and as such the motor ZPP is C7 bilaterally because this is the lowest segment with preserved motor function on each side.'
            }
        }
    },
    {
        name: 'Learning Case 7',
        workbookName: 'Learning Case 13',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Trace hip external rotation (considered L3 myotome) present on the left.',
        expected: {
            sensoryRight: 'T11',
            sensoryLeft: 'T11',
            motorRight: 'T11',
            motorLeft: 'T11',
            nli: 'T11',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'T11',
            zppMotorLeft: 'L3',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is T11 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The right and left motor levels are T11 (following the sensory levels) because testable motor function is intact in the C5-T1 myotomes and is presumed to be intact through T11 based on intact sensory scores in all dermatomes rostral to T12.',
                nli: '<u>NLI:</u> The NLI is T11 as each of the motor and sensory levels is T11.',
                completeness: '<u>Completeness:</u> This injury is incomplete because there is preserved DAP sensation.',
                ais: '<u>AIS:</u> The AIS grade is C. Because DAP sensation is preserved, the lesion is at least sensory incomplete. VAC is absent, and there is no key muscle function more than 3 segments below the motor level on either side. However, in cases with preserved sensory function in the most caudal sacral segments, non-key muscle function should be evaluated. In this case, non-key muscle function is preserved in left hip external rotation as noted in the comments box. Hip external rotation is assigned to the L3 myotome. (Please note that the most common non-key muscle functions and their associated myotomes can be found on the back of the ISNCSCI worksheet). Therefore, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing at left L3, which is more than 3 segments below the left motor level (T11). This injury is AIS C (and not AIS D) because less than half (in this case 0/10) of key muscles below the NLI have a motor grade ≥3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (DAP sensation is preserved).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPPs are applicable because VAC is absent. On the right, the motor ZPP is T11 because there is no motor function present below the right motor level. The left motor ZPP is L3; while non-key muscle functions are not typically included in the determination process of motor ZPPs, this is a unique situation in which the presence of a non-key muscle function is the only motor finding that defines the case as motor incomplete, so the associated myotome (L3) is recorded as the left motor ZPP.'
            }
        }
    },
    {
        name: 'Learning Case 8',
        workbookName: 'Learning Case 14',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '2', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '1', 'C3': '1', 'C4': '1', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '1', 'C3': '1', 'C4': '1', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '1', 'C3': '1', 'C4': '1', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '1', 'C3': '1', 'C4': '1', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C1',
            sensoryLeft: 'C1',
            motorRight: 'C1',
            motorLeft: 'C1',
            nli: 'C1',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C4',
            zppSensoryLeft: 'C4',
            zppMotorRight: 'C5',
            zppMotorLeft: 'C1',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C1 bilaterally as sensory function is impaired at C2. The rule states that if sensation is intact on the face but impaired at the C2 dermatome, the sensory level should be documented as C1 (not C0).',
                motorLevels: '<u>Motor levels:</u> The motor level is also C1 bilaterally as it is presumed to be the same as the sensory level.',
                nli: '<u>NLI:</u> The NLI is C1 as each of the motor and sensory levels is also C1.',
                completeness: '<u>Completeness:</u> There is no sacral sparing (sensorimotor function in the most caudal sacral segments is absent), so this is a complete injury.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is applicable in the absence of sensory sacral sparing and is C4 bilaterally as this is the most caudal segment on both sides with any sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> There is no VAC and as such the motor ZPP is C5 on the right as this is the most caudal segment with any motor function. The left motor level of C1 is documented as the left motor ZPP as no motor function extends beyond this level. It is important to note that motor function does not follow sensory function below the sensory level when recording the motor ZPP (for example, the left motor ZPP is not C4, even though this is the sensory ZPP).'
            }
        }
    },
    {
        name: 'Learning Case 9',
        workbookName: 'Learning Case 15',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '5', 'L4': '5', 'L5': '5', 'S1': '5'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '5', 'L4': '5', 'L5': '5', 'S1': '5'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Initial T4 AIS D SCI due to motor vehicle collision',
        expected: {
            sensoryRight: 'INT',
            sensoryLeft: 'INT',
            motorRight: 'INT',
            motorLeft: 'INT',
            nli: 'INT',
            ais: 'E',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> Sensory function is intact throughout all dermatomes (including the most caudal sacral segments), so “INT” should be written for “intact” in both sensory level boxes.',
                motorLevels: '<u>Motor levels:</u> Because motor function is intact in all key muscles and VAC is preserved, “INT” should be recorded in the boxes for motor level.',
                nli: '<u>NLI:</u> “INT” should be recorded in the box for NLI. An initial NLI of T4 is documented in the comments box. It would be best practice in AIS E cases to record the previous NLI (preferably from the initial exam) in the comments box, as this would provide valuable information about the injury and may help to explain and predict ongoing sequelae.',
                completeness: '<u>Completeness:</u> This is considered an incomplete injury. Despite a normal ISNCSCI exam, individuals with AIS E injuries may have signs of persistent neurological impairment including brisk reflexes, spasticity, impaired proprioception, and autonomic dysfunction.',
                ais: '<u>AIS:</u> The AIS grade is E because there are no longer any sensorimotor impairments detected with the components of the ISNCSCI exam. Note that the grade is only E if the individual initially had a documented SCI (in most cases based on an earlier ISNCSCI exam indicating some degree of sensory and/or motor impairment). If this was a person’s initial neurological exam (without evidence of an SCI), there would be no AIS grade.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides; DAP sensation is present, and both LT and PP sensation are preserved at bilateral S4-5 dermatomes.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because VAC is preserved.'
            }
        }
    },
    {
        name: 'Learning Case 7',
        workbookName: 'Learning Case 16',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '4', 'C6': '1', 'C7': '2', 'C8': '1', 'T1': '1',
            'L2': '2', 'L3': '3', 'L4': '1', 'L5': '1', 'S1': '2'
        },
        leftMotorScores: {
            'C5': '4', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '1',
            'L2': '4', 'L3': '3', 'L4': '4', 'L5': '4', 'S1': '4'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '1', 'T3': '1', 'T4': '0', 'T5': '0', 'T6': '1', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C4',
            sensoryLeft: 'C4',
            motorRight: 'C5',
            motorLeft: 'C5',
            nli: 'C4',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C4 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The right and left motor levels are C5 because this is the most caudal key muscle bilaterally with a grade ≥3, and all muscle function above this level is presumed to be intact due to intact sensory scores through C4.',
                nli: '<u>NLI:</u> The NLI is C4 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> This injury is incomplete as there is sacral sparing (DAP sensation, left S4-5 PP and LT sensation, and VAC are preserved).',
                ais: '<u>AIS:</u> The AIS grade is C. Because VAC is present, this injury is considered motor incomplete. This injury is AIS C (and not AIS D) because less than half (8/20) of the key muscles below the NLI (C4) have a motor grade ≥3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (DAP sensation is preserved). If DAP had been absent in this case, the left sensory ZPP would remain NA due to the preservation of left S4-5 PP and LT sensation, although the right sensory ZPP would then be applicable (and would be T8).',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).'
            }
        }
    },
    {
        name: 'Learning Case 10',
        workbookName: 'Learning Case 17',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '3',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '3',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '1', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '1', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T4',
            sensoryLeft: 'T3',
            motorRight: 'T1',
            motorLeft: 'T1',
            nli: 'T1',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T5',
            zppSensoryLeft: 'T5',
            zppMotorRight: 'T1',
            zppMotorLeft: 'T1',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is T4 on the right and T3 on the left as sensory function is intact from C2 through these dermatomes on the respective sides.',
                motorLevels: '<u>Motor levels:</u> The motor level is T1 bilaterally because this is the most caudal key muscle on both sides with a grade ≥3, and motor function above this level is presumed to be intact. Note that even though sensory function is intact through T4 on the right and T3 on the left, the motor level does not defer to the sensory level because the T1 myotome is impaired.',
                nli: '<u>NLI:</u> The NLI is T1 as this is the most rostral of the sensory and motor levels.',
                completeness: '<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is T5 bilaterally as this is the most caudal segment on both sides with preserved sensory function.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is T1 bilaterally as this the most caudal myotome on both sides with any motor function. In this case, the motor levels and motor ZPPs are the same because no motor function is preserved below this segment. Even though the sensory ZPP extends to T5 bilaterally, it is important to note that motor function does not follow sensory function when determining the ZPP.'
            }
        }
    },
    {
        name: 'Learning Case 11',
        workbookName: 'Learning Case 18',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '4', 'C8': '2', 'T1': '2',
            'L2': '3', 'L3': '4', 'L4': '3', 'L5': '2', 'S1': '2'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '3', 'C8': '2', 'T1': '2',
            'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1', 'S1': '1'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        vac: true,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C3',
            sensoryLeft: 'C3',
            motorRight: 'C3',
            motorLeft: 'C3',
            nli: 'C3',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The sensory level is C3 bilaterally as sensory function is intact from C2 through this dermatome on both sides.',
                motorLevels: '<u>Motor levels:</u> The right and left motor levels are C3 because the motor levels follow the sensory levels at this segment. While the elbow flexors have a motor grade of 5 and the wrist extensors a grade of 4 bilaterally, neither C5 nor C6 satisfy motor level criteria as it cannot be presumed that motor function is intact at C4. However, if this person were to regain normal PP sensation at the C4 dermatome, the motor levels would then become C6; this illustrates the importance of an accurate PP exam.',
                nli: '<u>NLI:</u> The NLI is C3 as each of the motor and sensory levels is also C3.',
                completeness: '<u>Completeness:</u> This injury is incomplete as there is sacral sparing.',
                ais: '<u>AIS:</u> The AIS grade is C. Because VAC is present, this injury is considered motor incomplete. Even if VAC were absent in this case, the injury would still satisfy criteria for motor incomplete status because there is sensory sacral sparing and preserved motor function more than 3 segments below the motor level. This injury is AIS C grade (and not AIS D) because less than half (9/20) of the key muscles below the NLI (C3) have a motor grade ≥3.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides. Even though DAP is absent, there is S4-5 PP and LT sensation on the right and S4-5 PP sensation on the left.',
                motorZpp: '<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).'
            }
        }
    },
    {
        name: 'Learning Case 12',
        workbookName: 'Learning Case 19',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': 'NT*', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': 'NT*',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': 'NT*',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': 'NT*',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T11',
            sensoryLeft: 'T11*',
            motorRight: 'T11',
            motorLeft: 'T11*',
            nli: 'T11*',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'L1',
            zppSensoryLeft: 'L1',
            zppMotorRight: 'T11',
            zppMotorLeft: 'T11*',
            answerKey: {
                sensoryLevels: '<u>Sensory levels:</u> The right sensory level is T11 because right-sided sensory function is intact from C2 through this dermatome. The left sensory level is T11*. Apart from the levels affected by the amputation, sensory function on the left is also intact from C2 through the T11 dermatome. Sensation is rated NT* at dermatomes C6-T1 on the left due to the amputation. Note that because the left C5 key sensory point was also impacted by the amputation, an alternate point within the C5 dermatome was tested by the examiner as documented in the comments box. It may be good practice to include the location of the alternate testing point so that it can be used for subsequent examinations, if the non-SCI condition is permanent, as it is in this case. If an alternate sensory point is used due to a transient condition that prevents testing at the key sensory point, such as the presence of a cast, the key sensory point should be used whenever possible for follow up exams. Based upon clinical assumptions, “*”-tagged scores are considered normal for classification, and due to this assumption, T11 requires an “*” (T11*). Under different assumptions about the dermatomes that cannot be tested, the left sensory level could be as rostral as C5.',
                motorLevels: '<u>Motor levels:</u> The right motor level defers to the sensory level of T11 because motor function is presumed to be intact through this segment. Similarly, left-sided motor function is also presumed to be intact through T11. Left C5-T1 myotomes are rated NT* due to the amputation, but the clinical assumption is that these scores are normal for classification; under different assumptions about the myotomes that cannot be tested, the motor level could be as rostral as C4. Because of this assumption, the left motor level must be tagged with an “*” (T11*).',
                nli: '<u>NLI:</u> The NLI is T11*. An “*” is required for the same reasons the left sensory and motor levels require one. If the clinical assumption was that the C6-T1 dermatomes and C5-T1 myotomes would not test as intact due to the SCI (even without the amputation), the NLI could be as rostral as C4.',
                completeness: '<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.',
                ais: '<u>AIS:</u> The AIS grade is A because this is a complete injury. Note that the AIS grade is not tagged with an “*” because the presence of the non-SCI condition has no impact on the anorectal exam in this case.',
                sensoryZpp: '<u>Sensory ZPPs:</u> The sensory ZPP is L1 bilaterally as this is the most caudal segment on both sides with any sensory function. It is important to note that the left sensory ZPP should not receive an “*” because this classification component is not impacted by a clinical assumption; in other words, left L1 is the lowest dermatome with any sensory sparing, and this does not depend on the presence or absence of the non-SCI condition.',
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is T11 on the right because this is the right motor level, and there is no motor function below this
                        segment. Similarly, the left motor ZPP is T11* as this is also the left motor level, and there is no motor function distal to this
                        myotome. The left motor ZPP requires the “*”-tag because if the assumption was instead that the C5-T1 myotomes were impaired
                        from the SCI, the left motor ZPP could be as rostral as C4. <br><br>  
                        When determining if a classification variable requires an “*”, the International Standards Committee recommends the following steps:
                        <br>  
                        <ol>    
                        <li>First perform the classification by replacing the “*”-tagged scores with the assumed ones.</li>    
                        <li>Record the classification results in the respective boxes at the bottom of the ISNCSCI worksheet.</li>    
                        <li>Next, use the actual examined scores and re-classify.</li>    
                        <li>All differing classification variables should receive an “*”.</li>  
                        </ol>  
                        <br>  
                        These steps are illustrated below in the classification of Case 19:
                        <br>  
                        <ol>
                        <li>LT and PP scores in the left C6-T1 dermatomes are assumed to be intact (2/2) for classification, and the motor scores in the left C5-T1 myotomes are also assumed to be intact (5/5).</li>
                        <li>By replacing the “*”-tagged scores with assumed ones, the right and left sensory levels are T11, the right and left motor levels are T11, the NLI is T11, this is a complete injury, the AIS grade is A, the right and left sensory ZPPs are L1, and the right and left motor ZPPs are T11. These results are recorded in the respective boxes at the bottom for the ISNCSCI worksheet.</li>
                        <li>Using the actual examined scores, the right sensory level is T11, the left sensory level is not determinable (ND) as it could be as rostral as C5, the right motor level is T11, the left motor level is ND as it could be as rostral as C4, the NLI is ND as it could be as rostral as C4, this is a complete injury, the AIS grade is A, the right and left sensory ZPPs are L1, the right motor ZPP is T11, and the left motor ZPP is ND as it could be as rostral as C4.</li>
                        <li>All differing classification variables, including the left sensory and motor levels, NLI, and left motor ZPP should receive an “*”.</li>
                        </ol>
                        `
            }
        }
    },
    {
        name: 'Learning Case 1',
        workbookName: 'Learning Case 20',
        difficulty: 'hard',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '1', 'C6': 'NT*', 'C7': '1', 'C8': 'NT*', 'T1': 'NT*',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '1', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: `NT* due to right transradial amputation.
 *considered not normal for classification.`,
        expected: {
            sensoryRight: 'C4',
            sensoryLeft: 'C4',
            motorRight: 'C4',
            motorLeft: 'C4',
            nli: 'C4',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T1',
            zppSensoryLeft: 'C8',
            zppMotorRight: 'ND',
            zppMotorLeft: 'C6',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C4 bilaterally because sensory function is intact from C2 through this dermatome on each side.`,
                motorLevels: `<u>Motor levels:</u> Both motor levels are also C4 because strength in the left elbow flexors (C5) is graded as only 1 bilaterally; the motor level defers to the sensory level of C4 as it is presumed that motor function is intact from C2 through this level.`,
                nli: `<u>NLI:</u> The NLI is C4 as each of the motor and sensory levels is also C4.`,
                completeness: `<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury. Note that the AIS grade is not tagged with an “*” because the presence of the non-SCI condition has no impact on the anorectal exam in this case.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is applicable bilaterally in the absence of sensory sacral sparing. The sensory ZPP is T1 on the right and C8 on the left as these are the lowest levels on the respective sides with preserved sensory function. It is important to note that the right sensory ZPP should not receive an “*” because this classification component is not impacted by a clinical assumption; in other words, right T1 is the lowest dermatome with any sensory sparing, and this does not depend on the presence or absence of the non-SCI condition.`,
                motorZpp: `<u>Motor ZPPs:</u> The right motor ZPP is ND due to the non-SCI condition. Based on the examination, C7 is the most caudal myotome with any motor function. However, the C8 and T1 myotomes are graded as NT*. In the absence of the amputation, it is possible that motor function would have extended to the T1 segment. Because the most caudal extent of motor preservation remains unknown, ND must be recorded for the right motor ZPP; ND does not require an “*” as this designation is not based on a clinical assumption. The left motor ZPP is C6 as this is the lowest myotome with any motor function on that side.`
            }
        }
    },
    {
        name: 'Learning Case 2',
        workbookName: 'Learning Case 21',
        difficulty: 'hard',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3*', 'C8': '1*', 'T1': '1*',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1*', 'C8': '1*', 'T1': '1*',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1*', 'C8': '1*', 'T1': '1*',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: `Left brachial plexus injury.
*considered normal for classification.`,
        expected: {
            sensoryRight: 'T6',
            sensoryLeft: 'T6*',
            motorRight: 'T6',
            motorLeft: 'T6*',
            nli: 'T6*',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T7',
            zppSensoryLeft: 'T7',
            zppMotorRight: 'T6',
            zppMotorLeft: 'T6*',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The right sensory level is T6 because right-sided sensory function is intact from C2 through this dermatome. The left sensory level is T6*. Apart from the levels affected by the brachial plexopathy, sensory function on the left is also intact from C2 through the T6 dermatome. Sensory scores are “*”-tagged at dermatomes C7-T1 on the left; based upon clinical judgment, these are considered normal for classification, and because of this clinical assumption, T6 requires an “*” (T6*). Note that without the clinical assumption, based on the examined scores, the left sensory level would be C6.`,
                motorLevels: `<u>Motor levels:</u> The motor level follows the sensory level bilaterally. The right motor level is T6 because motor function is presumed to be intact from C2 through this segment. Similarly, left-sided motor function is also presumed to be intact from C2 through T6. Left C7-T1 motor scores are tagged with an “*” due to the brachial plexopathy, and the clinical assumption is that these scores are considered normal for classification. Because of this assumption, the left motor level must be tagged with an “*” (T6*). Note that without the clinical assumption, based on the examined scores, the left motor level would be C7.`,
                nli: `<u>NLI:</u> The NLI is T6*. An “*” is required for the same reasons the left sensory and motor levels require one. If the clinical assumption was instead that the left C7-T1 dermatomes/myotomes were impaired as the result of the SCI, the NLI would be C6.`,
                completeness: `<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is T7 bilaterally as this is the most caudal segment on both sides with any sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is T6 on the right because this is the right motor level, and there is no motor function below this segment. Similarly, the left motor ZPP is T6* as this is also the left motor level, and there is no motor function caudal to this myotome. The left motor ZPP requires the “*”-tag because if the “*”-tagged dermatomes/myotomes were impacted by the SCI, the left motor ZPP would be T1.`
            }
        }
    },
    {
        name: 'Learning Case 3',
        workbookName: 'Learning Case 22',
        difficulty: 'hard',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '3', 'L4': '2', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '4*', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '1', 'L4': '2', 'L5': '0', 'S1': '1'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '1',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '1', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '1', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '1',
            'T10': '1', 'T11': '0', 'T12': '1', 'L1': '0', 'L2': '1', 'L3': '1', 'L4': '0', 'L5': '1',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: `Left wrist sprain with pain.
*considered normal for classification.`,
        expected: {
            sensoryRight: 'T6',
            sensoryLeft: 'T6',
            motorRight: 'T6',
            motorLeft: 'T6*',
            nli: 'T6*',
            ais: 'C*',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is T6 bilaterally as sensory function is intact from C2 through this dermatome on both sides. Note that the presence of the non-SCI condition does not affect the sensory scores or sensory levels in this case.`,
                motorLevels: `<u>Motor levels:</u> Motor function is presumed to be intact from C2 through T6 bilaterally; both motor levels defer to the sensory levels of T6. Motor function is rated 4* at the left C6 myotome due to the wrist sprain and pain, and it is assumed that motor function at this level is normal for classification. Because of this assumption, the left motor level must be tagged with an “*” (T6*). Otherwise, based on the examined scores, the left motor level would be C6.`,
                nli: `<u>NLI:</u> The NLI is T6*. An “*” is required for the same reason that the left motor level requires one. Based on the examined scores (without the clinical assumption), both the left motor level and NLI would be C6.`,
                completeness: `<u>Completeness:</u> This injury is incomplete as there is sacral sparing.`,
                ais: `<u>AIS:</u> The AIS grade is C* because VAC is present, and less than half (3/10) of key muscles below the NLI (T6*) have a motor grade ≥3. The AIS grade requires the “*”-tag because the classification is based on the clinical assumption that the left C6 myotome would be normal if not for the non-SCI condition. Based on the examined scores alone (without the clinical assumption), the left motor level and NLI would be C6. In this scenario (NLI of C6), the AIS grade would be D because more than half (9/16) of the key muscles below the NLI would have a motor grade ≥3. The C* indicates that a clinical assumption has been made and played a role in the classification.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is NA bilaterally because there is sensory sacral sparing on both sides (preservation of DAP and LT sensation at the S4-5 dermatomes bilaterally).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).`
            }
        }
    },
    {
        name: 'Learning Case 4',
        workbookName: 'Learning Case 23',
        difficulty: 'hard',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '3', 'C7': '3', 'C8': '2', 'T1': '2',
            'L2': '2', 'L3': '3', 'L4': '2*', 'L5': '2*', 'S1': '2'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '2', 'C8': '2', 'T1': '2',
            'L2': '5', 'L3': '3', 'L4': '3', 'L5': '1', 'S1': '4'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1*',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1*',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: true,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: `Old right peroneal neuropathy. 
*considered not normal for classification.`,
        expected: {
            sensoryRight: 'C6',
            sensoryLeft: 'C7',
            motorRight: 'C6',
            motorLeft: 'C6',
            nli: 'C6',
            ais: 'ND*',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'T2',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C6 on the right and C7 on the left as sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C6 bilaterally as this is the most caudal key muscle on both sides with a motor grade ≥3, and motor function above this segment is presumed to be intact.`,
                nli: `<u>NLI:</u> The NLI is C6 as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete as there is sacral sparing.`,
                ais: `<u>AIS:</u> While this injury is motor incomplete, the AIS grade cannot be defined and should be recorded as ND*. Based on the examined scores, less than half (6/16) of the key muscles below the NLI (C6) have a muscle grade >3 (which would result in an AIS grade of C). However, two of these motor scores (right L4 and L5) are graded 2* due to the presence of an old peroneal neuropathy. Although it is assumed that these scores are not normal for classification, the motor scores could be graded as 3 or 4 in the absence of the non-SCI condition. If that were the case, the AIS grade would be D as half (8/16) of the key muscles below the NLI would have a grade ≥3. Because the AIS grade could be either a C or D in the absence of the non-SCI condition, ND* must be documented. Note that the ND requires an “*” because there is an assumption that the clinical impairment is caused by both the SCI and the peroneal neuropathy; if the impairment had been caused by the SCI alone, the AIS grade would be C. Please note that it is good practice to document in the comments box that the injury is motor incomplete and that the AIS grade could be C or D.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The right sensory ZPP is NA because there is sparing of LT and PP sensation in the right S4-5 dermatome. The left sensory ZPP is applicable in the absence of both DAP and left S4-5 LT/PP sensation, and it is T2 as this is the most caudal segment on that side with any sensory function. This is a unique example of a unilateral sensory ZPP.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is NA bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).`
            }
        }
    },
    {
        name: 'Learning Case 13',
        workbookName: 'Learning Case 24',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '5', 'L4': '5', 'L5': '4', 'S1': '3'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '5', 'L3': '5', 'L4': '5', 'L5': '3', 'S1': '3'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '1',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '1',
            'S1': '1', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '1',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '1',
            'S1': '1', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'L4',
            sensoryLeft: 'L4',
            motorRight: 'L5',
            motorLeft: 'L5',
            nli: 'L4',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'L5',
            zppSensoryLeft: 'S1',
            zppMotorRight: 'S1',
            zppMotorLeft: 'S1',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is L4 bilaterally as sensory function is intact from C2 through this dermatome on both sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is L5 bilaterally as this is the most caudal key muscle on both sides with a motor grade ≥3, and all motor function rostral to this level is presumed to be intact.`,
                nli: `<u>NLI:</u> The NLI is L4 as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> There is no sacral sparing (sensorimotor function in the lowest sacral segments is absent), so this is a complete injury.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury. This is a unique example of a person with an AIS A SCI who is ambulatory.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is applicable bilaterally as there is no sparing of sensory function in the lowest sacral segments. The sensory ZPP is L5 on the right and S1 on the left because these are the most caudal segments on the respective sides with any sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPPs are applicable because VAC is absent, and as such are S1 given that this is the most caudal myotome on both sides with partially preserved motor function.`
            }
        }
    },
    {
        name: 'Learning Case 8',
        workbookName: 'Learning Case 25',
        difficulty: 'easy',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '3', 'C7': '4', 'C8': '3', 'T1': '4',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '4', 'C8': '3', 'T1': '3',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '2', 'T1': '1',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '2', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '2', 'T1': '1',
            'T2': '1', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '2', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Two spine fractures: one cervical and one thoracic.',
        expected: {
            sensoryRight: 'C5',
            sensoryLeft: 'C5',
            motorRight: 'C6',
            motorLeft: 'C6',
            nli: 'C5',
            ais: 'ND',
            completeness: 'ND',
            zppSensoryRight: 'ND',
            zppSensoryLeft: 'ND',
            zppMotorRight: 'ND',
            zppMotorLeft: 'ND',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C5 bilaterally as sensory function is intact from C2 through this dermatome on both sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C6 bilaterally as this is the most caudal key muscle on both sides with a motor grade ≥3, and all motor function rostral to this level is presumed to be intact.`,
                nli: `<u>NLI:</u> The NLI is C5 as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> While the thoracic level injury appears to be neurologically complete, the cervical injury is most likely incomplete. As such, completeness and AIS cannot be determined, and ND should therefore be recorded for these classification variables. A similar case and detailed recommendation of the International Standards Committee has been previously published18.`,
                ais: `<u>AIS:</u> AIS cannot be determined, and ND should therefore be recorded`,
                sensoryZpp: `<u>Sensory ZPPs:</u> All ZPPs are also recorded as ND. With the cervical level injury considered alone, sacral sparing may have been present, and in that case, one or more ZPPs would have been NA. With addition of the thoracic level injury, sacral sparing is now absent, technically rendering the ZPPs applicable. However, because injury completeness is unable to be determined, and therefore ZPP applicability for the separate injuries cannot be determined with certainty, ND should be recorded in the boxes for ZPP.`,
                motorZpp: `<u>Motor ZPPs:</u> All ZPPs are also recorded as ND. With the cervical level injury considered alone, sacral sparing may have been present, and in that case, one or more ZPPs would have been NA. With addition of the thoracic level injury, sacral sparing is now absent, technically rendering the ZPPs applicable. However, because injury completeness is unable to be determined, and therefore ZPP applicability for the separate injuries cannot be determined with certainty, ND should be recorded in the boxes for ZPP.`
            }
        }
    },
    {
        name: 'Learning Case 14',
        workbookName: 'Learning Case 26',
        difficulty: 'medium',
        acknowledgment: 'This case was developed by Brittany Snider and Steven Kirshblum with other members of ASIA’s International Standards Committee',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3*', 'C8': '1', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '1', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Right posterior deltoid to triceps tendon transfer (completed 5 years post-injury). *considered < 3 for classification.',
        expected: {
            sensoryRight: 'C6',
            sensoryLeft: 'C6',
            motorRight: 'C6*',
            motorLeft: 'C6',
            nli: 'C6',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C7',
            zppSensoryLeft: 'C6',
            zppMotorRight: 'C8',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C6 bilaterally as this is the most caudal dermatome on both sides with intact sensory function, and sensation above this level is also intact.`,
                motorLevels: `<u>Motor levels:</u> The right motor level is C6* because even though motor function is rated 3* at C7, the tested strength is impacted by a non-SCI condition, i.e., a tendon transfer of the right posterior deltoid to the triceps. The tendon transfer does not affect the innervation to the triceps at the C7 segment. The motor grade at C7 without the transfer is presumed to be <3 (otherwise the tendon transfer would not have been indicated), so the right motor level is C6*; this requires an “*” because the designation is based on this clinical assumption. The left motor level is also C6 as this is the most caudal myotome with a motor grade ≥3, and all motor function rostral to this level is presumed to be intact.`,
                nli: `<u>NLI:</u> The NLI is C6 as the sensory levels and left motor level are C6. The right motor level is also C6 based on clinical judgement (or would be C7 if strictly using the examined score). Therefore, the NLI does not require an “*” as it is not impacted by the non-SCI condition, which in this rare case leads to an improvement of muscle strength. Note that in the majority of cases involving a non-SCI condition, the non-SCI condition leads to an additional impairment of motor function, and therefore the NLI would require an “*” if any of the sensory or motor levels were “*”-tagged.`,
                completeness: `<u>Completeness:</u> There is no sacral sparing, so this is a complete injury.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is applicable bilaterally because there is no sensory sacral sparing. The sensory ZPP is C7 on the right and C6 on the left, as these are the most caudal segments on the respective sides with preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is applicable on both sides in the absence of VAC. The motor ZPP is C8 on the right and C7 on the left, as these are the most caudal myotomes on each side with any motor function.`
            }
        }
    },

    {
        name: 'Learning Case 9',
        workbookName: 'Learning Case 1__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '4', 'C6': '3', 'C7': '3', 'C8': '3', 'T1': '2',
            'L2': '3', 'L3': '4', 'L4': '3', 'L5': '3', 'S1': '3'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '4',
            'L2': '5', 'L3': '5', 'L4': '5', 'L5': '1', 'S1': '5'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '2', 'L4': '2', 'L5': '2',
            'S1': '2', 'S2': '2', 'S3': '2', 'S4_5': '2'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C3',
            sensoryLeft: 'INT',
            motorRight: 'C3',
            motorLeft: 'T1',
            nli: 'C3',
            ais: 'D',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The right sensory level is C3, as sensory function is intact at C2 and C3 on the right side. The sensory function on the left is intact (including the most caudal sacral segments), so “INT” should be written in the Left sensory box.`,
                motorLevels: `<u>Motor levels:</u> The right motor level is C3 because the motor level defers to the sensory level on this side; while the right elbow flexors (C5) have a motor grade of 4, it cannot be presumed that the motor function on the right side is intact at C4 as sensory function is impaired at that segment. The left motor level is T1 because this is the most caudal key muscle with a grade ≥3, and all motor function rostral to this level is presumed to be intact.`,
                nli: `<u>NLI:</u> The NLI is C3, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> There is sensory and motor sparing in the lowest sacral segments because there is DAP sensation, bilateral S4-5 LT/PP sensation, and VAC is present. This is therefore an incomplete injury.`,
                ais: `<u>AIS:</u> The AIS grade is D. Because VAC is present, this is a motor incomplete injury. More than half (18/20) of the key muscles below the NLI (C3) have a motor grade ≥3, so this injury meets criteria for AIS D grade.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sparing in the most caudal sacral segments on both sides (DAP is present, and LT/PP sensation is preserved in the S4-5 dermatome bilaterally).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is N/A bilaterally because there is preserved motor function in the most caudal segments (VAC is present).`
            }
        }
    },
    
    {
        name: 'Learning Case 15',
        workbookName: 'Learning Case 2__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3*', 'C8': '1*', 'T1': '1*',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1*', 'C8': '1*', 'T1': '1*',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1*', 'C8': '1*', 'T1': '1*',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: `Klumpke's paralysis. Partial palsy of the lower root of the brachial plexus on the left.  *tagged scores affected by brachial plexus injury; normal for classification.`,
        expected: {
            sensoryRight: 'T6',
            sensoryLeft: 'T6*',
            motorRight: 'T6',
            motorLeft: 'T6*',
            nli: 'T6*',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T7',
            zppSensoryLeft: 'T7',
            zppMotorRight: 'T6',
            zppMotorLeft: 'T6*',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The right sensory level is T6 because right-sided sensory function is intact from C2 – T6 dermatomes. The left sensory level is T6*. Apart from the levels affected by the brachial plexus injury, sensory function on the left is also intact from C2 – T6 dermatomes. Based upon clinical assumptions, “*”-tagged scores are considered normal for classification as documented in the comments box, and due to this assumption, T6 requires an “*” (T6*). Under different assumptions about the dermatomes that were affected by Klumpke’s paralysis, the left sensory level would be C6.`,
                motorLevels: `<u>Motor levels:</u> The right motor level defers to the sensory level of T6 because motor function is presumed to be intact through this segment. Similarly, left-sided motor function is also presumed to be intact through T6. Left C7-T1 myotomes are rated with a “*” due to a brachial plexus injury as noted in the comment box and are considered normal for classification. Because of this assumption, the left motor level must be tagged with an “*” (T6*). Under different assumptions about the myotomes affected by Klumpke’s paralysis, the motor level would be C7.`,
                nli: `<u>NLI:</u> The NLI is T6*. An “*” is required for the same reasons the left sensory and motor levels require one. If the clinical assumption was that the C7-T1 myotomes would not test as intact due to the SCI, the NLI would be C6.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury. Note that the AIS grade is not tagged with an “*” because the presence of the non-SCI condition has no impact on the anorectal exam in this case.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is T7 bilaterally, as this is the most caudal segment on both sides with any sensory function. It is important to note that the left sensory ZPP should not receive an “*” because a clinical assumption does not influence this classification component; in other words, left T7 is the lowest dermatome with any sensory sparing, and this does not depend on the presence or absence of the non-SCI condition.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is T6 on the right because this is the right motor level, and there is no motor function below this segment. Similarly, the left motor ZPP is T6*, as this is also the left motor level, and there is no motor function distal to this myotome. The left ZPP requires the “*”-tag because if the assumption were instead that the C7-T1 myotomes were impaired from the SCI, the left motor ZPP could be as rostral as C7. `
            }
        }
    },

    {
        name: 'Learning Case 16',
        workbookName: 'Learning Case 3__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '4', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Motor function present in non-key muscle at L2 on the right. +R adductors',
        expected: {
            sensoryRight: 'C7',
            sensoryLeft: 'C6',
            motorRight: 'C7',
            motorLeft: 'C7',
            nli: 'C6',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L2',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are C7 on the right and C6 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C7 bilaterally, as this is the most caudal key muscle with a motor grade ≥3, and all motor function rostral to this level is intact on both sides.`,
                nli: `<u>NLI:</u> The NLI is C6, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because DAP sensation is preserved.`,
                ais: `<u>AIS:</u> The AIS grade is C. Because DAP sensation is preserved, the lesion is at least sensory incomplete. VAC is absent, and there is no key muscle function more than 3 segments below the motor level on either side. However, in cases with preserved sensory function in the most caudal sacral segments, non-key muscle function should be evaluated. In this case, non-key muscle function is preserved in the right hip adductors as noted in the comments box. Hip adduction is assigned to the L2 myotome. (Please note that the most common non-key muscle functions and their associated myotomes can be found on the back of the ISNCSCI worksheet). Therefore, this injury is considered motor incomplete because there is sensory sacral sparing and motor sparing in right L2, which is more than 3 segments below the right motor level (C7). This injury is AIS C (and not AIS D) because less than half (in this case, 0/14) of the key muscles below the NLI have a motor grade ≥3.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (DAP sensation is preserved).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPPs are applicable because VAC is absent. On the left, the motor ZPP is C7 because there is no motor function present below the left motor level. The right motor ZPP is L2 because a note in the Comments box indicates that motor function is present in a non-key muscle at L2. `
            }
        }
    },

    {
        name: 'Learning Case 10',
        workbookName: 'Learning Case 4__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T12',
            sensoryLeft: 'T11',
            motorRight: 'T12',
            motorLeft: 'T11',
            nli: 'T11',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T12',
            zppSensoryLeft: 'T12',
            zppMotorRight: 'T12',
            zppMotorLeft: 'T11',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is T12 on the right and T11 on the left, as sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The right motor level is T12 and the left motor level is T11 (following the sensory levels) because testable motor function is intact in the C5-T1 myotomes and is presumed to be intact through these levels (T12 on the right and T11 on the left) based on intact sensory scores.`,
                nli: `<u>NLI:</u> .`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury, as no sensory or motor function is preserved in the sacral segments (DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is T12 bilaterally, as these are the most caudal segments on the respective sides with preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPPs are T12 on the right and T11 on the left because there is no preserved motor function in clinically testable key muscles caudal to the motor level. Even though the sensory ZPP extends to T12 on the left, it is important to note that motor function does not follow sensory function when determining the motor ZPPs.`
            }
        }
    },

    {
        name: 'Learning Case 11',
        workbookName: 'Learning Case 5__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '2', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '1', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '2', 'L2': '2', 'L3': '1', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '1', 'S4_5': '2'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'L1',
            sensoryLeft: 'L2',
            motorRight: 'L1',
            motorLeft: 'L1',
            nli: 'L1',
            ais: 'B',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L2',
            zppMotorLeft: 'L2',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are L1 on the right and L2 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is L1 bilaterally. Given that the key muscles on both right and left at L2 are less than a grade 3, we defer to the ‘motor follows sensory’ rule. Since there is intact sensory function at and rostral to is L1, we presume these levels are also motor intact.`,
                nli: `<u>NLI:</u> The NLI is L1, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because there is sensory sparing in the lowest sacral segments. DAP sensation is preserved and there is bilateral S4-5 LT/PP sensation.`,
                ais: `<u>AIS:</u> The AIS grade is B because this is a sensory incomplete injury. The injury is not motor incomplete because there is no VAC, nor is there any motor function more than 3 levels below the motor level on either side.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing in the most caudal sacral segments on both sides (DAP sensation is preserved in the S4-5 dermatome bilaterally).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPPs are applicable because VAC is absent, and are L2 bilaterally. This is the most caudal segment with any motor function.`
            }
        }
    },

    {
        name: 'Learning Case 12',
        workbookName: 'Learning Case 6__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '1', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C6',
            sensoryLeft: 'C6',
            motorRight: 'C6',
            motorLeft: 'C6',
            nli: 'C6',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C6',
            zppSensoryLeft: 'C6',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C6',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C6 bilaterally, as sensory function is intact from C2 through this dermatome on both sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C6 bilaterally, as this is the most caudal key muscle on each side with a grade ≥3, and all motor function above this level is intact.`,
                nli: `<u>NLI:</u> The NLI is C6, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury, with no sensory or motor function preserved in the most caudal sacral segments (S4-5, DAP or VAC).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is C6 bilaterally, as these are the most caudal segments on the respective sides with preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> With no VAC present, the motor ZPP is C7 on the right since it is the most caudal segment with any motor function. The left motor level of C6 is recorded as the left motor ZPP, since there is no motor function below this level. `
            }
        }
    },

    {
        name: 'Learning Case 13',
        workbookName: 'Learning Case 7__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '4', 'C6': '1', 'C7': '2', 'C8': '1', 'T1': '1',
            'L2': '2', 'L3': '3', 'L4': '1', 'L5': '1', 'S1': '2'
        },
        leftMotorScores: {
            'C5': '4', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '1',
            'L2': '4', 'L3': '3', 'L4': '4', 'L5': '4', 'S1': '4'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '0', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '2', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C4',
            sensoryLeft: 'C4',
            motorRight: 'C5',
            motorLeft: 'C5',
            nli: 'C4',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C4 bilaterally, as sensory function is intact from C2 through this dermatome on both sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C5 bilaterally. The key muscle on each side has a grade ≥3, and it can be presumed that motor function is intact at C4 and rostrally, as sensory function is intact in those segments.`,
                nli: `<u>NLI:</u> The NLI is C4, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This is an incomplete injury, with both VAC and DAP present.`,
                ais: `<u>AIS:</u> The injury severity is motor incomplete (at least AIS C) because VAC is present. This injury is classified as AIS C (and not AIS D) because less than half (in this case 8/20) of the key muscles below the NLI (C4) have a motor grade ≥3. `,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because DAP is present.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is N/A bilaterally because VAC is present.`
            }
        }
    },

    {
        name: 'Learning Case 17',
        workbookName: 'Learning Case 8__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '1', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '2', 'L3': '1', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T12',
            sensoryLeft: 'T12',
            motorRight: 'T12',
            motorLeft: 'T12',
            nli: 'T12',
            ais: 'B',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L2',
            zppMotorLeft: 'L3',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is T12 bilaterally, as sensory function is intact from C3 through this dermatome on both sides.`,
                motorLevels: `<u>Motor levels:</u> The right and left motor levels are T12 (following the sensory levels) because testable motor function is intact in the C5- T1 myotomes and is presumed to be intact through T12 based on intact sensory scores in all dermatomes rostral to L1.`,
                nli: `<u>NLI:</u> The NLI is T12, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because DAP sensation is preserved.`,
                ais: `<u>AIS:</u> The AIS grade is B. Because DAP sensation is preserved, the lesion is sensory incomplete. However, VAC is absent, and there is no key muscle function more than 3 segments below the motor level on either side. (Motor function is present exactly 3 levels below the NLI on the right.) In cases with preserved sensory function in the most caudal sacral segments, non-key muscle function should be evaluated, although there are no comments indicating that any non-key muscle function was present. Therefore, we presume that motor function is not preserved at more than 3 levels below the NLI and assign a classification of AIS B.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (DAP sensation is preserved).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPPs are applicable because VAC is absent, and are L2 on the left and L3 on the right. These are the most caudal segments with any motor function.`
            }
        }
    },

    {
        name: 'Learning Case 14',
        workbookName: 'Learning Case 9__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '4',
            'L2': '4', 'L3': '5', 'L4': '4', 'L5': '5', 'S1': '5'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '4', 'T1': '0',
            'L2': '1', 'L3': '1', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '2',
            'T2': '1', 'T3': '1', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '1', 'T9': '2',
            'T10': '2', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '2', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '2', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '0', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '1', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '2',
            'T2': '2', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '2', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '1', 'L3': '1', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '2', 'S3': '1', 'S4_5': '1'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C7',
            sensoryLeft: 'C6',
            motorRight: 'T1',
            motorLeft: 'C8',
            nli: 'C6',
            ais: 'D',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are C7 on the right and C6 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor levels are T1 on the right and C8 on the left. These are the most caudal key muscles on each side with a grade ≥3, and all motor function above these levels is intact.`,
                nli: `<u>NLI:</u> The NLI is C6, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete as there is sacral sparing (DAP, S4-5 PP and LT, and VAC are preserved).`,
                ais: `<u>AIS:</u> The AIS grade is D. Because VAC is present, this is a motor incomplete injury. More than half (10/16) of the key muscles below the NLI (C6) have a motor grade ≥3, so this injury meets criteria for AIS D grade. `,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (DAP sensation is preserved).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is N/A bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).`
            }
        }
    },

    {
        name: 'Learning Case 15',
        workbookName: 'Learning Case 10__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '4', 'C7': '4', 'C8': '2', 'T1': '3',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '4', 'C6': '4', 'C7': '4', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '2',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '1', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C6',
            sensoryLeft: 'C4',
            motorRight: 'C6',
            motorLeft: 'C5',
            nli: 'C4',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T1',
            zppSensoryLeft: 'C7',
            zppMotorRight: 'T1',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are C6 on the right and C4 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The right motor level is C6 because this is the most caudal key muscle with a grade ≥3, and motor function above this level is intact. The left motor level is C5 because this is the most caudal key muscle with a grade ≥3, and motor function above this level is presumed to be intact as sensory function is intact.`,
                nli: `<u>NLI:</u> The NLI is C4, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury, with no sensory or motor function preserved in the most caudal sacral segments (S4-5, DAP or VAC).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPPs are T1 on the right and C7 on the left, as these are the most caudal segments on the respective sides with preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPPs are T1 on the right and C7 on the left, as these are the most caudal myotomes on the respective sides with any motor function.`
            }
        }
    },

    {
        name: 'Learning Case 18',
        workbookName: 'Learning Case 11__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '3', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '2', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '1', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '1', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C3',
            sensoryLeft: 'C4',
            motorRight: 'C3',
            motorLeft: 'C4',
            nli: 'C3',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C4',
            zppSensoryLeft: 'C5',
            zppMotorRight: 'C6',
            zppMotorLeft: 'L5',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are C3 on the right and C4 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor levels are C3 on the right and C4 on the left. The motor levels defer to the sensory level, as it is presumed that motor function is intact through this segment. Although motor function at C5 is ≥3 on the right, sensory function is impaired at C4, and thus motor function is presumed to also be impaired at that level. Therefore, we defer to the next rostral segment with intact sensory function (C3), which we presume to be motor intact.`,
                nli: `<u>NLI:</u> The NLI is C3, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury. Although there is motor function in a non-key muscle at L5, the injury has no VAC and is sensory complete (DAP and S4-5 are not present), which means the injury is also motor complete.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is C4 on the right and C5 on the left, as these are the most caudal segments on the respective sides with preserved sensory function. `,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP on the right is C6, being the most caudal myotome on that side with any motor function. The motor ZPP on the left is L5 because a note in the Comments box indicates that motor function is present in a non-key muscle, the left great toe flexor, which has a root level of L5. `
            }
        }
    },

    {
        name: 'Learning Case 19',
        workbookName: 'Learning Case 12__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '2', 'L3': '1', 'L4': '1', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '2', 'T8': '2', 'T9': '2',
            'T10': '2', 'T11': '2', 'T12': '2', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T12',
            sensoryLeft: 'T12',
            motorRight: 'T12',
            motorLeft: 'T12',
            nli: 'T12',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'T12',
            zppMotorLeft: 'L4',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are T12 bilaterally because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The right and left motor levels are T12 (following the sensory levels) because testable motor function is intact in the C5-T1 myotomes and is presumed to be intact through T12 based on intact sensory scores in all dermatomes rostral to L1. `,
                nli: `<u>NLI:</u> The NLI is T12, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because DAP sensation is preserved.`,
                ais: `<u>AIS:</u> The AIS grade is C because this is a sensory incomplete injury, as well as a motor incomplete injury, since there is also sparing of motor function more than 3 levels below the motor level on the left side. This injury is classified as AIS C (and not AIS D) because less than half (in this case 0/10) of the key muscles below the NLI (T12) have a motor grade ≥3.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing (DAP sensation is preserved).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is T12 on the right and L4 on the left, as these are the most caudal myotomes on the respective sides with any motor function. If there are no segments with partially preserved function below the motor level, as in this case on the right, the motor level is entered in the box for ZPP. `
            }
        }
    },

    {
        name: 'Learning Case 20',
        workbookName: 'Learning Case 13__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '2', 'L3': '2', 'L4': '2', 'L5': '1', 'S1': '1'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'T1',
            sensoryLeft: 'T2',
            motorRight: 'T1',
            motorLeft: 'T2',
            nli: 'T1',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'S1',
            zppMotorLeft: 'T2',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are T1 on the right and T2 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is T1 on the right and T2 on the left. The right motor level cannot be caudal to T1, as sensory function below this level is impaired. Left motor function is intact to T1, and as there are no key muscles to test below this, the motor level defers to the sensory level. As T2 is the most caudal intact sensory level, we presume motor function is also intact to that level.`,
                nli: `<u>NLI:</u> The NLI is T1, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because DAP sensation is preserved, and there is sparing of sensory function in the most caudal sacral segments (S4-5).`,
                ais: `<u>AIS:</u> The AIS grade is C because this is a sensory incomplete injury, and there is sparing of motor function more than 3 levels below the motor level on the right side. It is not AIS grade D because less than half (0/10) of key muscle functions below the NLI (T1) have a muscle grade ≥3.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (DAP sensation is preserved).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is S1 on the right, as this is the most caudal myotome on the right with any motor function. The motor ZPP is T2 on the left. As there are no segments with partially preserved function below the motor level, the motor level is entered in the box for ZPP.`
            }
        }
    },

    {
        name: 'Learning Case 21',
        workbookName: 'Learning Case 14__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '4', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '0', 'L5': '0',
            'S1': '1', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '2', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '0', 'S2': '1', 'S3': '0', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '+ hip adduction on the right (L2 myotome)',
        expected: {
            sensoryRight: 'C7',
            sensoryLeft: 'C7',
            motorRight: 'C7',
            motorLeft: 'C7',
            nli: 'C7',
            ais: 'C',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'L2',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C7 bilaterally, as sensory function is intact from C2 through these dermatomes.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C7 bilaterally because these are the most caudal key muscles with a grade ≥3, and motor function above this level is intact. `,
                nli: `<u>NLI:</u> The NLI is C7, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because DAP and light touch in the sacral segments (S4-5) are preserved.`,
                ais: `<u>AIS:</u> This is a sensory incomplete injury, and testing a non-key muscle (hip adduction on the right L2 myotome) shows that there is some sparing of motor function more than 3 levels below the motor level on the right (C7) (noted in the Comments box). As less than half (0/14) of key muscle functions below the NLI (C7) have a muscle grade ≥3, it is therefore graded AIS C.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> .The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (DAP and light touch in S4-5).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is L2 on the right because a note in the Comments box indicates that there is motor function present in a non-key muscle at L2, which is the most caudal myotome with any muscle function. The motor ZPP is C7 on the left, as this is the most caudal myotome on the left side with any motor function.`
            }
        }
    },

    {
        name: 'Learning Case 16',
        workbookName: 'Learning Case 15__Praxis',
        difficulty: 'easy',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '4', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '0', 'L5': '0',
            'S1': '1', 'S2': '0', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '0', 'T4': '0', 'T5': '2', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '0', 'S2': '1', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: '',
        expected: {
            sensoryRight: 'C7',
            sensoryLeft: 'C7',
            motorRight: 'C7',
            motorLeft: 'C7',
            nli: 'C7',
            ais: 'B',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'S2',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u>  The sensory levels are C7 bilaterally as sensory function is intact from C2 through these dermatomes on both sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C7 bilaterally as this is the most caudal key muscle with a motor grade ≥3, and all motor function above this level is presumed to be intact. `,
                nli: `<u>NLI:</u> The NLI is C7, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because there is sparing of sensory function in the most caudal sacral segments (preserved light touch on right S4-5).`,
                ais: `<u>AIS:</u> The AIS grade is B because this is a sensory incomplete injury. The injury is not motor incomplete because there is no VAC, nor is there any motor function more than 3 levels below the motor level on either the right or left side in either a key or non-key muscle.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A on the right because there is sensory sacral sparing. It is S2 on the left, as this is the most caudal segment with any preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is C7 bilaterally. No motor function is preserved below this segment.`
            }
        }
    },

    {
        name: 'Learning Case 5',
        workbookName: 'Learning Case 16__Praxis',
        difficulty: 'hard',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '1', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '2*', 'C8': '1*', 'T1': '1*',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1*', 'C8': '1*', 'T1': '1*',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '1*', 'C8': '1*', 'T1': '1*',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Sensory and motor weakness in left C7-T1 due to brachial plexus injury; consider not normal for classification',
        expected: {
            sensoryRight: 'C5',
            sensoryLeft: 'C6',
            motorRight: 'C6',
            motorLeft: 'ND',
            nli: 'C5',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C6',
            zppSensoryLeft: 'T1',
            zppMotorRight: 'C7',
            zppMotorLeft: 'T1',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are C5 on the right and C6 on the left because sensory function is intact from C2 through these dermatomes on the respective sides. Given the NLI is above the levels affected by the brachial plexus injury on the left, the clinician has noted that these sensory scores, although also impacted by the brachial plexus injury, cannot be considered normal from the perspective of the SCI. That means that these levels must be considered impaired for classification and C6 is the last normal level on the left.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C6 on the right as this is the most caudal key muscle with a motor grade >3, and all motor function above this level are presumed to be intact. Given the NLI is above the levels affected by the brachial plexus injury on the left (C7-T1), the clinician has noted that these motor scores, although also impacted by the brachial plexus injury, cannot be considered normal from the perspective of the SCI. This means that there is at least some weakness present from the SCI and the tested scores, along with all other non-normal scores above that need to be considered when determining the motor level. In this case, if C7 is considered a grade 2/5 as tested (i.e. all of the weakness is due to the SCI), the motor level would be C6, but if C7 is considered a grade 3 or 4/5 (i.e. only some of the weakness is due to the SCI), the motor level would be C7. As such, the motor level should be documented as not determinable (ND).`,
                nli: `<u>NLI:</u> The NLI is C5, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury, with no sensory or motor function preserved in the most caudal sacral segments (S4-5, DAP or VAC).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is C6 on the right and T1 on the left, as these are the most caudal dermatomes with any preserved sensory function. The sensory ZPP on the left does not need to be tagged with a * since it would not change if determined as tested or with the clinical assumption to be considered not normal for classification from the perspective of the SCI.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is C7 on the left and T1 on the right because these are the most caudal myotomes with preserved motor function. The motor ZPP on the left does not need to be tagged with a * since it would not change if determined as tested vs. with the clinical assumption to consider it not normal from the perspective of the SCI (i.e. the sensory ZPP would be the same even if it was graded as a 1,2,3 or 4/5).`
            }
        }
    },

    {
        name: 'Learning Case 6',
        workbookName: 'Learning Case 17__Praxis',
        difficulty: 'hard',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': 'NT*', 'C7': '5', 'C8': 'NT*', 'T1': 'NT*',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': 'NT*', 'C7': 'NT*', 'C8': 'NT*', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Right forearm amputation; consider *tagged scores normal for classification',
        expected: {
            sensoryRight: 'T6*',
            sensoryLeft: 'T6',
            motorRight: 'T6*',
            motorLeft: 'T6',
            nli: 'T6*',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'T7',
            zppSensoryLeft: 'T7',
            zppMotorRight: 'T6*',
            zppMotorLeft: 'T6',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are T6 bilaterally because sensory function is intact from C2 through these dermatomes on the respective sides. Note that there is an “NT*” beside C6-C8, , and we see in the comments box that these dermatomes are Not Testable due to forearm amputation and should be considered normal for classification. As such, sensation at these levels is considered intact (grade 2/2) when determining the sensory level on this side.`,
                motorLevels: `<u>Motor levels:</u> The motor levels are T6 bilaterally; both motor levels defer to the sensory levels of T6, as it is presumed that motor function is intact through this segment. The right and left motor levels are T6 (following the sensory levels) because testable motor function is intact in the C5-T1 myotomes and is presumed to be intact through T6 based on intact sensory scores in all dermatomes rostral to T7. C6, C8, and T1 are marked “NT*” on the right. We see in the comments box that these myotomes are Not Testable due to forearm amputation and should be considered normal for classification. As such, motor scores at these levels are considered intact (grade 5/5) when determining the motor level on this side.`,
                nli: `<u>NLI:</u> The NLI is T6, as this is the most rostral of the sensory and motor levels. If the motor and sensory scores marked with an “*” were not considered normal for classification (and instead actual examined scores of NT were used), the right motor and sensory scores would be Not determinable (ND) as it would not be possible to calculate a single sensory or motor neurological level on the right. Therefore, we place an “*” beside T6, so the NLI is T6*.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because this is a complete injury, with no sensory or motor function preserved in the most caudal sacral segments (S4-5, DAP or VAC).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is T7 bilaterally, as these are the most caudal dermatomes with any preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is T6* on the right, because if the tagged scores were not considered normal for classification and the value of not testable (NT) was used, the right ZPP would be Not determinable (ND). Because these would result in different values for the motor ZPP on the right, an “*” is placed after the T6 to indicate that the score would be different if the clinical assumption to consider these scores are normal was not made. The left motor ZPP is T6. Because there are no segments with partially preserved function below the motor level, the motor level is entered in the box for ZPP.`
            }
        }
    },

    {
        name: 'Learning Case 7',
        workbookName: 'Learning Case 18__Praxis',
        difficulty: 'hard',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '2', 'C7': '1', 'C8': '1', 'T1': '1',
            'L2': '2', 'L3': '4', 'L4': '3*', 'L5': '2*', 'S1': '3'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '3', 'C7': '3', 'C8': '2', 'T1': '1',
            'L2': '2', 'L3': '3', 'L4': '3', 'L5': '2', 'S1': '3'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1*', 'L5': '1*',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '1', 'C7': '1', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1*', 'L5': '1*',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Right peroneal nerve injury complication from previous knee surgery; consider right L4-5 not normal for classification.',
        expected: {
            sensoryRight: 'C5',
            sensoryLeft: 'C7',
            motorRight: 'C5',
            motorLeft: 'C6',
            nli: 'C5',
            ais: 'ND',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are C5 on the right and C7 on the left because sensory function is intact from C2 through these dermatomes on the respective sides.`,
                motorLevels: `<u>Motor levels:</u> The motor level is C5 on the right and C6 on the left because these are the most caudal key muscles with a grade ≥3, and all motor function above this level is presumed to be intact.`,
                nli: `<u>NLI:</u> The NLI is C5, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete as there is sacral sparing (S4/5, DAP, and VAC). `,
                ais: `<u>AIS:</u> The AIS grade is not determinable (ND) because it could be either C or D, so it is classified as “ND(C or D)”. An “*” has been placed next to the right L4-L5 dermatomes and myotomes, and a note in the Comments box explains that these are not considered normal for classification due to a “peroneal nerve injury complication from previous knee surgery.” This means that all possible non-normal values at and above the tested myotome score should be substituted to determine the possible AIS grades. If the myotome at L5 were to be ≥3 without the nerve injury, half of the key muscle functions below NLI (C5) would have a muscle grade ≥3 (9/18) which is enough to make it AIS D. If it had remained “2”, then less than half of the key muscle function would have a grade ≥3 (8/18), making it AIS C. Without knowing how much the right L5 muscle function is impaired by the SCI separate from the unrelated peripheral nerve injury, we are unable to determine the AIS grade.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (S4/5 and DAP).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is N/A bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).`
            }
        }
    },

    {
        name: 'Learning Case 8',
        workbookName: 'Learning Case 19__Praxis',
        difficulty: 'hard',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '4*', 'C6': '5', 'C7': '4*', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '3', 'L4': '2', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '5', 'T1': '5',
            'L2': '3', 'L3': '1', 'L4': '2', 'L5': '0', 'S1': '1'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '1', 'T9': '0',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '0', 'L2': '1', 'L3': '0', 'L4': '0', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '1',
            'T10': '0', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '0',
            'T10': '1', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '1', 'L3': '0', 'L4': '1', 'L5': '1',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '2', 'T1': '2',
            'T2': '2', 'T3': '2', 'T4': '2', 'T5': '2', 'T6': '2', 'T7': '1', 'T8': '0', 'T9': '1',
            'T10': '1', 'T11': '0', 'T12': '1', 'L1': '0', 'L2': '1', 'L3': '1', 'L4': '0', 'L5': '1',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Right upper extremity weakness due to 6 weeks immobilization and shoulder pain; consider right C5 & C7 normal for classification.',
        expected: {
            sensoryRight: 'T6',
            sensoryLeft: 'T6',
            motorRight: 'T6*',
            motorLeft: 'T6',
            nli: 'T6*',
            ais: 'C*',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory levels are T6 bilaterally, as sensory function is intact from C2 through these dermatomes on both sides.`,
                motorLevels: `<u>Motor levels:</u> The right and left motor levels are T6* and T6 respectively (following the sensory levels) because testable motor function is intact in the C5-T1 myotomes and is presumed to be intact through T6 based on intact sensory scores in all dermatomes rostral to T7. C5 and C7 are marked with an “*” on the right due to right upper extremity weakness and pain, and are considered normal for classification as noted in the Comments box, which means that a score of 5/5 should be substituted when determining the motor level. Since the tested scores (4/5) and clinically assumed scores (5/5) result in different motor levels on the right, the motor level of T6 needs to be tagged with an “*”. Without the clinical assumption, the motor level on the right would be C5.`,
                nli: `<u>NLI:</u> The NLI is T6*, as T6 is the most rostral of the sensory and motor levels. Because the NLI would be different if classified based on the tested score (right motor level would be C5 without the clinical assumption to consider the C5 & C7 myotome scores as normal for classification, so the NLI would also be C5), an “*” is used (T6*).`,
                completeness: `<u>Completeness:</u> This injury is incomplete because there is sparing of sensory function in the most caudal sacral segments (S4/5 light touch, DAP and VAC).`,
                ais: `<u>AIS:</u> The AIS grade is C* because this is a sensory incomplete injury, The AIS grade is C* because this is a sensory incomplete (S4/5 light touch and DAP are present) as well as motor incomplete (VAC is present) injury and fewer than half of the key muscles below the NLI have a grade ≥3 (3/10) when the right upper extremity motor levels are considered normal for classification. It must be tagged with an “*” because if the AIS were determined based on the examined scores instead of the clinically assumed scores, the NLI would be C5, and more than half of the key muscles below the NLI would have a grade ≥3 (11/18), so the AIS grade would be D. Therefore, the AIS grade receives an “*” (C*).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (light touch and DAP sensation are preserved).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is N/A bilaterally because there is preserved motor function in the most caudal sacral segments (VAC is present).`
            }
        }
    },

    {
        name: 'Learning Case 9',
        workbookName: 'Learning Case 21__Praxis',
        difficulty: 'hard',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '1', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '0', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '1*', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '0*', 'C4': '0*', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: `Suspected cervical nerve root/ plexopathy impairing sensation at C3-4. Now with non-SCI condition taxonomy, can include, "consider normal for classification"`,
        expected: {
            sensoryRight: 'C6*',
            sensoryLeft: 'C6',
            motorRight: 'C6*',
            motorLeft: 'C6',
            nli: 'C6*',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C7',
            zppSensoryLeft: 'C7',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C6',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The right sensory level is C6*, with sensory function intact from C2 through C6 dermatomes on the right side. A note in the Comments box indicates that the right C3-C4 sensory impairment is due to a suspected peripheral nerve injury (plexopathy); therefore, an “*” is used and the comments box specifies that the non-SCI condition is considered normal for classification. If it were not presumed to be normal for classification, the right sensory level would be C2. As the tested and clinically assumed scores would result in different sensory levels on the right, the C6 must be tagged with an “*”. The left sensory level is C6, as sensory function is intact from C2 through these dermatomes on the left side.`,
                motorLevels: `<u>Motor levels:</u> The right motor level is C6*. If the plexopathy were not present and the myotomes at C3-4 were normal, as clinically assumed, the right motor level would be C6. However, if the motor level was determined with the C3-4 dermatomes scored as tested, the right motor level would defer to the sensory level and be C2. Because the clinical assumption changes the right motor level, it needs to be tagged with an “*” (C6*). The left motor level is C6 because this is the most caudal key muscle with a grade ≥3, and motor and sensory function above this level is intact.`,
                nli: `<u>NLI:</u> The NLI is C6*, as C6 is the most rostral of the sensory and motor levels. Because the NLI would be different if classified based on the tested scores (right motor and sensory levels would be C2 without the clinical assumption to consider the C3 & C4 dermatome scores as normal for classification, so the NLI would also be C2), an “*” is used (C6*).`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because it is a motor and sensory complete injury, with no sensory or motor function preserved in the most caudal sacral segments (S4-5, DAP or VAC).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is C7 bilaterally, as these are the most caudal dermatomes with any preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is C7 on the right and C6 on the left, as these are the most caudal segments with any motor function.`
            }
        }
    },

    {
        name: 'Learning Case 22',
        workbookName: 'Learning Case 23__Praxis',
        difficulty: 'medium',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '5', 'C8': '3', 'T1': '3',
            'L2': '3', 'L3': '3', 'L4': '3', 'L5': '1', 'S1': '1'
        },
        leftMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3', 'C8': 'NT', 'T1': 'NT',
            'L2': '1', 'L3': '1', 'L4': '3', 'L5': '2', 'S1': '2'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '0', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '2', 'C8': '1', 'T1': '1',
            'T2': '1', 'T3': '1', 'T4': '1', 'T5': '1', 'T6': '1', 'T7': '1', 'T8': '1', 'T9': '1',
            'T10': '1', 'T11': '1', 'T12': '1', 'L1': '1', 'L2': '1', 'L3': '1', 'L4': '1', 'L5': '1',
            'S1': '1', 'S2': '1', 'S3': '1', 'S4_5': '1'
        },
        vac: true,
        dap: true,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Reasons for NT not included in case',
        expected: {
            sensoryRight: 'C7',
            sensoryLeft: 'C7',
            motorRight: 'C8',
            motorLeft: 'C7',
            nli: 'C7',
            ais: 'ND',
            completeness: 'Incomplete',
            zppSensoryRight: 'NA',
            zppSensoryLeft: 'NA',
            zppMotorRight: 'NA',
            zppMotorLeft: 'NA',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C7 bilaterally because this is the most caudal level where sensory function is intact from C2 through these dermatomes on both sides.`,
                motorLevels: `<u>Motor levels:</u> The motor levels are C8 on the right and C7 on the left, as these are the most caudal key muscles with a motor grade ≥3, and all motor function rostral to this level is intact on their respective sides.`,
                nli: `<u>NLI:</u> The NLI is C7, as this is the most rostral of the sensory and motor levels.`,
                completeness: `<u>Completeness:</u> This injury is incomplete because there is sparing of function in the most caudal sacral segments (S4/5, VAC and DAP).`,
                ais: `<u>AIS:</u> The AIS grade is not determinable (ND) due to the Not Testable (NT) scores in C8 and T1 in the absence of an explanation in the comments box to indicate whether they should be considered normal or abnormal for classification. If the muscles at C8 and/or T1 are presumed to have a motor level ≥3, then more than half of the key muscle functions below NLI (C7) would have a muscle grade ≥3 (7 or 8/14) and the AIS grade would be D. If neither of left C8 or T1 muscle levels are presumed to be ≥3, then the AIS grade would be C. Therefore, we mark the AIS grade as ‘ND (C or D)’.`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is N/A bilaterally because there is sensory sacral sparing on both sides (S4/5 and DAP).`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is N/A bilaterally because there is preserved motor function in the most caudal sacral segments (VAC).`
            }
        }
    },

    {
        name: 'Learning Case 10',
        workbookName: 'Learning Case 24__Praxis',
        difficulty: 'hard',
        acknowledgment: '',
        rightMotorScores: {
            'C5': '5', 'C6': '5', 'C7': '3', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        leftMotorScores: {
            'C5': '5', 'C6': 'NT', 'C7': '2', 'C8': '0', 'T1': '0',
            'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
        },
        rightLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftLightTouchScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        rightPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        leftPinPrickScores: {
            'C2': '2', 'C3': '2', 'C4': '2', 'C5': '2', 'C6': '2', 'C7': '0', 'C8': '0', 'T1': '0',
            'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
            'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
            'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
        },
        vac: false,
        dap: false,
        lowestNonKeyMuscle: { right: null, left: null },
        comments: 'Left C6 NT due to severe pain.',
        expected: {
            sensoryRight: 'C6',
            sensoryLeft: 'C6',
            motorRight: 'C7',
            motorLeft: 'ND',
            nli: 'ND',
            ais: 'A',
            completeness: 'Complete',
            zppSensoryRight: 'C6',
            zppSensoryLeft: 'C6',
            zppMotorRight: 'C7',
            zppMotorLeft: 'C7',
            answerKey: {
                sensoryLevels: `<u>Sensory levels:</u> The sensory level is C6 bilaterally because this is the most caudal level where sensory function is intact from C2 through these dermatomes on both sides.`,
                motorLevels: `<u>Motor levels:</u> The right motor level C7, as this is the most caudal key muscle with a motor grade ≥3, and all motor function rostral to this level is presumed intact. Because the left C6 key muscle is not testable (NT) due to severe pain (as noted in the Comments box), and there was no explanation in the comments box to indicate whether they should be considered normal or abnormal for classification, it is unknown whether it would have a grade ≥3; therefore, the left motor level could be either C5 or C6. This is recorded as ‘ND (C5 or C6)’.`,
                nli: `<u>NLI:</u> The NLI is not determinable without knowing the left motor level. It could be either C5 or C6; therefore, ‘ND (C5 or C6)’ is recorded.`,
                completeness: `<u>Completeness:</u> There is no sensory or motor sparing in the lowest sacral segments because DAP sensation, bilateral S4-5 LT/PP sensation, and VAC are absent. This is therefore a complete injury, as indicated by the “N0000N” sign.`,
                ais: `<u>AIS:</u> The AIS grade is A because it is a motor and sensory complete injury, with no sensory or motor function preserved in the most caudal sacral segments (S4-5, DAP or VAC).`,
                sensoryZpp: `<u>Sensory ZPPs:</u> The sensory ZPP is C6 bilaterally because these are the most caudal dermatomes with any preserved sensory function.`,
                motorZpp: `<u>Motor ZPPs:</u> The motor ZPP is C7 bilaterally, as these are the most caudal segments with any motor function.`
            }
        }
    },

    // {
    //     name: 'Learning Case __',
    //     workbookName: 'Learning Case __Praxis',
    //     difficulty: 'easy',
    //     acknowledgment: '',
    //     rightMotorScores: {
    //         'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
    //     },
    //     leftMotorScores: {
    //         'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
    //     },
    //     rightLightTouchScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     leftLightTouchScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     rightPinPrickScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     leftPinPrickScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     vac: true,
    //     dap: false,
    //     lowestNonKeyMuscle: { right: null, left: null },
    //     comments: '',
    //     expected: {
    //         sensoryRight: '-',
    //         sensoryLeft: '-',
    //         motorRight: '-',
    //         motorLeft: '-',
    //         nli: '-',
    //         ais: '-',
    //         completeness: 'Incomplete',
    //         zppSensoryRight: '-',
    //         zppSensoryLeft: '-',
    //         zppMotorRight: '-',
    //         zppMotorLeft: '-',
    //         answerKey: {
    //             sensoryLevels: `<u>Sensory levels:</u> .`,
    //             motorLevels: `<u>Motor levels:</u> .`,
    //             nli: `<u>NLI:</u> .`,
    //             completeness: `<u>Completeness:</u> .`,
    //             ais: `<u>AIS:</u> .`,
    //             sensoryZpp: `<u>Sensory ZPPs:</u> .`,
    //             motorZpp: `<u>Motor ZPPs:</u> .`
    //         }
    //     }
    // },

    // {
    //     name: 'Learning Case __',
    //     workbookName: 'Learning Case __Praxis',
    //     difficulty: 'easy',
    //     acknowledgment: '',
    //     rightMotorScores: {
    //         'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
    //     },
    //     leftMotorScores: {
    //         'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
    //     },
    //     rightLightTouchScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     leftLightTouchScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     rightPinPrickScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     leftPinPrickScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     vac: true,
    //     dap: false,
    //     lowestNonKeyMuscle: { right: null, left: null },
    //     comments: '',
    //     expected: {
    //         sensoryRight: '-',
    //         sensoryLeft: '-',
    //         motorRight: '-',
    //         motorLeft: '-',
    //         nli: '-',
    //         ais: '-',
    //         completeness: 'Incomplete',
    //         zppSensoryRight: '-',
    //         zppSensoryLeft: '-',
    //         zppMotorRight: '-',
    //         zppMotorLeft: '-',
    //         answerKey: {
    //             sensoryLevels: `<u>Sensory levels:</u> .`,
    //             motorLevels: `<u>Motor levels:</u> .`,
    //             nli: `<u>NLI:</u> .`,
    //             completeness: `<u>Completeness:</u> .`,
    //             ais: `<u>AIS:</u> .`,
    //             sensoryZpp: `<u>Sensory ZPPs:</u> .`,
    //             motorZpp: `<u>Motor ZPPs:</u> .`
    //         }
    //     }
    // },

    // {
    //     name: 'Learning Case __',
    //     workbookName: 'Learning Case __Praxis',
    //     difficulty: 'easy',
    //     acknowledgment: '',
    //     rightMotorScores: {
    //         'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
    //     },
    //     leftMotorScores: {
    //         'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0', 'S1': '0'
    //     },
    //     rightLightTouchScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     leftLightTouchScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     rightPinPrickScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     leftPinPrickScores: {
    //         'C2': '0', 'C3': '0', 'C4': '0', 'C5': '0', 'C6': '0', 'C7': '0', 'C8': '0', 'T1': '0',
    //         'T2': '0', 'T3': '0', 'T4': '0', 'T5': '0', 'T6': '0', 'T7': '0', 'T8': '0', 'T9': '0',
    //         'T10': '0', 'T11': '0', 'T12': '0', 'L1': '0', 'L2': '0', 'L3': '0', 'L4': '0', 'L5': '0',
    //         'S1': '0', 'S2': '0', 'S3': '0', 'S4_5': '0'
    //     },
    //     vac: true,
    //     dap: false,
    //     lowestNonKeyMuscle: { right: null, left: null },
    //     comments: '',
    //     expected: {
    //         sensoryRight: '-',
    //         sensoryLeft: '-',
    //         motorRight: '-',
    //         motorLeft: '-',
    //         nli: '-',
    //         ais: '-',
    //         completeness: 'Incomplete',
    //         zppSensoryRight: '-',
    //         zppSensoryLeft: '-',
    //         zppMotorRight: '-',
    //         zppMotorLeft: '-',
    //         answerKey: {
    //             sensoryLevels: `<u>Sensory levels:</u> .`,
    //             motorLevels: `<u>Motor levels:</u> .`,
    //             nli: `<u>NLI:</u> .`,
    //             completeness: `<u>Completeness:</u> .`,
    //             ais: `<u>AIS:</u> .`,
    //             sensoryZpp: `<u>Sensory ZPPs:</u> .`,
    //             motorZpp: `<u>Motor ZPPs:</u> .`
    //         }
    //     }
    // },
];




// ≥