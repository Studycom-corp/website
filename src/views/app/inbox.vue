<template>
    <div class="inbox h-full">
        <div class="inbox-body sm:grid h-full">
            <div class="chat-list relative w-full sm:w-72 h-full sm:border-l dark:border-l-gray-600 overflow-y-auto tiny-scrollbar" :class="{'sm:block': !inboxStore.loadedChat, 'hidden sm:block': inboxStore.loadedChat}">

                <!-- Large screen filter tabs for chats (private/group) -->
                <!-- Only visible for large screen -->
                <ul class="hidden sm:flex sticky top-0 z-20 dark:bg-gray-900 items-stretch flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li @click="inboxStore.activateList('private')" class="w-[50%] cursor-pointer p-4" :class="{'activeChatList': inboxStore.activeList == 'private', 'inactiveChatList' : inboxStore.activeList != 'privte'}">
                        <span>Private</span>
                    </li>
                    <li @click="inboxStore.activateList('group')" class="w-[50%] cursor-pointer p-4" :class="{'activeChatList': inboxStore.activeList == 'group', 'inactiveChatList' : inboxStore.activeList != 'group'}">
                        <span>Group</span>
                    </li>
                </ul>

                <!-- Chats list for both small and large screens -->
                <ul v-if="inboxStore.chats.length > 0" class="p-2 space-y-2">
                    <li @click="inboxStore.loadChat(chat.id)" v-for="(chat) in inboxStore.chats.filter(chat => chat.type == inboxStore.activeList)" :key="chat.id" class="flex space-x-2 cursor-pointer p-2.5 bg-slate-200 dark:bg-slate-800 rounded w-full relative" :class="{'border border-blue-500': inboxStore.loadedChat?.id == chat.id}">
                        <div class="w-10 h-10 overflow-hidden rounded-full">
                            <img src="/user1.webp" alt="counterpart" class="w-ful h-full object-cover">
                        </div>
                        <div class="w-[81%] flex flex-col items-start">
                            <span class="font-bold text-md max-w-full truncate">{{ chat.title }}</span>
                            <span class="max-w-full truncate text-gray-500 text-sm font-light">{{ chat.messages[chat.messages.length-1]?.value }}</span>
                        </div>
                        <span class="absolute right-1 bottom-0 font-thin text-xs">{{ chat.messages[chat.messages.length-1]?.sentAt }}</span>
                    </li>
                </ul>

                <div v-else class="h-full flex items-center justify-center">
                    <span>No chats yet!</span>
                </div>
            </div>

            <!-- inbox main section -->
            <!-- Displays only if there's a selected chat for small screens(mobile) -->
            <div v-if="inboxStore.loadedChat" class="inbox-main h-full" :class="{'grid': inboxStore.loadedChat, 'hidden sm:grid': !inboxStore.loadedChat}">
                <div class="chat-header">
                    <chat_header/>
                </div>
                <div v-if="inboxStore.loadedChat.messages.length > 0" class="messages overflow-y-auto tiny-scrollbar">
                    <ul class="px-2 pt-1">
                        <li v-for="(message, index) in inboxStore.loadedChat?.messages" :key="message.id" class="w-full flex" :class="{'justify-end': message.senderEmail == accountStore.user.email_address}">
                            <message :msg_id="message.id"/>
                        </li>
                    </ul>
                </div>              
                <div v-else class="flex flex-col justify-center items-center h-[85%]">
                    <span>One word leads to another</span>
                    <span>Write that word in text area below...</span>
                </div>
                <div class="text-area">
                    <text_area/>
                </div>  
            </div>
            <div v-else class="h-full flex flex-col items-center justify-center">
                <span>No open chat!</span>
                <span>Select chat from right list to preview messages</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import chat_header from '@/components/inbox/chat_header.vue'
    import text_area from '@/components/inbox/text_area.vue'
    import message from '@/components/inbox/message.vue'

    import { useInboxStore } from '@/stores/inbox';
    import { useAccountStore } from '@/stores/account';

    const inboxStore = useInboxStore()
    const accountStore = useAccountStore()

</script>

<style scoped>
.inbox-body{
    grid-area: body;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 100%;
    grid-template-areas: "main chats";
}
.chat-list{
    grid-area: chats;
}
.inbox-header{
    grid-area: header;
}
.inbox-main{
    grid-area: main;
    grid-template-columns: 100%;
    grid-template-rows: min-content 1fr auto;
    grid-template-areas: "chat_header" "messages" "text_area";
}

.messages {
    grid-area: messages;
}
.chat-header {
    grid-area: chat_header;
}
.text-area{
    grid-area: text_area;
}

.activeChatList {
    @apply text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500
}
.inactiveChatList {
    @apply inline-block hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300
}
</style>