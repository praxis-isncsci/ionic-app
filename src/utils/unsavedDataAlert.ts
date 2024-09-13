import { alertController } from '@ionic/vue';

export function showUnsavedDataAlert(): Promise<boolean> {
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