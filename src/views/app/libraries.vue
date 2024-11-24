<template>
    <!--
        For every element that depends on the state of the 
        bottom sheet is  meant for preview on small screens only
    -->
    <div class="library h-full">
        <div class="library-header hidden sm:block">
            <header_layout this-page="library" helper-text="Create a Library" bottom-border is-create-btn :create-btn-function="libraryStore.switchCreationState" :args="[true, 'create_library']"/>
        </div>
        <div class="library-body sm:grid h-full relative">
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
                    <span @click="accountStore.switchBottomSheet(true, 'create_library')" class="text-blue-500 cursor-pointer hover:underline sm:hidden">Create one?</span>
                    <span @click="libraryStore.switchCreationState(true, 'create_library')" class="text-blue-500 cursor-pointer hover:underline hidden sm:inline">Create one?</span>
                </div>
            </div>

            <!-- library main section -->
            <div class="library-main h-full relative" :class="{'sm:grid': libraryStore.loadedLibrary, 'hidden sm:grid': !libraryStore.loadedLibrary}">

                <div class="flex sm:hidden justify-between items-center relative me-2">
                    <!-- 
                        Close library chevron button 
                        This only appears for small screens
                    -->
                    <div v-if="libraryStore.loadedLibrary" @click="loadRevert" class="w-min p-1 flex items-center">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
                        </svg>
                        <span class="text-lg">Back</span>
                    </div>

                    <div class="flex">
                        <!-- Sort button for folder content on small screens-->
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

                    <div v-if="!libraryStore.loadedFolder" class="flex justify-between items-center mt-3 px-2">
                        <span class="font-bold mr-2">Folders</span>
                        <div class="border-b border-b-slate-200 dark:border-b-slate-700 flex-1"></div>
                        <!-- Create folder icon -->
                        <!-- Provided UI for sm screens -->
                        <svg @click="accountStore.switchBottomSheet(true, 'create_folder')" class="w-6 h-6 ml-2 sm:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                        </svg>
                        <!-- Provided UI for large screens -->
                        <svg @click="libraryStore.switchCreationState(true, 'create_folder')" class="w-6 h-6 ml-2 hidden sm:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                        </svg>
                    </div>

                    <!-- "Create new" forms -->
                    <div v-if="accountStore.bottomSheet.source == 'create_folder'">
                        <teleport defer to='.bottom-sheet'>
                            <create_folder/>
                        </teleport>
                    </div>

                    <!-- Form display for large screens -->
                    <transition>
                        <div>
                            <!--
                                Shadow overlay to prevent interracting with items behind the form,
                                hence avoinding a persistent form accross libraries
                            -->
                            <div @click="libraryStore.switchCreationState(false, '')" class="fixed z-40 top-0 bottom-0 w-full" :class="{hidden: libraryStore.creationState.status == false, 'hidden sm:block': libraryStore.creationState.status}">
                            </div>
    
                            <!-- Actual form overla with in the main element of the library component -->
                            <div @click.stop.self="libraryStore.switchCreationState(false, '')" class="absolute z-50 top-0 bottom-0 w-full bg-gray-900 bg-opacity-55" :class="{hidden: libraryStore.creationState.status == false, 'hidden sm:block': libraryStore.creationState.status}">
                                <div class="h-full mt-10">
                                    <!-- Teleport target  for creation forms in library component on large screens-->
                                    <div class="library-create h-auto bg-gray-50 dark:bg-gray-900 w-max mx-auto rounded-lg border border-slate-600 overflow-hidden"></div>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <div class="bg-gray-900" v-if="libraryStore.creationState.source == 'create_folder'">
                        <teleport defer to='.library-create'>
                            <create_folder/>
                        </teleport>
                    </div>
                    
                    <!-- Create library on large screen -->
                    <div v-if="libraryStore.creationState.source == 'create_library'">
                        <teleport defer to='.library-create'>
                            <create_library/>
                        </teleport>
                    </div>

                    <!-- Create library on small screen -->
                    <div v-if="accountStore.bottomSheet.source == 'create_library'">
                        <teleport defer to='.bottom-sheet'>
                            <create_library/>
                        </teleport>
                    </div>

                    <!-- Upload file on small screen -->
                    <div v-if="libraryStore.creationState.source == 'upload_file'">
                        <teleport defer to='.library-create'>
                            <upload_file/>
                        </teleport>
                    </div>

                    <!-- Upload file on large screen -->
                    <div v-if="accountStore.bottomSheet.source == 'upload_file'">
                        <teleport defer to='.bottom-sheet'>
                            <upload_file/>
                        </teleport>
                    </div>

                </div>

                <!-- Display for user folders -->
                <div v-if="libraryStore.loadedLibrary" class="h-[84.9%] relative">
                    
                    <!-- List of folders when there's an open folder -->
                    <div v-if="libraryStore.loadedFolder" class="h-full block sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <ul class="px-2 py-1 hidden md:flex flex-col space-y-2 max-h-full overflow-y-auto tiny-scrollbar">
                            <li @click="loadFolder($event, folder.id, folder.name)" v-for="(folder, index) in libraryStore.loadedLibrary?.folders" :key="folder.id" class="space-x-2 cursor-pointer p-2.5 dark:bg-slate-800 bg-slate-200 rounded w-full relative" :class="{'border border-blue-500': libraryStore.loadedFolder?.id == folder.id}">
                                <folder :folder_id="folder.id"/>
                            </li>
                        </ul>

                        <!--Dispaly for loaded Folder files -->
                        <ul class="px-2 py-1 h-full sm:col-span-2 lg:col-span-3 overflow-y-auto auto-rows-min tiny-scrollbar" :class="{'flex flex-col mb:grid gap-2 mb:grid-cols-2 lg:grid-cols-3': libraryStore.loadedFolder.numberOfFiles > 0}">
                            <li v-if="libraryStore.loadedFolder.numberOfFiles > 0" v-for="(file, index) in libraryStore.files.filter(file => file.folder == libraryStore.loadedFolder?.id)" :key="index" class="space-x-2 cursor-pointer dark:bg-slate-800 bg-slate-200 rounded-md overflow-hidden w-full relative">
                                <file :file_id="file.id"/>
                            </li>
                            <div v-else class="h-full">
                                <!-- Provided UI for small screens -->
                                <div class="h-full sm:hidden flex flex-col items-center justify-center">
                                    <span>Oops, No files in here!</span>
                                    <span @click="accountStore.switchBottomSheet(true, 'upload_file')" class="text-blue-500 cursor-pointer hover:underline">Add one?</span>
                                </div>

                                <!-- Provided UI for large screens -->
                                <div class="h-full sm:flex flex-col items-center justify-center hidden">
                                    <span>Oops, No files in here!</span>
                                    <span @click="libraryStore.switchCreationState(true, 'upload_file')" class="text-blue-500 cursor-pointer hover:underline">Add one?</span>
                                </div>
                            </div>
                        </ul>
                    </div>

                    <!-- List of folders when no open folder-->
                    <ul v-if="libraryStore.loadedLibrary.folders.length > 0 && libraryStore.loadedFolder == undefined" class="px-2 pt-1 max-h-full overflow-y-auto tiny-scrollbar grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <!-- Folder display -->
                        <li @click="loadFolder($event, folder.id, folder.name)" v-for="(folder, index) in libraryStore.loadedLibrary?.folders" :key="folder.id" class="h-max space-x-2 cursor-pointer p-2.5 dark:bg-slate-800 bg-slate-200 rounded w-full relative" :class="{'border border-blue-500': libraryStore.loadedFolder?.id == folder.id}">
                            <folder :folder_id="folder.id"/>
                        </li>
                    </ul>

                    <!-- Display when user has not created any folders yet -->
                    <div v-if="libraryStore.loadedLibrary.folders.length == 0" class="h-full">
                        <!-- Provided UI for small screens -->
                        <div class="h-full sm:hidden flex flex-col items-center justify-center">
                            <span>No folders here yet!</span>
                            <span @click="accountStore.switchBottomSheet(true, 'create_folder')" class="text-blue-500 cursor-pointer hover:underline">Create one?</span>
                        </div>

                        <!-- Provided UI for large screens -->
                        <div class="h-full sm:flex flex-col items-center justify-center hidden">
                            <span>No folders here yet!</span>
                            <span @click="libraryStore.switchCreationState(true, 'create_folder')" class="text-blue-500 cursor-pointer hover:underline">Create one?</span>
                        </div>
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
    import file from '@/components/library/file.vue';
    import create_folder from '@/components/library/create_folder.vue';
    import create_library from '@/components/library/create_library.vue';
    import sort_options from '@/components/library/sort_options.vue';
    import upload_file from '@/components/library/upload_file.vue';
    import { useLibraryStore } from '@/stores/library';
    import { useAccountStore } from '@/stores/account';
    import { useBreadCrumb } from '@/stores/bread_cramb';

    const bread_cramb = useBreadCrumb()
    const libraryStore = useLibraryStore()
    const accountStore = useAccountStore()

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
    
    const loadFolder = (event: Event, target: string, folderName: string)=> {
        event.stopImmediatePropagation()
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

    const loadRevert = ()=> {
        if(libraryStore.loadedFolder){
            libraryStore.unloadFolder()
        } else {
            libraryStore.unloadLibrary()
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