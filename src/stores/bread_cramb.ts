import { defineStore } from "pinia";

export const useBreadCrumb = defineStore('breadCrumb', {
    state() {
        let level: number = 1
        let items: string[] = []
        
        return {level, items}
    },

    actions: {
        push(item: string) {
            this.items.push(item)
            this.level += 1
        },

        rebuild(item: string) {
            this.items = [item]
            this.level = 1
        },

        replace(item: string) {
            this.items[this.items.length-1] = item
        },

        pop() {
            this.items.pop()
            this.level -= 1
        }
    },
    persist: true
})