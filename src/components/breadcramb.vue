<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
                <span class="capitalize inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    {{ bread_cramb.items[0] }}
                </span>
            </li>
            <li v-if="bread_cramb.level > 2" v-for="(level, index) in bread_cramb.items.slice(1, bread_cramb.items.length-2)" :key="index">
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="ms-1 capitalize text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                        {{ level }}
                    </span>
                </div>
            </li>
            <li v-if="bread_cramb.level > 1" aria-current="page">
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="ms-1 capitalize text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{{ bread_cramb.items[bread_cramb.items.length-1] }}</span>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
    import { useBreadCrumb } from '@/stores/bread_cramb';

    const bread_cramb = useBreadCrumb()
</script>