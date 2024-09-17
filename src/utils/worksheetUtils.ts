import { alertController } from '@ionic/vue';
import { APP_PREFIX } from '@/config';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';

export interface IWorksheetMetaItem {
    id: string,
    examDate: Date,
    name: string,
    lastUpdateDate: Date
}
export interface IWorksheet {
    id: string,
    examData: ExamData,
}

export class Worksheets {
    private static instnace: Worksheets
    private meta: [IWorksheetMetaItem];
    private metaKey = `${APP_PREFIX}meta`;

    private updateMetaLocalStorage() {
        localStorage.setItem(this.metaKey, JSON.stringify(this.meta));
    }

    private updateWorksheetLocalStorage(worksheet: IWorksheet) {
        localStorage.setItem(`${APP_PREFIX}${worksheet.id}`, JSON.stringify(worksheet));
    }

    private constructor() {
        this.meta = JSON.parse(localStorage.getItem(this.metaKey) || '[]');
        this.meta.forEach((m) => {
            m.examDate = new Date(m.examDate);
            m.lastUpdateDate = new Date(m.lastUpdateDate);
        });
    }

    public isNameExist(name: string): boolean {
        return this.meta.some(m => m.name.trim().toLowerCase() == name.trim().toLowerCase());
    }

    public nextWorksheetName(): string {
        const suffex = 'Worksheet ';
        let index = 1;
        let name = `${suffex}${index}`;
        while (this.isNameExist(name)) {
            name = `${suffex}${++index}`;
        }
        return name;
    }

    public newWorksheet(name: string, examData: ExamData): IWorksheetMetaItem {
        if (this.isNameExist(name)) {
            throw "Worksheet name exists";
        }
        const id = new Date().getTime().toString();
        const now = new Date();
        const metaItem = {
            id, name, examDate: now, lastUpdateDate: now
        };
        this.meta.push(metaItem);
        this.updateMetaLocalStorage();
        this.updateWorksheetLocalStorage({
            id,
            examData
        });
        return metaItem;
    }

    public saveWorksheet(worksheet: IWorksheet) {
        const worksheetMeta = this.meta.find(m => m.id == worksheet.id);
        if (!worksheetMeta) {
            throw "Worksheet not found";
        }
        worksheetMeta.lastUpdateDate = new Date();
        this.updateMetaLocalStorage();
        this.updateWorksheetLocalStorage(worksheet);
    }

    public getWorksheet(id: string): IWorksheet {
        return JSON.parse(localStorage.getItem(`${APP_PREFIX}${id}`) || '{}') as IWorksheet
    }

    public getMeta(id: string): IWorksheetMetaItem | undefined {
        return this.meta.find(m => m.id.trim().toLowerCase() == id.trim().toLowerCase());
    }

    public static getInstance(): Worksheets {
        if (!Worksheets.instnace) {
            Worksheets.instnace = new Worksheets();
        }
        return Worksheets.instnace;
    }
}