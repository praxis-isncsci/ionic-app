<template>
    <div class="wrapper">
    <table class="grid">
        <colgroup>
        <!-- lbl | R M | R LT | R PP | diagram | L LT | L PP | L M | lbl -->
        <col style="width:36px" />
        <col style="width:36px" />
        <col style="width:36px" />
        <col style="width:36px" />
        <col style="width:300px" />
        <col style="width:36px" />
        <col style="width:36px" />
        <col style="width:36px" />
        <col style="width:36px" />
        </colgroup>

        <!-- ------------- HEADERS ------------- -->
        <thead>
        <tr class="bigHdr">
            <th></th>
            <th colspan="3">Right</th>
            <th></th>
            <th colspan="3">Left</th>
            <th></th>
        </tr>
        <tr class="subHdr">
            <th></th>
            <th>M</th><th>LT</th><th>PP</th>
            <th></th>
            <th>LT</th><th>PP</th><th>M</th>
            <th></th>
        </tr>
        </thead>

        <!-- ------------- BODY ROWS ------------- -->
        <tbody>
        <tr v-for="(lvl,rowIndex) in levels" :key="lvl">
            <!-- Right‑side label -->
            <td class="lbl-right">{{ lvl }}</td>

            <!-- right scores -->
            <td :class="motorCellClass(lvl)">
            {{ isMotorLevel(lvl) ? exam.rightMotorScores[lvl] ?? '' : '' }}
            </td>
            <td class="cell">{{ exam.rightLightTouchScores[lvl] ?? '' }}</td>
            <td class="cell">{{ exam.rightPinPrickScores[lvl]   ?? '' }}</td>

            <!-- diagram column -->
            <td v-if="rowIndex === 0"
                :rowspan="levels.length + 1"
                class="diagramCell">
            <img
                src="../../public/assets/c-isncsci-body-diagram.svg"
                alt="diagram"
                class="diagram"
            />
            </td>

            <!-- left scores -->
            <td class="cell">{{ exam.leftLightTouchScores[lvl] ?? '' }}</td>
            <td class="cell">{{ exam.leftPinPrickScores[lvl]   ?? '' }}</td>
            <td :class="motorCellClass(lvl)">
            {{ isMotorLevel(lvl) ? exam.leftMotorScores[lvl] ?? '' : '' }}
            </td>

            <!-- Leftt‑side label -->
            <td class="lbl-left">{{ lvl }}</td>
        </tr>

        <!-- ------------- DAP / VAC ------------- -->
        <tr>
            <td class="lbl-right">DAP</td>

            <td class="empty"></td>
            <td colspan="2" class="bigCell">{{ exam.dap ? 'Yes' : 'No' }}</td>

            <td colspan="2" class="bigCell">{{ exam.vac ? 'Yes' : 'No' }}</td>

            <td class="empty"></td>
            <td class="lbl-left">VAC</td>
        </tr>
        </tbody>
    </table>

    <!-- ------------- comments ------------- -->
    <section class="comments">
        <p class="label">
        <strong>Comments </strong>
        <span class="sub">(Non‑key Muscle? Reason for NT? Pain? Non‑SCI condition?)</span>:
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
    'L1','L2','L3','L4','L5','S1','S2','S3','S4-5'
]

const motorLevels   = new Set(['C5','C6','C7','C8','T1','L2','L3','L4','L5','S1'])
const isMotorLevel  = (lvl: string) => motorLevels.has(lvl)
const motorCellClass= (lvl: string) => ({ cell:true, blank:!isMotorLevel(lvl) })
</script>

<style scoped>
/* ------------- WRAPPER ------------- */
.wrapper{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow-x:auto;
}

/* ------------- GRID ------------- */
.grid{
    table-layout:fixed;
    border-collapse:separate;
    border-spacing:4.5px 0.5px;
}

/* ------------- header ------------- */
.bigHdr th{
    font:500 1.35rem/1 'Inter',sans-serif;
    text-align:center; 
    padding-bottom:4px;
}
.subHdr th{
    font:500 .86rem/1 'Inter',sans-serif;
    text-align:center; 
    padding-bottom:4px;
}

/* ------------- labels ------------- */
tbody .lbl-left{
    font:400 0.8rem/1.2 'Inter',sans-serif;
    color:#3B3B3B; 
    text-align:left;
}

tbody .lbl-right{
    font:400 0.8rem/1.2 'Inter',sans-serif;
    color:#3B3B3B; 
    text-align:right;
}

/* ------------- cells ------------- */
.cell{
    width:45px;
    height:10px;
    border:1px solid #3B3B3B;
    background:#FFF;
    text-align:center; 
    vertical-align:middle;
    font:500 .85rem/1 'Inter',sans-serif;
}

.blank{ 
    background:transparent; 
    border:1px solid transparent; 
}

/* ------------- cells DAP / VAC ------------- */
.bigCell{
    width:90px;
    height:10px;
    border:1px solid #3B3B3B;
    background:#FFF;
    text-align:center; vertical-align:middle;
    font:500 .85rem/1 'Inter',sans-serif;
}

/* ------------- empty cells used only for spacing ------------- */
.empty{ 
    width:45px; 
    border:none; 
    padding:0; 
}

/* ------------- diagram ------------- */
.diagramCell{
    padding:0; border:none;
}

.diagram{
    display:block;
    width:100%;
    height:auto;
    max-height:100%;
    margin:auto;
}

/* ------------- comments ------------- */
.comments {
    margin-top:1.25rem;
    max-width:750px;
    border:1px solid #3B3B3B;
    padding:.55rem .85rem;
    font:500 .9rem/1.35 "Inter",sans-serif;
}
.comments .label { 
    margin:0 0 .25rem; 
}
.comments .label .sub { 
    font-weight:400; 
    font-style:italic; 
}
.comments .body { 
    white-space:pre-wrap; 
}

@media (max-width: 600px) {
    .diagram {
        display:none;
    }
    
    .grid col:nth-child(5) { 
        width:20px !important; 
    }
}

</style>