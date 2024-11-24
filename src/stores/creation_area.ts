import { defineStore } from "pinia";

export const useCreationAreaStore = defineStore('creation_area', {
    state() {
        const creationState: {status: boolean, source: string} = {source: '', status: false}

        return {creationState}
    },

    actions: {
        switchCreationState(status: boolean, source: string) {
            this.creationState = {status, source}
        }
    },
    persist: true
})