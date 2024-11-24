<template>
    <div class="w-full h-16 bg-slate-300 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
            <button @click="selectNav('home')" data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5">
                <svg class="w-7 h-8 mb-1" :class="{'text-slate-600 dark:text-gray-400': activeTab != 'home', 'text-blue-600': activeTab == 'home'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                <span class="sr-only">Home</span>
            </button>
            <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Home
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <button @click="selectNav('libraries')" type="button" class="inline-flex flex-col items-center justify-center px-5">
                <svg class="w-9 h-9 mb-1" :class="{'text-slate-600 dark:text-gray-400': activeTab != 'libraries', 'text-blue-600': activeTab == 'libraries'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z" clip-rule="evenodd"/>
                </svg>
                <span class="sr-only">Libraries</span>
            </button>
            <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Libraries
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <div @click="selectNav('create new')" class="flex items-center justify-center">
                <button data-tooltip-target="tooltip-new" type="button" :class="{'bg-blue-600': activeTab == 'create new', 'bg-slate-600 dark:bg-gray-400': activeTab != 'create new'}" class="inline-flex items-center justify-center w-10 h-10 font-medium  rounded-full">
                    <svg class="w-4 h-4 text-white dark:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span class="sr-only">New item</span>
                </button>
            </div>
            <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Create new item
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <button @click="selectNav('search')" data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5">
                <svg v-if="activeTab != 'search'" class="w-8 h-8 mb-1 text-slate-600 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
                <svg v-else class="w-8 h-8 mb-1 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"/>
                    <path fill-rule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z" clip-rule="evenodd"/>
                </svg>
                <span class="sr-only">Search</span>
            </button>
            <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Search
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <button @click="selectNav('profile')" type="button" class="inline-flex flex-col items-center justify-center px-5">
                <svg class="w-8 h-8 mb-1 overflow-hidden rounded-full" :class="{'text-slate-600 dark:text-gray-400': activeTab != 'profile', 'text-blue-600 dark:bg-white': activeTab == 'profile'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <span class="sr-only">Profile</span>
            </button>
            <div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Profile
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAccountStore } from '@/stores/account';
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';

    const accountStore = useAccountStore()
    const router = useRouter()
    const activeTab = computed(() => accountStore.active_nav)

    const selectNav = (target: string)=> {
        accountStore.activateNav(target)
        router.push({name: target})
    }
</script>

<style scoped>

</style>