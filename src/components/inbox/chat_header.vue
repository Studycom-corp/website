<template>
    <nav class="shadow h-full">
        <div class="flex flex-wrap items-center justify-between mx-auto py-3 sm:px-3">
            <div class="flex items-center">
                <!-- Close chat arrow button -->
                <svg @click="inboxStore.unloadChat" class="w-6 h-10 sm:hidden text-lg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg>

                <div class="space-x-4 flex items-center">
                    <!-- Chat Dispaly photo -->
                    <div class="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-600">
                        <img src="/user1.webp" class="h-full w-full object-cover" alt="Flowbite Logo" />
                    </div>
    
                    <!-- Chat info -->
                    <div>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ loadedChat?.title }}</span>
                        <span class="block text-gray-500 font-light text-sm">Online</span>
                    </div>
                </div>
            </div>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                </li>
                <li>
                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

</template>

<script lang="ts" setup>
    import { useInboxStore } from '@/stores/inbox';
    import { computed } from 'vue';

    const inboxStore = useInboxStore()
    const loadedChat = computed(() => inboxStore.loadedChat)
</script>