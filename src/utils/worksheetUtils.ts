import { APP_PREFIX } from '@/config';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
// import { Capacitor } from '@capacitor/core';
import { inject } from 'vue';
import { Storage } from '@ionic/storage';

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
    private store: Storage;

    private constructor() {
        const store = inject<Storage>('store');
        if (!store) {
            throw new Error('Ionic Storage instance is not available. Ensure it is provided in main.ts')
        }
        this.store = store;
    }

    public static getInstance(): Worksheets {
        if (!Worksheets.instance) {
            Worksheets.instance = new Worksheets();

        }
        return Worksheets.instance;
    }

    private async secureSet(key: string, value: string): Promise<void> {
        return this.store.set(key, value);
    }

    private async secureGet(key: string): Promise<string | undefined> {
        return this.store.get(key)
    }

    private async secureRemove(key: string): Promise<void> {
        return this.store.remove(key);
    }

    private async updateMetaLocalStorage() {
        await this.secureSet(this.metaKey, JSON.stringify(this.meta));
    }

    private async updateWorksheetLocalStorage(worksheet: IWorksheet) {
        await this.secureSet(`${APP_PREFIX}${worksheet.id}`, JSON.stringify(worksheet));
        //localStorage.setItem(`${APP_PREFIX}${worksheet.id}`, JSON.stringify(worksheet));
    }

    public async loadMeta() {
        if (!this.isMetaLoaded) {
            const value = await this.secureGet(this.metaKey);
            if (value) {
                this.meta = JSON.parse(value);
                this.meta.forEach((m) => {
                    m.examDate = new Date(m.examDate);
                    m.lastUpdateDate = new Date(m.lastUpdateDate);
                });
            }
            this.isMetaLoaded = true;
        }
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
        const suffex = 'Exam ';
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
        await this.secureRemove(`${APP_PREFIX}${id}`);
        //localStorage.removeItem(`${APP_PREFIX}${id}`);
    }

    public async getWorksheet(id: string): Promise<IWorksheet> {
        const value = await this.secureGet(`${APP_PREFIX}${id}`);
        if (value) {
            return JSON.parse(value) as IWorksheet;
        } else {
            return {} as IWorksheet;
        }
    }

    public getMeta(id: string): IWorksheetMetaItem | undefined {
        return this.meta.find(m => m.id.trim().toLowerCase() == id.trim().toLowerCase());
    }
}