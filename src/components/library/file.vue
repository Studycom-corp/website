<template>
    <div class="flex items-center space-x-2 rounded-md p-1">
        <img class="w-8 h-8 rounded" src="" :alt="file?.name">
        <div class="flex-grow">
            <span class="block text-gray-800 font-bold text-sm truncate max-w-full">{{ file?.name }}</span>
            <div class="flex items-end justify-between">
                <div class="text-gray-400 text-xs space-x-2">
                    <span>{{ file?.createdAt }}</span>
                </div>
                <div class="text-xs text-gray-500 uppercase">
                    {{ file?.size }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useLibraryStore, type Folder } from '@/stores/library';
    import { computed } from 'vue';

    const libraryStore = useLibraryStore()
    const fileId = defineProps<{file_id: string}>()
    const file = computed(() => {
        const fileIndex = libraryStore.files.findIndex(file => file.id == fileId.file_id)
        if (fileIndex != undefined) {
            return libraryStore.files[fileIndex]
        }

    })
    
</script>