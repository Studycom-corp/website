<template>
    <ol class="flex items-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border-b border-b-gray-300 shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse overflow-x-auto no-scrollbar">
        <li @click="authStore.go('account')" class="flex items-center" :class="{'text-blue-600 dark:text-blue-500': authStore.current_step == 'account'}">
            <svg v-if="stepper_progress.includes('account')" class="cursor-pointer w-5 h-5  me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span v-else class="cursor-pointer flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0" :class="{'border-blue-600 dark:border-blue-500': authStore.current_step == 'account', 'border-gray-500 dark:border-gray-400': authStore.current_step != 'account'}">
                1
            </span>
            <span class="cursor-pointer">Account</span>
            <span class="hidden cursor-pointer sm:inline-flex sm:ms-2">Info</span>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>
        <li @click="authStore.go('personal')" class="flex items-center" :class="{'text-blue-600 dark:text-blue-500': authStore.current_step == 'personal'}">
            <svg v-if="stepper_progress.includes('personal')" class="cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span v-else class="cursor-pointer flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0" :class="{'border-blue-600 dark:border-blue-500': authStore.current_step == 'personal', 'border-gray-500 dark:border-gray-400': authStore.current_step != 'personal'}">
                2
            </span>
            <span class="cursor-pointer">Personal</span>
            <span class="hidden cursor-pointer sm:inline-flex sm:ms-2">Info</span>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>
        <li @click="authStore.go('preview')" class="flex items-center cursor-pointer" :class="{'text-blue-600 dark:text-blue-500': authStore.current_step == 'preview'}">
            <svg v-if="stepper_progress.includes('preview')" class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span v-else class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0" :class="{'border-blue-600 dark:border-blue-500': authStore.current_step == 'preview', 'border-gray-500 dark:border-gray-400': authStore.current_step != 'preview'}">
                3
            </span>
            Preview
        </li>
    </ol>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth';
    import { computed } from 'vue';

    let authStore = useAuthStore()
    let stepper_progress = computed(() => authStore.stepper_progress)
</script>

<style>
  /* Hide scrollbar for Chrome, Safari, and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>