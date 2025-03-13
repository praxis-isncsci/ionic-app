<template>
    <div v-if="props.trainingMode">
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="c5-icon"
        @click="onIconClick('C5')"/>
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="c6-icon"
        @click="onIconClick('C6')"/>
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="c7-icon"
        @click="onIconClick('C7')"/>
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="c8-icon"
        @click="onIconClick('C8')"/>

        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="t1-icon"
        @click="onIconClick('T1')"/>

        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="l2-icon"
        @click="onIconClick('L2')"/>
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="l3-icon"
        @click="onIconClick('L3')"/>
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="l4-icon"
        @click="onIconClick('L4')"/>
        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="l5-icon"
        @click="onIconClick('L5')"/>

        <ion-icon 
        :icon="informationCircle" 
        v-if="trainingMode" 
        class="s1-icon"
        @click="onIconClick('S1')"/>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { IonIcon } from '@ionic/vue';
import { informationCircle } from 'ionicons/icons';

const props = defineProps<{
trainingMode: boolean
}>();

function onIconClick(level: string) {
console.log('Clicked icon for', level);
}
</script>

<style scoped>
.c5-icon {
    position: absolute;
    top: 305px;
    left: 210px;
}

.c6-icon {
    position: absolute;
    top: 342px;
    left: 210px;
}

.c7-icon {
    position: absolute;
    top: 380px;
    left: 210px;
}

.c8-icon {
    position: absolute;
    top: 417px;
    left: 210px;
}

.t1-icon {
    position: absolute;
    top: 455px;
    left: 210px;
}

.l2-icon {
    position: absolute;
    top: 950px;
    left: 210px;
}

.l3-icon {
    position: absolute;
    top: 987px;
    left: 210px;
}

.l4-icon {
    position: absolute;
    top: 1025px;
    left: 210px;
}

.l5-icon {
    position: absolute;
    top: 1062px;
    left: 210px;
}

.s1-icon {
    position: absolute;
    top: 1102px;
    left: 210px;
}
</style>
