import { APP_PREFIX } from '@/config';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { IAppState } from 'isncsci-ui/dist/esm/core/boundaries';
import { convertExamDataToGridModel } from '@/utils/examDataHelpers';

export interface Worksheet {
    id: string;
    name: string;
    savedAt: string;
    examDate: string;
}

export const loadWorksheets = (): Worksheet[] => {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}meta`) || '[]');
};

export const saveWorksheet = (worksheet: Worksheet, examData: ExamData | null, state: IAppState) => {
    const savedMeta = loadWorksheets();
    const existingIndex = savedMeta.findIndex(item => item.id === worksheet.id);

    if (existingIndex !== -1) {
        savedMeta[existingIndex] = { ...worksheet, savedAt: new Date().toLocaleString() };
    } else {
        savedMeta.push({ ...worksheet, savedAt: new Date().toLocaleString() });
    }

    localStorage.setItem(`${APP_PREFIX}meta`, JSON.stringify(savedMeta));

    const savedItemData = examData || {
        gridModel: state.gridModel,
        vac: state.vac,
        dap: state.dap,
        rightLowestNonKeyMuscleWithMotorFunction: state.rightLowestNonKeyMuscleWithMotorFunction,
        leftLowestNonKeyMuscleWithMotorFunction: state.leftLowestNonKeyMuscleWithMotorFunction,
        comments: state.comments,
    };

    localStorage.setItem(`${APP_PREFIX}${worksheet.id}`, JSON.stringify(savedItemData));
};

export const loadWorksheetData = (id: string): { worksheet: Worksheet | null, examData: any } => {
    const savedMeta = loadWorksheets();
    const worksheet = savedMeta.find(item => item.id === id) || null;
    const examData = JSON.parse(localStorage.getItem(`${APP_PREFIX}${id}`) || 'null');
    return { worksheet, examData };
};

export const removeWorksheet = (id: string) => {
    const savedMeta = loadWorksheets().filter(item => item.id !== id);
    localStorage.setItem(`${APP_PREFIX}meta`, JSON.stringify(savedMeta));
    localStorage.removeItem(`${APP_PREFIX}${id}`);
};

export const dispatchWorksheetData = (appStore: any, examData: any) => {
    if (examData.asiaImpairmentScale !== undefined) {
        appStore.dispatch({
        type: 'SET_TOTALS',
        payload: {
            asiaImpairmentScale: examData.asiaImpairmentScale,
            injuryComplete: examData.injuryComplete,
            neurologicalLevelOfInjury: examData.neurologicalLevelOfInjury,
        }
        });
    }

    appStore.dispatch({
        type: 'SET_VAC_DAP',
        payload: { 
        vac: examData.voluntaryAnalContraction, 
        dap: examData.deepAnalPressure 
        }
    });

    appStore.dispatch({
        type: 'SET_EXTRA_INPUTS',
        payload: {
        rightLowestNonKeyMuscleWithMotorFunction: examData.rightLowestNonKeyMuscleWithMotorFunction,
        leftLowestNonKeyMuscleWithMotorFunction: examData.leftLowestNonKeyMuscleWithMotorFunction,
        comments: examData.comments,
        }
    });

    if (examData.gridModel) {
        appStore.dispatch({
        type: 'SET_GRID_MODEL',
        payload: examData.gridModel,
        });
    } else if (examData.asiaImpairmentScale !== undefined) {
        const gridModel = convertExamDataToGridModel(examData);
        appStore.dispatch({
        type: 'SET_GRID_MODEL',
        payload: gridModel
        });
    }
};