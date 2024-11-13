import { api } from '@/router/api'
import { defineStore } from 'pinia'
import { useErrorHandle } from './error_handle'

export const useHomeStore = defineStore('home', {
  state: () => {
    let active_tab: string = ''
    let eventSource = null as EventSource | null
    let eventListnerInitialized: boolean = false
    let notifications: Notification[] = [
        {
            id: 't3534231dj3o', source: 'Aine',
            layout: 'You just joined', createdAt: 'Just now'
        },
        {
            id: 'r92crn299n5l', source: 'Jane',
            layout: 'source.has liked your post.subject',
            subject: 'Tuli Outside', createdAt: '2 min'
        },
    ]
    let sseUrl: string = 'http://localhost:3000/notification/sse'

    return { active_tab, sseUrl, eventSource, eventListnerInitialized, notifications }
  },

  actions: {
    activateTab(name: string) {
      this.active_tab = name
    },

    initializeEventListener() {
        if(this.eventListnerInitialized){
            return
        }

        this.eventSource = new EventSource(this.sseUrl, {withCredentials: true})
        
        this.eventSource.addEventListener('message', (e)=> {
            this.notifications.splice(0, 0, e.data)
        })

        this.eventListnerInitialized = true
    },

    async fetchNotifications() {
        const errorHandler = useErrorHandle()
        try {
            const response = await api.get('notification')
            if (response.status == 200) {
                this.notifications = response.data
            }
        } catch (error) {
            errorHandler.alertError(error)
        }
    }
  },
  persist: {
    omit: ['eventSource']
  }
})

// link applies to notifications tha require visiting something out of scope
// subject applies to notifications that mention items within system
// layout is a dot notation string structure that defines how a notification must written
// Source is the origin user for that triggered the notification
export interface Notification {
    id: string
    source: string,
    layout: string
    createdAt: string
    subject?: string,
    links?: Record<string, string>[]
    body?: string
}
