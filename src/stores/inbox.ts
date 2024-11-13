import { defineStore } from "pinia";
import { useErrorHandle } from "./error_handle";
import { api } from "@/router/api";

export const useInboxStore = defineStore('inbox', {
    state(){
        let loadedChat: Chat | undefined;
        let chats: Chat[] = [
            {
                id: "syf9wh923",
                createdAt: "23:45",
                updatedAt: "23:45",
                title: 'Ssenono',
                messages: [
                    {
                        id: "qdjzd92u4", sender: 'Aine', sent: true,
                        replyTo: "none", sentAt: '21:45', delivered: false,
                        receiver: "Ssenono", value: "Hello there", type: 'plain_text'
                    }
                ]
            },
            {
                id: "N9d9f8nco",
                createdAt: "23:40",
                updatedAt: "23:40",
                title: 'Robert',
                messages: [
                    {
                        id: "qdjzd92u4", sender: 'Aine', sent: true,
                        replyTo: "none", sentAt: '21:34', delivered: true,
                        receiver: "Robert", value: "Yoo! What's going on guy?", type: 'plain_text'
                    },
                    {
                        id: "NOSdw9e8", sender: 'Aine', sent: true, type: 'plain_text',
                        replyTo: "none", sentAt: '21:40', delivered: false,
                        receiver: "Robert", value: "I heard that you had left to Europe for Euro rust conference, Did you reach safely?"
                    },
                ]
            },
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

        activateList(target: 'private' | 'group') {
                this.activeList = target
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
    title: string
}

export interface Chat extends RawChat {
    id: string,
    createdAt: string,
    updatedAt: string,
    messages: Message[]
}

export interface RawMessage {
    sender: string,
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

