import { APP_PREFIX } from '@/config'
import { inject, reactive, toRaw } from 'vue'
import { Storage } from '@ionic/storage'

export interface ProgressEntry {
    done : boolean
    finishedAt?: string
}

class LearningProgress {
    private static instance: LearningProgress
    private key = `${APP_PREFIX}learningProgress`
    private progress = reactive<Record<number, ProgressEntry>>({})
    private isLoaded = false
    private store: Storage

    private constructor () {
        const st = inject<Storage>('store')
        if (!st) throw new Error('Ionic Storage instance missing')
        this.store = st
    }

    static getInstance () {
        if (!this.instance) this.instance = new LearningProgress()
        return this.instance
    }

    private async save () {
        await this.store.set(this.key, JSON.stringify(toRaw(this.progress)))
    }
    private async load () {
        if (this.isLoaded) return
        const v = await this.store.get(this.key)
        if (v) {
            const parsed = JSON.parse(v) as Record<number, ProgressEntry>
            Object.assign(this.progress, parsed)
        }
        this.isLoaded = true
    }

    
    async init (examCount: number) {
        await this.load()
        for (let i = 0; i < examCount; i++) {
            if (!this.progress[i]) this.progress[i] = { done: false }
        }
        await this.save()
    }

    markDone (idx: number) {
        const now = new Date().toISOString()
        if (!this.progress[idx]) this.progress[idx] = { done: false }
        if (!this.progress[idx].done) {
            this.progress[idx].done = true
            this.progress[idx].finishedAt = now
            this.save()
        }
    }

    entry (idx: number) {
        return this.progress[idx] ?? { done: false }
    }
    get finishedTotal () { return Object.values(this.progress).filter(e => e.done).length }
    get state () { return this.progress }
}
export default LearningProgress