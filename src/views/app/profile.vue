<template>
    <div class="profile h-full grid">
        <div class="header hidden sm:block">
            <header_layout this-page="profile"/>
        </div>
        <div class="profile-body block sm:grid h-full">
            <div class="profile-aside hidden sm:block w-56 h-full border-r dark:border-r-gray-600">
                <span @click="selectTab('general')" class="cursor-pointer p-3.5 flex items-center space-x-2 text-sm font-medium text-white" :class="{'bg-blue-500 dark:bg-blue-600': activeTab == 'general', 'hover:bg-gray-300 dark:hover:bg-gray-700': activeTab != 'general'}">
                    <svg  class="w-6 h-6" :class="{'text-gray-500 dark:text-gray-400': activeTab != 'general'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ms-3" :class="{'text-gray-600 dark:text-gray-400': activeTab != 'general'}">General</span>
                </span>
                <span @click="selectTab('spaces')" class="cursor-pointer p-3.5 flex items-center space-x-2 text-sm font-medium text-white" :class="{'bg-blue-500 dark:bg-blue-600': activeTab == 'spaces', 'hover:bg-gray-300 dark:hover:bg-gray-700': activeTab != 'spaces'}">
                    <svg class="w-6 h-6" :class="{'text-gray-500 dark:text-gray-400': activeTab != 'spaces'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ms-3" :class="{'text-gray-600 dark:text-gray-400': activeTab != 'spaces'}">Spaces</span>
                </span>
                <span @click="selectTab('libraries')" class="cursor-pointer p-3.5 flex items-center space-x-2 text-sm font-medium text-white" :class="{'bg-blue-500 dark:bg-blue-600': activeTab == 'libraries', 'hover:bg-gray-300 dark:hover:bg-gray-700': activeTab != 'libraries'}">
                    <svg class="w-6 h-6" :class="{'text-gray-500 dark:text-gray-400': activeTab != 'libraries'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ms-3" :class="{'text-gray-600 dark:text-gray-400': activeTab != 'libraries'}">Libraries</span>
                </span>
                <span @click="selectTab('channels')" class="cursor-pointer p-3.5 flex items-center space-x-2 text-sm font-medium text-white" :class="{'bg-blue-500 dark:bg-blue-600': activeTab == 'channels', 'hover:bg-gray-300 dark:hover:bg-gray-700': activeTab != 'channels'}">
                    <svg class="w-6 h-6" :class="{'text-gray-500 dark:text-gray-400': activeTab != 'channels'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5 6a3 3 0 1 1 4 2.83V10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8.83a3.001 3.001 0 1 1 2 0V10a3 3 0 0 1-3 3h-1v2.17a3.001 3.001 0 1 1-2 0V13h-1a3 3 0 0 1-3-3V8.83A3.001 3.001 0 0 1 5 6Z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ms-3" :class="{'text-gray-600 dark:text-gray-400': activeTab != 'channels'}">Channels</span>
                </span>
                <span @click="selectTab('posts')" class="cursor-pointer p-3.5 flex items-center space-x-2 text-sm font-medium text-white" :class="{'bg-blue-500 dark:bg-blue-600': activeTab == 'posts', 'hover:bg-gray-300 dark:hover:bg-gray-700': activeTab != 'posts'}">
                    <svg class="w-6 h-6" :class="{'text-gray-500 dark:text-gray-400': activeTab != 'posts'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
                    </svg>
                    <span class="ms-3" :class="{'text-gray-600 dark:text-gray-400': activeTab != 'posts'}">Posts</span>
                </span>
            </div>

            <!-- Profile main section -->
            <div class="profile-main h-full">
                <div class="sm:p-2 sm:mb-5 mb-10">
                    <div class="relative">
                        <div class="overflow-hidden h-28 sm:rounded-lg sm:border dark:border-gray-400">
                            <img src="/user1.webp" class="object-cover h-full w-full" alt="cover image">
                        </div>
                        <div class="absolute -bottom-9 sm:-bottom-5 left-6 z-20 w-20 h-20 sm:w-14 sm:h-14 overflow-hidden rounded-full sm:rounded-xl border-4 dark:border-gray-900">
                            <img src="/user1.webp" class="object-cover h-full w-full" alt="profile image">
                        </div>
                    </div>
                </div>
                <div>
                    <!-- Large screen -->
                    <div class="hidden sm:block">
                        <general v-if="activeTab == 'general'"/>
                        <posts v-if="activeTab == 'posts'"/>
                        <spaces v-if="activeTab == 'spaces'"/>
                        <libraries v-if="activeTab == 'libraries'"/>
                        <channels v-if="activeTab == 'channels'"/>
                    </div>

                    <!-- Small screen -->
                    <div class="sm:hidden space-y-2">
                        <general/>

                        <div class="sticky top-0 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                            <ul class="flex flex-wrap -mb-px">
                                <li class="me-2">
                                    <span @click="selectTab('spaces')" class="inline-block font-medium p-4 border-b-2 rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'spaces', 'border-transparent': activeTab != 'spaces'}">Spaces</span>
                                </li>
                                <li class="me-2">
                                    <span @click="selectTab('channels')" class="inline-block font-medium p-4 border-b-2  rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'channels', 'border-transparent': activeTab != 'channels'}">Channels</span>
                                </li>
                                <li class="me-2">
                                    <span @click="selectTab('libraries')" class="inline-block font-medium p-4 border-b-2 rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'libraries', 'border-transparent': activeTab != 'libraries'}">Libraries</span>
                                </li>
                                <li class="me-2">
                                    <span  @click="selectTab('posts')" class="inline-block font-medium p-4 border-b-2 rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'posts', 'border-transparent': activeTab != 'posts'}">Posts</span>
                                </li>
                            </ul>
                        </div>
                        <div class="p-2">
                            <spaces v-if="activeTab == 'spaces'"/>
                            <channels v-if="activeTab == 'channels'"/>
                            <libraries v-if="activeTab == 'libraries'"/>
                            <posts v-if="activeTab == 'posts'"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import header_layout from '@/components/header_layout.vue';
    import general from '@/components/profile/general.vue';
    import posts from '@/components/profile/posts.vue';
    import spaces from '@/components/profile/spaces.vue';
    import libraries from '@/components/profile/libraries.vue';
    import channels from '@/components/profile/channels.vue';

    import { useAccountStore } from '@/stores/account';
    import { useBreadCrumb } from '@/stores/bread_cramb';
    import { useProfileStore } from '@/stores/profile';
    import { computed } from 'vue';
    import { onMounted, ref } from 'vue';

    const accountStore = useAccountStore()
    const bread_cramb = useBreadCrumb()
    const profileStore = useProfileStore()
    const activeTab = computed(() => profileStore.active_tab)

    const selectTab = (target: string)=> {
        profileStore.activateTab(target)
        if (bread_cramb.level > 1) {
            bread_cramb.replace(target)
        } else {
            bread_cramb.push(target)
        }
    }

    onMounted(() => {
      if (bread_cramb.items[0] != 'profile') {
        bread_cramb.rebuild('profile')
        selectTab('general')
      }  
    })
</script>

<style scoped>
.profile{
    grid-template-columns: 100%;
    grid-template-rows: min-content 1fr;
    grid-template-areas: "header" "body";
}
.profile-body{
    grid-area: body;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 100%;
    grid-template-areas: "aside main";
}
.profile-aside{
    grid-area: aside;
}
.header{
    grid-area: header;
}
.profile-main{
    grid-area: main;
}
</style>