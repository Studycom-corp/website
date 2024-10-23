import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: ()=> {
        let stepper_progress: string[] = []
        let current_step: string = 'account'
        let form1: Form1 = {password_confirm: '', password: '', email_address: '', terms: false}
        let form2: Form2 = {first_name: "", second_name: "", profession: "", profile_photo: undefined, user_name: ""}

        return {stepper_progress, current_step, form1, form2}
    },

    actions: {
        makeProgress(step: string) {
            if(!this.stepper_progress.includes(step)){
                this.stepper_progress.push(step)
            }

            let stepper_length = this.stepper_progress.length

            if(stepper_length < 2){
                this.current_step = 'personal'
            } else {
                this.current_step = 'preview'
            }
        },

        persistForm(target: string, form: Form1 | Form2) {
            if(target == 'form1'){
                this.form1 = form as Form1
                this.makeProgress('account')
            } else {
                this.form2 = form as Form2
                this.makeProgress('personal')
            }
        },

        clearForms(){
            this.form1 = {password_confirm: '', password: '', email_address: '', terms: false}
            this.form2 = {first_name: "", second_name: "", profession: "", profile_photo: undefined, user_name: ""}
            this.stepper_progress = []
            this.current_step = 'account'
        },

        next(){
            const curr_index = this.stepper_progress.findIndex(step => step === this.current_step)
            if(curr_index+1 < this.stepper_progress.length && curr_index != -1) {
                this.current_step = this.stepper_progress[curr_index+1]
            }
        },

        prev() {
            const curr_index = this.stepper_progress.findIndex(step => step === this.current_step)
            if(curr_index >= 1) {
                this.current_step = this.stepper_progress[curr_index-1]
            }
        },

        go(target: string) {
            const target_index = this.stepper_progress.findIndex(step => step === target)
            console.log('Target index: ', target_index)

            if (target_index != -1) {
                this.current_step = target
                console.log("Current step: ", this.current_step)
            }
        }
    },
    persist: true
})

export interface Form1 {
    password: string,
    password_confirm: string,
    email_address: string,
    terms: boolean
}

export interface Form2 {
    first_name: string,
    second_name: string,
    profession: string,
    profile_photo: ProfilePhoto | undefined,
    user_name: string
}

export interface ProfilePhoto {
    name: string, lastModified: number,
    type: string, base64rep: string
}