import { defineStore } from "pinia";
import { useErrorHandle } from "./error_handle";
import { api } from "@/router/api";

export const useInboxStore = defineStore('inbox', {
    state(){
        let loadedChat: Chat | undefined;
        let chats: Chat[] = [
            {
                id: 'hsf3i29lh',
                createdAt: '22:40',
                updatedAt: '22:40',
                title: 'KYUCSA',
                type: 'group',
                messages: []
            },
            {
                id: "syf9wh923",
                createdAt: "23:45",
                updatedAt: "23:45",
                title: 'Ssenono',
                type: 'private',
                messages: [
                    {
                        id: "qdjzd92u4", sender: 'Aine', sent: true, replyTo: "none",
                        sentAt: '21:45', delivered: true, receiver: "Ssenono", type: 'plain_text',
                        value: "Hello there", senderEmail: 'ainedixon01@gmail.com'
                    },
                    {
                        id: "qdmoi340_w0", sender: 'Aine', sent: true, replyTo: "none",
                        sentAt: '21:46', delivered: true, receiver: "Ssenono", type: 'plain_text',
                        value: "Where are you?", senderEmail: 'ainedixon01@gmail.com'
                    },
                    {
                        id: "zdn203#4", sender: 'Ssenono', sent: true, replyTo: "none",
                        sentAt: '21:46', delivered: true, receiver: "Aine", type: 'plain_text',
                        value: "At the faculty block", senderEmail: 'ssenono01@gmail.com'
                    }
                ]
            },
            {
                id: "N9d9f8nco",
                createdAt: "23:40",
                updatedAt: "23:40",
                title: 'Robert',
                type: 'private',
                messages: [
                    {
                        id: "qdjzd92u4", sender: 'Aine', sent: true, replyTo: "none",
                        sentAt: '21:34', delivered: true, receiver: "Robert", 
                        value: "Yoo! What's going on guy?", type: 'plain_text',
                        senderEmail: 'ainedixon01@gmail.com'
                    },
                    {
                        id: " qi390)20", sender: 'Robert', sent: true, replyTo: "none",
                        sentAt: '21:35', delivered: true, receiver: "Aine", 
                        value: "Nothing, wassap?", type: 'plain_text',
                        senderEmail: 'anonymous195@gmail.com'
                    },
                    {
                        id: "NOSdw9e8", sender: 'Aine', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:40', delivered: false, receiver: "Robert",
                        value: "I heard that you had left to Europe for Euro rust conference, Did you reach safely?",
                        senderEmail: 'ainedixon01@gmail.com'
                    },
                    {
                        id: "skju*&h9", sender: 'Aine', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:41', delivered: false, receiver: "Robert",
                        value: "I'm expecting to go but i need someone to be with",
                        senderEmail: 'ainedixon01@gmail.com'
                    },
                    {
                        id: "KIeg2ir8", sender: 'Aine', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:41', delivered: false, receiver: "Robert",
                        value: "I got 3 tickets, 3 reserved seats and everything necessary",
                        senderEmail: 'ainedixon01@gmail.com'
                    },
                ]
            },
            {
                id: 'jbdw73402c',
                createdAt: '22:40',
                updatedAt: '22:40',
                title: 'ITD Interractions',
                type: 'group',
                messages: [
                    {
                        id: "Ninwif(8o", sender: 'Robert', sent: true,
                        replyTo: "none", sentAt: '21:34', delivered: true,
                        receiver: "group", value: "Yoo! What's going on guys?",
                        type: 'plain_text', senderEmail: 'anonymous195@gmail.com'
                    },
                    {
                        id: "ao08224n9", sender: 'Robert', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:40', delivered: true, receiver: "group",
                        value: "There's an amazing Rust conference soon in Europe, who is in?",
                        senderEmail: 'anonymous195@gmail.com'
                    },
                    {
                        id: "mn29iq0h", sender: 'Gushu', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:42', delivered: true, receiver: "group",
                        value: "We just done with PyCon man, we are tired!",
                        senderEmail: 'gushurivan43@gmail.com'
                    },
                    {
                        id: "sio98d83i", sender: 'Dixon', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:42', delivered: false, receiver: "group",
                        value: "Does that matter", senderEmail: 'ainedixon01@gmail.com'
                    },
                    {
                        id: " u387i40", sender: 'Gushu', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:46', delivered: true, receiver: "group",
                        value: "Man, the brain has to rest",
                        senderEmail: 'gushurivan43@gmail.com'
                    },
                ]
            }
        ]
        let activeList: string = 'group'
        
        return {loadedChat, chats, activeList}
    },

    actions: {
        loadChat(chatId: string) {
            const chatIndex = this.chats.findIndex(chat => chat.id == chatId)

            if (chatIndex == undefined) {
                let errorHandler = useErrorHandle()
                errorHandler.alertError("Error while loading chat")
                return
            }

            this.loadedChat = this.chats[chatIndex]
        },

        unloadChat() {
            this.loadedChat = undefined
        },

        activateList(target: 'private' | 'group') {
                this.activeList = target
        },

        toogle_chatList() {
            if(this.activeList == 'group'){
                this.activeList = 'private'
            } else {
                this.activeList = 'group'
            }
        },

        async createChat(chat: RawChat) {
            let errorHandler = useErrorHandle()

            try {
                let response = await api.post('/chats/create', chat)

                if (response.status == 201) {
                    this.chats.push(response.data)
                }
            } catch (error) {
                console.log(error)
                errorHandler.alertError(error)
            }
        },

        async sendMessage(message: RawMessage, chatId: string) {
            let errorHandler = useErrorHandle()

            try {
                const response = await api.post('/messages/send', message)

                if (response.status == 201) {
                    const chatIndex = this.chats.findIndex(chat => chatId == chat.id)

                    if (chatIndex == undefined) {
                        errorHandler.alertError("Error while sending message")
                        return false
                    }

                    this.chats[chatIndex].messages.push(response.data)
                }
            } catch (error) {
                console.log(error)
                errorHandler.alertError(error)
            }
        }
    }
})

export interface RawChat {
    title: string,
    type: 'group' | 'private'
}

export interface Chat extends RawChat {
    id: string,
    createdAt: string,
    updatedAt: string,
    messages: Message[]
}

export interface RawMessage {
    sender: string,
    senderEmail: string,
    receiver: string,
    sentAt: string,
    delivered: boolean,
    sent: boolean,
    replyTo: string,
    value: string,
    type: string
}

export interface Message extends RawMessage {
    id: string,
}

export interface PlainText extends Message{
    value: string,
}

export interface FileMsg {
    isText: boolean,
    text?: string
    value: Blob
}

export interface Gallery {
    isText: boolean,
    text?: string,
    images: Blob[]
}

