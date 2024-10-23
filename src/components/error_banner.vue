<template>

    <div v-if="errorHandle.error" id="error-banner" tabindex="-1" class="fixed z-50 flex flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
            <div class="flex items-center mb-2 border-gray-200 md:pe-4 md:mb-0 dark:border-gray-600" :class="{'md:border-e md:me-4': errorHandle.text}">
                <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-red-500" :class="{'mr-2': errorHandle.text}">Error:</span>
                <span class="text-red-400">{{ errorHandle.text }}</span> 
            </div>
            <p class="flex items-center text-sm font-normal text-red-500 dark:text-red-400">{{ errorHandle.message }}</p>
        </div>
        <div class="flex items-center flex-shrink-0">
            <button @click="errorHandle.closeError()" data-dismiss-target="#marketing-banner" type="button" class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close banner</span>
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { useErrorHandle } from '@/stores/error_handle';

    const errorHandle = useErrorHandle()
</script>