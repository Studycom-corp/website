<template>
    <div class="flex items-start mb-1 gap-2.5 max-w-[70%]" :class="{'mb-4': inboxStore.loadedChat?.messages[messageIndex+1]?.sender != message?.sender}">
        <!-- Message sender Dispaly photo -->
        <img v-if="inboxStore.loadedChat?.type == 'group' && message?.senderEmail != accountStore.user.email_address && inboxStore.loadedChat.messages[messageIndex-1]?.sender != message?.sender" class="w-8 h-8 rounded-full" src="/user1.webp" alt="Jese image">
        <div v-if="inboxStore.loadedChat.messages[messageIndex-1]?.sender == message?.sender" class="w-8 h-8"></div>
        
        <div class="flex flex-col w-full max-w-full leading-1.5 relative">
            <div v-if="inboxStore.loadedChat.messages[messageIndex-1]?.sender != message?.sender" class="flex items-center justify-between rtl:space-x-reverse">
                <span v-if="inboxStore.loadedChat?.type == 'group' && message?.senderEmail != accountStore.user.email_address" class="text-sm text-gray-900 dark:text-white">{{ message?.sender }}</span>
                <span v-if="message?.senderEmail == accountStore.user.email_address"></span>
                <span class="text-xs text-gray-500 dark:text-gray-400 font-light">{{ message?.sentAt }}</span>
            </div>

            <div class="flex w-full" :class="{'flex-row-reverse':message?.senderEmail == accountStore.user.email_address}">
                <div class="p-2 py-1 w-full relative border border-slate-300 dark:border-slate-700 rounded-md" :class="{'pb-2': inboxStore.loadedChat?.messages[messageIndex-1]?.sender == message?.sender}">
                    <span v-if="inboxStore.loadedChat.messages[messageIndex-1]?.sender == message?.sender" class="text-xs text-gray-500 dark:text-gray-400 font-light absolute bottom-0 right-0">{{ message?.sentAt }}</span>

                    <!-- Message area -->

                    <voice_note v-if="message?.type == 'voice'"/>
                    <span v-if="message?.type == 'plain_text'" class=" font-serif leading-tight">{{ message.value }}</span>
                    <span v-if="message?.senderEmail == accountStore.user.email_address" class="flex w-2 h-2 me-3  rounded-full absolute -top-0.5 -left-0.5" :class="{'bg-red-500': message?.sent == false, 'bg-orange-500': message?.sent == true && message.delivered != true, 'bg-green-500': message?.sent == true && message.delivered == true}"></span>
                </div>

                <button @mouseover="showActionBox(msg_id)" class="hidden flex-shrink-0 sm:inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                    </svg>
                </button>
            </div>
            <div v-if="actionBox == msg_id" @mouseleave="showActionBox('none')" id="dropdownDots" :class="{'-right-32': message?.senderEmail != accountStore.user.email_address, '-left-32': message?.senderEmail == accountStore.user.email_address, 'top-5': inboxStore.loadedChat?.messages[messageIndex-1]?.sender != message?.sender}" class="absolute z-10 bg-slate-200 border border-slate-300 divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-slate-800 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, type Ref  } from 'vue';
    import voice_note from './voice_note.vue';
    import { useInboxStore, type Message } from '@/stores/inbox';
    import { useAccountStore } from '@/stores/account';

    const inboxStore = useInboxStore()
    const accountStore = useAccountStore()
    const messageIndex = ref(0)

    const props = defineProps<{msg_id: string}>()
    const message = computed(() => {
        const target = inboxStore.loadedChat?.messages.findIndex(msg => msg.id == props.msg_id)
        if(target != undefined){
            messageIndex.value = target
            return inboxStore.loadedChat?.messages[target]
        }
    })
    const actionBox: Ref<string> = ref('none')

    // Activator for action options specific to target message component
    const showActionBox = (source: string)=> {
        actionBox.value = source
    }
</script>