import { Preferences } from '@capacitor/preferences';
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

export interface WorksheetDetails {
    name: string;
    examDate: Date;
}

export class Worksheets {
    private static instance: Worksheets;
    private meta: IWorksheetMetaItem[] = [];
    private metaKey = `${APP_PREFIX}meta`;
    private isMetaLoaded = false;

    private async updateMetaLocalStorage() {
        await Preferences.set({ key: this.metaKey, value: JSON.stringify(this.meta) });
        //localStorage.setItem(this.metaKey, JSON.stringify(this.meta));
    }

    private async updateWorksheetLocalStorage(worksheet: IWorksheet) {
        Preferences.set({ key: `${APP_PREFIX}${worksheet.id}`, value: JSON.stringify(worksheet) });
        //localStorage.setItem(`${APP_PREFIX}${worksheet.id}`, JSON.stringify(worksheet));
    }

    public async loadMeta() {
        if (!this.isMetaLoaded) {
            const result = await Preferences.get({ key: this.metaKey });
            if (result && result.value) {
                this.meta = JSON.parse(result.value);
                this.meta.forEach((m) => {
                    m.examDate = new Date(m.examDate);
                    m.lastUpdateDate = new Date(m.lastUpdateDate);
                });
            }
        }
        this.isMetaLoaded = true;
    }

    public async updateWorksheetDetails(id: string, newName: string, newExamDate: Date): Promise<void> {
        const worksheetMeta = this.meta.find(m => m.id === id);
        if (worksheetMeta) {
            worksheetMeta.name = newName;
            worksheetMeta.examDate = newExamDate;
            worksheetMeta.lastUpdateDate = new Date();
            await this.updateMetaLocalStorage();
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

    public async newWorksheet(name: string, examData: ExamData, examDate: Date): Promise<IWorksheetMetaItem> {
        if (this.isNameExist(name)) {
            throw "Worksheet name exists";
        }
        const id = new Date().getTime().toString();
        const now = new Date();
        const metaItem = {
            id, name, examDate, lastUpdateDate: now
        };
        this.meta.push(metaItem);
        await this.updateMetaLocalStorage();
        await this.updateWorksheetLocalStorage({
            id,
            examData
        });
        return metaItem;
    }

    public async saveWorksheet(worksheet: IWorksheet) {
        const worksheetMeta = this.meta.find(m => m.id == worksheet.id);
        if (!worksheetMeta) {
            throw "Worksheet not found";
        }
        worksheetMeta.lastUpdateDate = new Date();
        await this.updateMetaLocalStorage();
        await this.updateWorksheetLocalStorage(worksheet);
    }

    public getAllMeta(): IWorksheetMetaItem[] {
        return this.meta;
    }

    public async removeWorksheet(id: string): Promise<void> {
        // Filter out the worksheet with the selected id
        this.meta = this.meta.filter(m => m.id !== id);

        // Update the meta data in local storage
        await this.updateMetaLocalStorage();

        // Remove the specific worksheet data from local storage
        await Preferences.remove({ key: `${APP_PREFIX}${id}` });
        //localStorage.removeItem(`${APP_PREFIX}${id}`);
    }

    public async getWorksheet(id: string): Promise<IWorksheet> {
        const result = await Preferences.get({ key: `${APP_PREFIX}${id}` });
        if (result && result.value) {
            return JSON.parse(result.value) as IWorksheet;
        } else {
            return {} as IWorksheet;
        }
        //return JSON.parse(localStorage.getItem(`${APP_PREFIX}${id}`) || '{}') as IWorksheet
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