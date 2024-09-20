import { alertController } from '@ionic/vue';

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
        header: 'Enter worksheet name',
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
        message: 'A worksheet with this name already exists. Please enter a unique name.',
        buttons: ['OK'],
    });
    await errorAlert.present();
    await errorAlert.onDidDismiss();
}

export const showConfirmDeleteAlert = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        alertController.create({
            header: 'Confirm Delete',
            message: 'Are you sure you want to delete this worksheet?',
            buttons: [
                { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
                { text: 'Delete', role: 'confirm', handler: () => resolve(true) },
            ],
        }).then(alert => alert.present());
    });
};