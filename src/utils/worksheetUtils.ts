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
    private static instance: Worksheets;
    private meta: IWorksheetMetaItem[];
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

    public updateWorksheetName(id: string, newName: string): void {
        const worksheetMeta = this.meta.find(m => m.id === id);
        if (worksheetMeta) {
            worksheetMeta.name = newName;
            worksheetMeta.lastUpdateDate = new Date();
            this.updateMetaLocalStorage();
        } else {
            throw new Error('Worksheet not found');
        }
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

    public newWorksheet(name: string, examData: ExamData, examDate: Date): IWorksheetMetaItem {
        if (this.isNameExist(name)) {
            throw "Worksheet name exists";
        }
        const id = new Date().getTime().toString();
        const now = new Date();
        const metaItem = {
            id, name, examDate, lastUpdateDate: now
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

    public getAllMeta(): IWorksheetMetaItem[] {
        return this.meta;
    }

    public removeWorksheet(id: string): void {
        // Filter out the worksheet with the selected id
        this.meta = this.meta.filter(m => m.id !== id);

        // Update the meta data in local storage
        this.updateMetaLocalStorage();

        // Remove the specific worksheet data from local storage
        localStorage.removeItem(`${APP_PREFIX}${id}`);
    }

    public getWorksheet(id: string): IWorksheet {
        return JSON.parse(localStorage.getItem(`${APP_PREFIX}${id}`) || '{}') as IWorksheet
    }

    public getMeta(id: string): IWorksheetMetaItem | undefined {
        return this.meta.find(m => m.id.trim().toLowerCase() == id.trim().toLowerCase());
    }

    public static getInstance(): Worksheets {
        if (!Worksheets.instance) {
            Worksheets.instance = new Worksheets();
        }
        return Worksheets.instance;
    }
    
}