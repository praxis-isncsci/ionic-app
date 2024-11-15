<template>
    <praxis-isncsci-input slot="input-controls" disabled ref="inputButtonsRef">
        <label for="consider-normal" slot="consider-normal-label">Consider normal or not normal for
            classification:</label>
        <select name="consider-normal" id="consider-normal" slot="consider-normal">
            <option></option>
            <option value="1" class="cell-input">Consider Normal</option>
            <option value="2" class="cell-input">Consider Not Normal</option>
        </select>
        <label for="reason-for-impairment-not-due-to-sci" slot="reason-for-impairment-not-due-to-sci-label">
            If motor impairment not due to SCI, please indicate reason:
        </label>
        <select id="reason-for-impairment-not-due-to-sci" name="reason-for-impairment-not-due-to-sci"
            slot="reason-for-impairment-not-due-to-sci">
            <option></option>
            <option value="1" class="cell-input">Plexopathy</option>
            <option value="2" class="cell-input">Peripheral neuropathy</option>
            <option value="3" class="cell-input">Pre-existing myoneural disease (e.g. Stroke, MS, etc.)</option>
            <option value="6" class="cell-input">Other (specify:)</option>
        </select>
        <label for="reason-for-impairment-not-due-to-sci-specify"
            slot="reason-for-impairment-not-due-to-sci-specify-label">Specify:</label>
        <textarea id="reason-for-impairment-not-due-to-sci-specify" name="reason-for-impairment-not-due-to-sci-specify"
            slot="reason-for-impairment-not-due-to-sci-specify"></textarea>
    </praxis-isncsci-input>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    const props = defineProps<{ inputButtonsRef?: Ref<HTMLElement | null> }>();
    const inputButtonsRef = props.inputButtonsRef ?? ref<HTMLElement | null>(null);
</script>

