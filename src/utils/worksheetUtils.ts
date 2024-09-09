import { alertController } from '@ionic/vue';
import { APP_PREFIX } from '@/config';

export const generateWorksheetName = (): string => {
    const metaKey = `${APP_PREFIX}meta`;
    const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');

    let worksheetNumber = 1;
    let worksheetName = `Worksheet ${worksheetNumber}`;

    const worksheetExists = (name: string) =>
        savedMeta.some((item: any) => item.name === name);

    while (worksheetExists(worksheetName)) {
        worksheetNumber += 1;
        worksheetName = `Worksheet ${worksheetNumber}`;
    }

    return worksheetName;
};

export const promptForUniqueWorksheetName = async (initialName: string): Promise<string | null> => {
    let worksheetName = initialName || generateWorksheetName();
    let uniqueName = false;

    const metaKey = `${APP_PREFIX}meta`;
    const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');

    while (!uniqueName) {
        const alert = await alertController.create({
        header: 'Enter worksheet name',
        inputs: [{ 
            type: 'text',
            value: worksheetName,
            placeholder: 'Worksheet name'
        }],
        buttons: [
            { text: 'Cancel', role: 'cancel' },
            { text: 'OK', role: 'confirm' },
        ],
    });
    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'cancel') return null;

    worksheetName = result.data.values[0];
    if (!worksheetName) worksheetName = generateWorksheetName();

    const nameExists = savedMeta.some((item: any) => item.name === worksheetName);

    if (nameExists) {
        const errorAlert = await alertController.create({
            header: 'Name already exists',
            message: 'A worksheet with this name already exists. Please enter a unique name.',
            buttons: ['OK'],
        });
        await errorAlert.present();
        await errorAlert.onDidDismiss();

        worksheetName = generateWorksheetName();
        } else {
        uniqueName = true;
        }
    }

    return worksheetName;
};