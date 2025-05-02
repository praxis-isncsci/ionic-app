<template>
    <div class="wrapper">
        <table class="grid">
            <thead>
                <!-- -------------- top header row -------------- -->
                <tr class="bigHdr">
                    <th></th>
                    <th colspan="3">Right</th>

                    <!-- real spacer column -->
                    <th class="gap"></th>

                    <th colspan="3">Left</th>
                    <th></th>
                </tr>

                <!-- -------------- sub-header row -------------- -->
                <tr class="subHdr">
                    <th></th>
                    <th>Motor</th><th>LT</th><th>PP</th>

                    <!-- -------------- spacer column -------------- -->
                    <th class="gap"></th>

                    <th>LT</th><th>PP</th><th>Motor</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <!-- -------------- level rows -------------- -->
                <tr v-for="lvl in levels" :key="lvl">
                    <!-- level label (left) -->
                    <td class="lbl">{{ lvl }}</td>

                    <td :class="motorCellClass(lvl)">
                    {{ isMotorLevel(lvl) ? exam.rightMotorScores[lvl] ?? '' : '' }}
                    </td>
                    <td class="cell">{{ exam.rightLightTouchScores[lvl] ?? '' }}</td>
                    <td class="cell">{{ exam.rightPinPrickScores[lvl] ?? '' }}</td>

                    <!-- -------------- spacer column -------------- -->
                    <td class="gap"></td>

                    <!-- LEFT  -->
                    <td class="cell">{{ exam.leftLightTouchScores[lvl] ?? '' }}</td>
                    <td class="cell">{{ exam.leftPinPrickScores[lvl] ?? '' }}</td>
                    <td :class="motorCellClass(lvl)">
                    {{ isMotorLevel(lvl) ? exam.leftMotorScores[lvl] ?? '' : '' }}
                    </td>

                    <!-- -------------- level label (right) -------------- -->
                    <td class="lbl">{{ lvl }}</td>
                </tr>

                <!-- -------------- DAP / VAC row -------------- -->
                <tr>
                    <td class="lbl">DAP</td>

                    <td class="gap"></td>
                    <td colspan="2" class="bigCell">{{ exam.dap ? 'Yes' : 'No' }}</td>

                    <!-- -------------- spacer column -------------- -->
                    <td class="gap"></td>

                    <td colspan="2" class="bigCell">{{ exam.vac ? 'Yes' : 'No' }}</td>

                    <td class="gap"></td>
                    <td class="lbl">VAC</td>
                </tr>
            </tbody>
        </table>
        <!-- -------------- comments box -------------- -->
        <section class="comments">
            <p class="label">
                <strong>Comments </strong>
                <span class="sub">(Non-key Muscle? Reason for NT? Pain? Non-SCI condition?)</span>:
            </p>

            <p class="body">{{ exam.comments }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ExamData } from '../utils/exams'
defineProps<{ exam: ExamData }>()

const levels = [
    'C2','C3','C4','C5','C6','C7','C8',
    'T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12',
    'L1','L2','L3','L4','L5',
    'S1','S2','S3','S4-5'
]

const motorLevels = new Set(['C5','C6','C7','C8','T1','L2','L3','L4','L5','S1'])
const isMotorLevel   = (lvl: string) => motorLevels.has(lvl)
const motorCellClass = (lvl: string) => ({ cell: true, blank: !isMotorLevel(lvl) })
</script>

<style scoped>
/* -------------- layout -------------- */
.wrapper{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow-x:auto;
}

.grid{
    border-collapse: separate;
    border-spacing: 0.5px 0.5px;
}

/* -------------- headers -------------- */
.bigHdr th{
    font: 500 1.35rem/1 'Inter', sans-serif;
    text-align: center;
    padding-bottom: 4px;
}
.subHdr th{
    font: 500 .86rem/1 'Inter', sans-serif;
    text-align: center;
    padding-bottom: 4px;
}

/* -------------- labels -------------- */
tbody .lbl{
    font: 400 1rem/1.4 'Inter', sans-serif;
    color: #444;
    text-align: right;
    padding-right: .75rem;
    width: 52px;
}

/* -------------- score cells -------------- */
.cell{
    width: 36px;
    height: 36px;
    border: 1px solid #C5C5C5;
    border-radius: 2px;
    background: #FFF;
    text-align: center;
    vertical-align: middle;
    font: 500 .95rem/1 'Inter', sans-serif;
}

.blank{
    background: transparent;
    border: 1px solid transparent;
    width: 36px; height: 36px;
}

.bigCell{
    width: 72px;
    height: 36px;
    border: 1px solid #C5C5C5;
    border-radius: 2px;
    background: #FFF;
    text-align: center;
    vertical-align: middle;
    font: 500 .95rem/1 'Inter', sans-serif;
}

.gap, th.gap{
    width: 28px;
    border: none;
    padding: 0;
}

/* -------------- comment box -------------- */
.comments{
    margin-top:1.25rem;
    width:100%;
    max-width:750px;
    border:1px solid #C5C5C5;
    border-radius:4px;
    padding:.75rem .85rem;
    font:500 .9rem/1.35 "Inter",sans-serif;
}

.comments .label{
    margin:0 0 .25rem;
}

.comments .label .sub{
    font-weight:400;
    font-style:italic;
}

.comments .body{
    white-space:pre-wrap;
}

</style>