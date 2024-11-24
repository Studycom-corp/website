<template>
    <!-- 
        A component specific to small screen user for creating content 
        That is, new library, space, challenges, channels
    -->
    <div class="h-full">
        <div v-if="creationAreaStore.creationState.status == false" class="h-full grid grid-rows-2 gap-3 p-4">
            <div class="h-full">

            </div>
            <div class="h-full overflow-y-auto tiny-scrollbar p-2 rounded-lg w-[98%] mx-auto shadow-lg border dark:border-slate-950 border-gray-300 bg-gray-200 dark:bg-slate-900">
                <span class="mb-4 inline-block">Start with creating a:</span>
                <div class="grid grid-cols-3 gap-2">
                    <div @click="creationAreaStore.switchCreationState(true, 'create_library')">
                        <create_lib_btn/>
                    </div>
                    <div @click="creationAreaStore.switchCreationState(true, 'create_channel')">
                        <create_channel_btn/>
                    </div>
                    <div @click="creationAreaStore.switchCreationState(true, 'create_space')">
                        <create_space_btn/>
                    </div>
                    <div @click="creationAreaStore.switchCreationState(true, 'create_challenge')">
                        <create_challenge_btn/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="h-full">
            <span @click="creationAreaStore.switchCreationState(false, '')" class="block px-4 pt-3">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                </svg>
            </span>
            
            <create_library v-if="creationAreaStore.creationState.source == 'create_library'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import create_lib_btn from '@/components/createglobals/create_lib_btn.vue';
import create_challenge_btn from '@/components/createglobals/create_challenge_btn.vue';
import create_channel_btn from '@/components/createglobals/create_channel_btn.vue';
import create_space_btn from '@/components/createglobals/create_space_btn.vue';
import create_library from '@/components/library/create_library.vue';
import { useCreationAreaStore } from '@/stores/creation_area';

const creationAreaStore = useCreationAreaStore()
</script>