<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title @click="handleTitleClick">{{ title }}</ion-title>
        <slot name="header-buttons"></slot>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <slot></slot>
    </ion-content>

    <ion-footer v-if="showNavbar">
      <!-- <ion-toolbar>
        <div class="footer-text">Copyright Praxis Institute</div>
      </ion-toolbar> -->
      <AppNavbar />
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
  IonTitle
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import AppNavbar from '@/components/AppNavbar.vue';
const props = defineProps<{
  title: string;
  showNavbar: boolean;
}>();

const router = useRouter();
const handleTitleClick = () => {
  if (props.title === 'EULA') {
    const eulaAccepted = localStorage.getItem('eulaAccepted');
    if (eulaAccepted === 'true') {
      router.push('/home');
    }
  } else if (props.title === 'ISNCSCI') {
    router.push('/eula');
  }
};
</script>

<style scoped>
.footer-text {
  text-align: center;
  padding: 10px;
}
</style>