<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <IsncsciControl ref="isncsciControlRef" Isn></IsncsciControl>

    <template #footer-buttons>
      <AppNavbar :calculateOnClick="calculate_onClick || (() => { })" :saveOnClick="save_onClick || (() => { })">
      </AppNavbar>
    </template>
  </MainLayout>
</template>



<script setup lang="ts">
import MainLayout from './MainLayout.vue';
import IsncsciControl from '@/components/IsncsciControl.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import { ref } from 'vue';
import { alertController } from '@ionic/vue';

const isncsciControlRef = ref(null);

const calculate_onClick = async () => {
  const isSuccess = await isncsciControlRef.value?.calculate();
  if (!isSuccess) {
    console.log('error in ISNCSCI calculation');
  }
};

const save_onClick = async () => {
  const alert = await alertController.create({
    header: 'Insert your link here:',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'OK',
        role: 'confirm',
      }
    ],
    inputs: [
      {
        value: 'Worksheet 1'
      }
    ]
  });

  await alert.present();

  const result = await alert.onDidDismiss();


  if (result.role == 'confirm') {
    const metaKey = 'isncsci_meta';
    const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');

    const now = new Date();
    const id = now.getTime().toString();
    const savedItem = {
      id,
      name: result.data.values[0],
      savedAt: now.toLocaleString(),
    }
    savedMeta.push(savedItem);

    localStorage.setItem(metaKey, JSON.stringify(savedMeta));
    localStorage.setItem(`isncsci_${id}`, JSON.stringify(isncsciControlRef.value?.data()));
  }
}
</script>