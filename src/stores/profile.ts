import { defineStore } from "pinia"

export const useProfileStore = defineStore('profile', {
    state: ()=> {
        let active_tab: string = ''

        return {active_tab}
    },

    actions: {
        activateTab(name: string) {
            this.active_tab = name
        }
    },
    persist: true
})