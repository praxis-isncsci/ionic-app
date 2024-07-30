<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <slot name="header-buttons"></slot>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <slot></slot>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <div class="footer-text">Copyright Praxis Institute</div>
      </ion-toolbar>
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
import { defineProps } from 'vue';
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.footer-text {
  text-align: center;
  padding: 10px;
}
</style>