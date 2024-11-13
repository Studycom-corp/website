<template>
    <div class="home h-full grid">
        <div class="home-header hidden sm:flex justify-between items-center sm:border-b dark:border-b-gray-600">
            <div>
                <div class="p-2 px-4">
                    <breadcramb/>
                </div>
                <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px">
                        <li class="me-2">
                            <span @click="selectTab('feed')" class="cursor-pointer font-semibold inline-block p-4 border-b-2 rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'feed', 'border-transparent dark:hover:text-white hover:text-slate-900': activeTab != 'feed'}">Feed</span>
                        </li>
                        <li class="me-2">
                            <span @click="selectTab('spaces')" class="cursor-pointer font-semibold inline-block p-4 border-b-2  rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'spaces', 'border-transparent dark:hover:text-white hover:text-slate-900': activeTab != 'spaces'}">Spaces</span>
                        </li>
                        <li class="me-2">
                            <span @click="selectTab('challenges')" class="cursor-pointer font-semibold inline-block p-4 border-b-2 rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'challenges', 'border-transparent dark:hover:text-white hover:text-slate-900': activeTab != 'challenges'}">Challenges</span>
                        </li>
                        <li class="me-2">
                            <span  @click="selectTab('notifications')" class="cursor-pointer font-semibold inline-block p-4 border-b-2 rounded-t-lg" :class="{'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab == 'notifications', 'border-transparent dark:hover:text-white hover:text-slate-900': activeTab != 'notifications'}">Notifications</span>
                        </li>
                    </ul>
                </div>
            </div>
            <button type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                <svg class="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>
                Create New
            </button>
        </div>
        <div class="home-body block sm:grid h-full">
            <div class="right-aside hidden sm:block w-72 h-full border-l dark:border-l-gray-600">
                <form class="w-[90%] m-auto mt-2">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search people or keywords..." required />
                    </div>
                </form>
            </div>

            <!-- home main section -->
            <div class="home-main h-full">
                <div class="hidden sm:block h-full overflow-y-auto">
                    <notifications v-if="activeTab == 'notifications'"/>
                    <feed v-if="activeTab == 'feed'"/>
                    <challenges v-if="activeTab == 'challenges'"/>
                    <spaces v-if="activeTab == 'spaces'"/>
                </div>
                <div class="h-full sm:hidden">
                    <feed/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import breadcramb from '@/components/breadcramb.vue';
    import notifications from './notifications.vue';
    import feed from '@/components/home/feed.vue'
    import challenges from '@/components/home/challenges.vue'
    import spaces from './spaces.vue';

    import { useHomeStore } from '@/stores/home'
    import { useBreadCrumb } from '@/stores/bread_cramb';
    import { computed } from 'vue';
    import { onMounted } from 'vue';

    const homeStore = useHomeStore()
    const bread_cramb = useBreadCrumb()
    const activeTab = computed(() => homeStore.active_tab)

    const selectTab = (target: string) => {
        homeStore.activateTab(target)
        if (bread_cramb.level > 1) {
            bread_cramb.replace(target)
        } else {
            bread_cramb.push(target)
        }
    }

    onMounted(() => {
      if (bread_cramb.items[0] != 'home') {
        bread_cramb.rebuild('home')
        selectTab('feed')
      }  

      homeStore.initializeEventListener()
    })
</script>

<style scoped>
.home{
    grid-template-columns: 100%;
    grid-template-rows: min-content 86%;
    grid-template-areas: "header" "body";
}
.home-body{
    grid-area: body;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 100%;
    grid-template-areas: "main aside";
}
.right-aside{
    grid-area: aside;
}
.home-header{
    grid-area: header;
}
.home-main{
    grid-area: main;
}
</style>