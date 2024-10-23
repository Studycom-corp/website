import { defineStore } from "pinia";
import axios, { AxiosError } from 'axios'

export const useErrorHandle = defineStore('error_handle', {
    state: () => {
        let error: boolean = false;
        let message: string = ""
        let text: string = '';

        return {error, message, text}
    },

    actions: {
        alertError(error: unknown){
            this.error = true
            if(axios.isAxiosError(error)){
                if (error.response) {
                    const response = error.response?.data
                    this.message = response.message
                    this.text = response.error
                } else {
                    this.message = error.message
                    if(error.code)
                    this.text = error.code
                }
            } else {
                let thisError = error as LocalError
                this.message = thisError.message
                this.text = thisError.text
            }
        },

        closeError(){
            this.error = false
            this.message = ""
            this.text = ""
        }
    }
})

export interface LocalError {
    message: string,
    text: string
}