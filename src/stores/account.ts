import { defineStore } from 'pinia'
import { useErrorHandle } from './error_handle'
import { api } from '@/router/api'
import type { ProfilePhoto } from './auth'

export const useAccountStore = defineStore('account', {
  state: ()=> {
    let isUser: boolean = false;
    let user: User = {
      full_name: '',
      email_address: '',
      user_name: '',
      profession: '',
      verified: false,
      profile_photo: {
        name: '',
        lastModified: 0,
        type: '',
        base64rep: ''
      },
    };
    let reset_period: number = 0;
    let darkMode = true;
    let drawer = false
    let active_nav = 'home'
    let bottomSheet: {active:boolean, source: string} = {active: false, source: ''}

    return { isUser, user, reset_period, darkMode, drawer, active_nav, bottomSheet }
  },

  actions: {
    toggleDarkMode(target?: 'true' | 'false'){
      if (target) {
        if (target == 'true') {
          this.darkMode = true
        } else {
          this.darkMode == false
        }
      } else {
        this.darkMode = !this.darkMode
      }

      const app = document.querySelector("#app")
      if (this.darkMode) {
        if (!app?.classList.contains('dark')) {
          app?.classList.add('dark')
        }
      } else {
        if (app?.classList.contains('dark')) {
          app.classList.remove('dark')
        }
      }
    },

    switchBottomSheet(state: boolean, source: string) {
      this.bottomSheet.active = state
      this.bottomSheet.source = source
    },

    toggleDrawer() {
      this.drawer = !this.drawer
    },

    activateNav(target: string) {
      this.active_nav = target
    },

    async login(user: Login){
      let errorHandle = useErrorHandle()

      try {
        let response = await api.post('/user/login', user) 

        if(response.status == 201){
          this.isUser = true
          this.user = response.data
          // TODO
          this.user.verified = true
          return true
        }
      } catch (error) {
        errorHandle.alertError(error)
      }
    },

    async signup(user: Signup) {
      const errorHandle = useErrorHandle()

      const formData = new FormData()
      formData.append('email_address', user.email_address)
      formData.append('full_name', user.full_name)
      formData.append('password', user.password)
      formData.append('profession', user.profession)
      formData.append('user_name', user.user_name)

      const byteString = atob(user.profile_photo.base64rep.split(',')[1]);

      const byteNumbers = new Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
          byteNumbers[i] = byteString.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      const profile_blob = new Blob([byteArray], {type: user.profile_photo.type});
      const profile_photo = new File(
        [profile_blob], user.profile_photo.name,
        {type: user.profile_photo.type, lastModified: user.profile_photo.lastModified}
      )
      
      formData.append('profile_photo', profile_photo)

      try {
        const response = await api.post('/user/signup', formData)

        if(response.status == 201){
          console.log("Email: ", response)
          this.user = response.data
          this.start_reset_period()

          return true
        }
      } catch (error) {
        errorHandle.alertError(error)
      }
    },

    async verify_account(code: number, email_address: string) {
      const errorHandle = useErrorHandle()

      try {
        const response = await api.post('/user/verify_account', {otp: code, email_address})

        if(response.status == 201){
          console.log("User: ", response)
          this.user = response.data

          return true
        }
      } catch (error) {
        errorHandle.alertError(error)
      }
    },

    start_reset_period() {
      this.reset_period = 60
      let intervalId = setInterval(() => {
        this.reset_period -= 1
        if (this.reset_period == 0) {
          clearInterval(intervalId);
        }
      }, 1000)
    },

    async requestResendCode(email_address: string) {
      console.log("Email: ", email_address)
      const errorHandle = useErrorHandle()
      
      try {
        const response = await api.post('/user/resendOtp', {email_address})

        if(response.status == 201){
          this.start_reset_period()
          return true
        }
      } catch (error) {
        errorHandle.alertError(error)        
      }
    }
  },
  persist: true
})

export interface Login {
  email_address: string,
  password: string
}

export interface User {
  full_name: string
  email_address: string
  user_name: string
  profession: string
  verified: boolean
  profile_photo: ProfilePhoto
}

export interface Signup extends User {
  password: string 
}