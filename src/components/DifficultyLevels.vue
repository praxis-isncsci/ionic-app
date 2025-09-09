<template>
    <span class="diff-stars" :title="String(difficulty)" :aria-label="ariaText" role="img">
    <IonIcon
        v-for="n in max"
        :key="n"
        :icon="n <= count ? star : starOutline"
        :color="n <= count ? filledColor : emptyColor"
        class="diff-star"
    />
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonIcon } from '@ionic/vue'
import { star, starOutline } from 'ionicons/icons'
import type { Difficulty } from '@/utils/exams'

const props = withDefaults(defineProps<{
    difficulty: Difficulty | string
    max?: number
    filledColor?: string
    emptyColor?: string
}>(), { max: 3, filledColor: 'warning', emptyColor: 'medium' })

const map: Record<string, number> = { easy: 1, medium: 2, hard: 3 }
const count   = computed(() => map[String(props.difficulty).toLowerCase()] ?? 0)
const ariaText = computed(() => `${props.difficulty} difficulty: ${count.value} of ${props.max} stars`)
</script>

<style scoped>
.diff-stars {
    display:inline-flex; 
    align-items:center; 
    gap:.15rem; 
    vertical-align: text-bottom; 
}

.diff-star  {
    font-size: 1rem; 
}
</style>
