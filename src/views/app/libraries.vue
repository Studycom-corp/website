<template>
    <div class="library h-full">
        <div class="library-header hidden sm:block">
            <header_layout this-page="library" bottom-border is-create-btn/>
        </div>
        <div class="library-body block sm:grid h-full relative">
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

            <div class="libraries-list hidden sm:block w-72 h-full border-l dark:border-l-gray-600 overflow-y-auto tiny-scrollbar">
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
            <div class="library-main h-full">

                <!-- Filter tags for folders' content preview -->
                <div v-if="libraryStore.loadedLibrary" class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex -mb-px">
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

                <div v-if="libraryStore.loadedLibrary" class="h-full overflow-y-auto tiny-scrollbar">
                    <ul v-if="libraryStore.loadedLibrary.folders.length > 0" class="px-2 pt-1 grid">
                        <li v-for="(folder, index) in libraryStore.loadedLibrary?.folders" :key="folder.id" class="w-full flex ">
                            <folder :msg_id="folder.id"/>
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
    import { useLibraryStore } from '@/stores/library';
    import { useBreadCrumb } from '@/stores/bread_cramb';
    import { type Ref, ref, onMounted } from 'vue';

    const bread_cramb = useBreadCrumb()
    const libraryStore = useLibraryStore()
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
        if (libraryStore.activeFilter != undefined) {
            bread_cramb.push(libraryStore.activeFilter)
        }
    }

    const activateFilter = (target: string)=> {
        libraryStore.selectFilterTab(target)
        
        if (bread_cramb.level == 3) {
            bread_cramb.replace(target)
        } else if(bread_cramb.level == 2) {
            bread_cramb.push(target)
        } else {
            while (bread_cramb.level > 3) {
                bread_cramb.pop()
            }
            bread_cramb.replace(target)
        }
    }

    onMounted(() => {
      if (bread_cramb.items[0] != 'libraries') {
        bread_cramb.rebuild('libraries')
        if (libraryStore.loadedLibrary != undefined) {
            bread_cramb.push(libraryStore.loadedLibrary.name)
            if (libraryStore.activeFilter != undefined && libraryStore.loadedLibrary) {
                bread_cramb.push(libraryStore.activeFilter)
            }
        }
      }  
    })

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