import { alertController } from '@ionic/vue';
import { WorksheetDetails } from './worksheetUtils';
import { toastController } from '@ionic/vue';

export const showUnsavedDataAlert = (): Promise<boolean> => {
    return new Promise((resolve) => {
        alertController.create({
            header: 'Unsaved Changes',
            message: 'You have unsaved changes. Do you want to save before leaving?',
            buttons: [
                {
                    text: 'Discard',
                    role: 'cancel',
                    handler: () => {
                        resolve(false);
                    }
                },
                {
                    text: 'Save',
                    handler: () => {
                        resolve(true);
                    }
                }
            ]
        }).then(alert => alert.present());
    });
}

export const promptForUniqueWorksheetName = async (initialName: string): Promise<string | null> => {
    const alert = await alertController.create({
        header: 'Enter exam name',
        inputs: [{
            type: 'text',
            value: initialName,
            placeholder: 'Worksheet name'
        }],
        buttons: [
            { text: 'Cancel', role: 'cancel' },
            { text: 'OK', role: 'confirm' },
        ],
    });
    await alert.present();
    const result = await alert.onDidDismiss();

    return (result.role === 'cancel') ? null : result.data.values[0];
};

export const promptFoNameExist = async () => {
    const errorAlert = await alertController.create({
        header: 'Name already exists',
        message: 'An exam with this name already exists. Please enter a unique name.',
        buttons: ['OK'],
    });
    await errorAlert.present();
    await errorAlert.onDidDismiss();
}

export const showConfirmDeleteAlert = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        alertController.create({
            header: 'Confirm Delete',
            message: 'Are you sure you want to delete this exam?',
            buttons: [
                { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
                { text: 'Delete', role: 'confirm', handler: () => resolve(true) },
            ],
        }).then(alert => alert.present());
    });
};

const formatDateTimeLocal = (date: Date): string =>{
    const pad = (n: number) => n.toString().padStart(2, '0');
    const YYYY = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const DD = pad(date.getDate());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
}

export const promptForWorksheetDetails = (
    initialName: string,
    defaultExamDate: Date
    ): Promise<WorksheetDetails | null> => {
        return new Promise((resolve) => {
        alertController
            .create({
            header: 'Exam Details:',
            inputs: [
                {
                name: 'worksheetName',
                type: 'text',
                value: initialName,
                placeholder: 'Exam Name',
                cssClass: 'ws-name',
                },
                {
                name: 'examDate',
                type: 'datetime-local',
                value: formatDateTimeLocal(defaultExamDate),
                cssClass: 'ws-date',
                attributes: { 'aria-label': 'Exam date / time' },
                },
            ],
            buttons: [
                { text: 'Cancel', role: 'cancel', handler: () => resolve(null) },
                {
                text: 'OK',
                role: 'confirm',
                handler: (data) => {
                    if (data && data.worksheetName && data.examDate) {
                    resolve({
                        name: data.worksheetName.trim(),
                        examDate: new Date(data.examDate),
                    });
                    } else {
                    // Prevent closing the modal if fields are empty
                    return false;
                    }
                },
                },
            ],
            })
            .then((alert) => {
            alert.present();
            });
        });
};

export const showToast = async (message: string): Promise<void> => {
    const toast = await toastController.create({
        message,
        duration: 2000, 
        position: 'middle',
        cssClass: 'custom-toast',
        });
    await toast.present();
}

let isCalculationErrorAlertOpen = false;

export const showCalculationErrorAlert = async (message: string): Promise<void> => {
    if (isCalculationErrorAlertOpen) return;
    isCalculationErrorAlertOpen = true;

    const alert = await alertController.create({
        header: 'Calculation Error',
        message: message,
        buttons: [
            {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                    isCalculationErrorAlertOpen = false;
                },
            },
        ],
        cssClass: 'calculation-error-alert',
    });

    await alert.present();
    await alert.onDidDismiss();
    isCalculationErrorAlertOpen = false;
};