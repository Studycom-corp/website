<template>
    <div class="library h-full">
        <div class="library-header hidden sm:block">
            <header_layout this-page="library" bottom-border is-create-btn/>
        </div>
        <div class="library-body sm:grid h-full relative">
            <div v-if="creationState" class="absolute z-20 top-4 w-full flex items-center justify-center">
                <div @click="toggleCreation(false, 'library')" class="h-16 w-16 flex justify-center items-center rounded-full bg-slate-700 bg-opacity-50">
                    <svg class="w-8 h-8 cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </div>
            </div>

            <div v-if="creationState" class="absolute z-10 top-0 bottom-0 w-full bg-black bg-opacity-40">
                <createForm :source="creationSource"/>
            </div>

            <div class="libraries-list w-full sm:w-72 h-full sm:border-l dark:border-l-gray-600 overflow-y-auto tiny-scrollbar" :class="{'sm:block': !libraryStore.loadedLibrary, 'hidden sm:block': libraryStore.loadedLibrary}">
                <ul v-if="libraryStore.libraries.length > 0" class="p-2 space-y-2">
                    <li @click="selectLibrary(library.id, library.name)" v-for="(library) in libraryStore.libraries" :key="library.id" class="flex space-x-2 cursor-pointer p-2.5 dark:bg-slate-800 bg-slate-200 rounded w-full relative" :class="{'border border-blue-500': libraryStore.loadedLibrary?.id == library.id}">
                        <div class="w-full flex flex-col items-start space-y-1">
                            <span class="font-bold text-md max-w-full truncate">{{ library.name }}</span>
                            <div class="flex space-x-4 w-full">
                                <span class="max-w-full truncate text-gray-500 text-sm font-light">{{ library.folders.length }} folders</span>
                                <span class="max-w-full truncate text-gray-500 text-sm font-light">{{ library.folders.length }} files</span>
                            </div>
                        </div>
                    </li>
                </ul>

                <div v-else class="h-full flex flex-col items-center justify-center">
                    <span>No library yet!</span>
                    <span @click="toggleCreation(true, 'library')" class="text-blue-500 cursor-pointer hover:underline">Create one?</span>
                </div>
            </div>

            <!-- library main section -->
            <div class="library-main h-full" :class="{'sm:grid': libraryStore.loadedLibrary, 'hidden sm:grid': !libraryStore.loadedLibrary}">

                <div class="flex sm:hidden justify-between items-center relative me-2">
                    <!-- Close library chevron button -->
                    <div v-if="libraryStore.loadedLibrary" @click="libraryStore.unloadLibrary" class="w-min p-1 flex items-center">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
                        </svg>
                        <span class="text-lg">Back</span>
                    </div>

                    <div class="flex">
                        <!-- Sort folder content on small screens-->
                        <svg @click="accountStore.switchBottomSheet(true, 'sort_folders')" class="w-6 h-6 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="1" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/>
                        </svg>

                        <div v-if="accountStore.bottomSheet.source == 'sort_folders'">
                            <teleport defer to='.bottom-sheet'>
                                <sort_options/>
                            </teleport> 
                        </div>
                    </div>
                </div>

                <div>
                    <!-- Filter tags for folders' content preview on large screens-->
                    <div v-if="libraryStore.loadedFolder" class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul class="flex -mb-px overflow-x-auto scrollbar-none">
                            <li>
                                <span @click="activateFilter('all')" class="inline-block p-4 border-b-2 cursor-pointer rounded-t-lg" :class="{'activeFilter': libraryStore.activeFilter == 'all', 'inactiveFilter': libraryStore.activeFilter != 'all'}">All</span>
                            </li>
                            <li>
                                <span @click="activateFilter('videos')" class="inline-block p-4 border-b-2 cursor-pointer rounded-t-lg" :class="{'activeFilter': libraryStore.activeFilter == 'videos', 'inactiveFilter': libraryStore.activeFilter != 'videos'}">Videos</span>
                            </li>
                            <li>
                                <span @click="activateFilter('images')" class="inline-block p-4 border-b-2 cursor-pointer rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" :class="{'activeFilter': libraryStore.activeFilter == 'images', 'inactiveFilter': libraryStore.activeFilter != 'images'}">Images</span>
                            </li>
                            <li>
                                <span @click="activateFilter('documents')" class="inline-block p-4 border-b-2 cursor-pointer rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" :class="{'activeFilter': libraryStore.activeFilter == 'documents', 'inactiveFilter': libraryStore.activeFilter != 'documents'}">Documents</span>
                            </li>
                            <li>
                                <span @click="activateFilter('archives')" class="inline-block p-4 border-b-2 cursor-pointer rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" :class="{'activeFilter': libraryStore.activeFilter == 'archives', 'inactiveFilter': libraryStore.activeFilter != 'archives'}">Archives</span>
                            </li>
                            <li>
                                <span @click="activateFilter('trash')" class="inline-block p-4 border-b-2 cursor-pointer rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" :class="{'activeFilter': libraryStore.activeFilter == 'trash', 'inactiveFilter': libraryStore.activeFilter != 'trash'}">Trash</span>
                            </li>
                        </ul>
                    </div>

                    <div class="flex justify-between items-center mt-3 px-2">
                        <span class="font-bold mr-2">Folders</span>
                        <div class="border-b border-b-slate-200 dark:border-b-slate-700 flex-1"></div>
                        <svg class="w-6 h-6 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                </div>

                <div v-if="libraryStore.loadedLibrary" class="h-full overflow-y-auto tiny-scrollbar relative">
                    
                    <ul v-if="libraryStore.loadedLibrary.folders.length > 0" class="px-2 pt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        <!-- Folder display -->
                        <li @click="loadFolder(folder.id, folder.name)" v-for="(folder, index) in libraryStore.loadedLibrary?.folders" :key="folder.id" class="space-x-2 cursor-pointer p-2.5 dark:bg-slate-800 bg-slate-200 rounded w-full relative" :class="{'border border-blue-500': libraryStore.loadedFolder?.id == folder.id}">
                            <folder :folder_id="folder.id"/>
                        </li>
                    </ul>
                    <div v-else class="h-full flex flex-col items-center justify-center">
                        <span>No folders here yet!</span>
                        <span @click="toggleCreation(true, 'folder')" class="text-blue-500 cursor-pointer hover:underline">Create one?</span>
                    </div>
                </div>
                <div v-else class="h-full flex items-center justify-center">
                    <span>Select library from right list to preview content</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import header_layout from '@/components/header_layout.vue';
    import folder from '@/components/library/folder.vue'
    import createForm from '@/components/library/create_form.vue'
    import sort_options from '@/components/library/sort_options.vue';
    import { useLibraryStore } from '@/stores/library';
    import { useAccountStore } from '@/stores/account';
    import { useBreadCrumb } from '@/stores/bread_cramb';
    import { type Ref, ref } from 'vue';

    const bread_cramb = useBreadCrumb()
    const libraryStore = useLibraryStore()
    const accountStore = useAccountStore()

    const creationState: Ref<boolean> = ref(false)
    const creationSource: Ref<string> = ref('library')

    const toggleCreation = (action: boolean, source: 'library' | 'folder')=> {
        creationState.value = action
        creationSource.value = source
    }

    const selectLibrary = (libId: string, libName: string)=> {
        libraryStore.loadLibrary(libId)
        if (bread_cramb.level == 2) {
            bread_cramb.replace(libName)
        } else if(bread_cramb.level == 1) {
            bread_cramb.push(libName)
        } else {
            while (bread_cramb.level > 2) {
                bread_cramb.pop()
            }
            bread_cramb.replace(libName)
        }
        if (libraryStore.loadedFolder != undefined) {
            libraryStore.unloadFolder()
        }
    }

    const activateFilter = (target: string)=> {
        libraryStore.selectFilterTab(target)
        
        if (bread_cramb.level == 4) {
            bread_cramb.replace(target)
        } else if(bread_cramb.level == 3) {
            bread_cramb.push(target)
        } else {
            while (bread_cramb.level > 4) {
                bread_cramb.pop()
            }
            bread_cramb.replace(target)
        }
    }
    
    const loadFolder = (target: string, folderName: string)=> {
        libraryStore.loadFolder(target)
        
        if (bread_cramb.level == 3) {
            bread_cramb.replace(folderName)
        } else if(bread_cramb.level == 2) {
            bread_cramb.push(folderName)
        } else {
            while (bread_cramb.level > 3) {
                bread_cramb.pop()
            }
            bread_cramb.replace(folderName)
        }

        if (libraryStore.activeFilter != undefined) {
            bread_cramb.push(libraryStore.activeFilter)
        }
    }
</script>

<style scoped>
.library{
    grid-template-columns: 100%;
    grid-template-rows: min-content 1fr;
    grid-template-areas: "header" "body";
}
.library-body{
    grid-area: body;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 100%;
    grid-template-areas: "main chats";
}
.libraries-list{
    grid-area: chats;
}
.library-header{
    grid-area: header;
}
.library-main{
    grid-area: main;
    grid-template-columns: 100%;
    grid-template-rows: min-content 1fr auto;
    grid-template-areas: "chat_header" "messages" "text_area";
}
.activeFilter{
    @apply text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
}
.inactiveFilter {
    @apply border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300
}
</style>