<template>
    <div class="w-full flex flex-col space-y-1">
        <div class="flex justify-between w-full">
            <svg class="w-4 sm:w-6 h-4 sm:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
            </svg>

            <!-- Provided on UI for small screens -->
            <svg @click="accountStore.switchBottomSheet(true, 'upload_file')" class="w-4 sm:hidden sm:w-6 h-4 sm:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
            </svg>

            <!-- Provided on UI for large screens -->
            <svg @click="libraryStore.switchCreationState(true, 'upload_file')" class="w-4 hidden sm:inline sm:w-6 h-4 sm:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
            </svg>
        </div>
        <div>
            <span class="font-bold">{{ folder?.name }}</span>
            <div>
                <span v-if="folder?.numberOfFiles == 1" class="text-gray-500">{{ folder?.numberOfFiles }} file</span>
                <span v-else class="text-gray-500">{{ folder?.numberOfFiles }} files</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useLibraryStore, type Folder } from '@/stores/library';
    import { useAccountStore } from '@/stores/account';
    import { computed } from 'vue';

    const libraryStore = useLibraryStore()
    const accountStore = useAccountStore()

    const folderId = defineProps<{folder_id: string}>()
    const folder = computed(() => {
        const folderIndex = libraryStore.loadedLibrary?.folders.findIndex(folder => folder.id == folderId.folder_id)
        if (folderIndex != undefined) {
            return libraryStore.loadedLibrary?.folders[folderIndex]
        }

    })
    
</script>