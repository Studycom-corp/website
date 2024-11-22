<template>
    <div>
        <div class="mb-4 text-gray-400">
            Sort by
        </div>
        <div class="flex items-center mb-4 justify-between flex-row-reverse">
            <input @change="accountStore.switchBottomSheet(false, '')" id="a_z" type="radio" value="" name="sort_folder" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="a_z" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A-Z</label>
        </div>
        <div class="flex items-center mb-4 justify-between flex-row-reverse">
            <input @change="accountStore.switchBottomSheet(false, '')" id="z_a" type="radio" value="" name="sort_folder" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="z_a" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Z-A</label>
        </div>
        <div class="flex items-center mb-4 justify-between flex-row-reverse">
            <input @change="accountStore.switchBottomSheet(false, '')" checked id="last_modified" type="radio" value="" name="sort_folder" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="last_modified" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Modified</label>
        </div>
        <div class="flex items-center mb-4 justify-between flex-row-reverse">
            <input @change="accountStore.switchBottomSheet(false, '')" id="first_modified" type="radio" value="" name="sort_folder" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="first_modified" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Modified</label>
        </div>
        <div class="flex items-center mb-4 justify-between flex-row-reverse">
            <input @change="accountStore.switchBottomSheet(false, '')" id="largest_first" type="radio" value="" name="sort_folder" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="largest_first" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Largest First</label>
        </div>
        <div class="flex items-center mb-4 justify-between flex-row-reverse">
            <input @change="accountStore.switchBottomSheet(false, '')" id="smallest_first" type="radio" value="" name="sort_folder" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="smallest_first" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Smallest First</label>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useAccountStore } from '@/stores/account';

    const accountStore = useAccountStore()
</script>