<template>
    <div class="w-full flex items-center justify-between px-3 py-3 border-b-gray-600" :class="{'border-b': bottomBorder}">
        <div>
            <breadcramb/>
            <span class="font-bold text-lg capitalize mt-3 block">{{ thisPage }}</span>
        </div>
        <button v-if="isCreateBtn" @click="createBtnFunction?.(...args ?? [])" type="button" class="text-white bg-blue-500 hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
            <svg class="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
            </svg>
            {{ helperText }}
        </button>
        <span v-else></span>
    </div>
</template>

<script setup lang="ts">
    import breadcramb from './breadcramb.vue';

    defineProps<{isCreateBtn?: boolean, helperText: string, thisPage: string, bottomBorder?: boolean, createBtnFunction?: (...args: any)=>void, args?: any[]}>()
</script>