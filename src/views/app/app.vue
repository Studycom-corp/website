<template>
    <div class="h-full" :class="{'inboxLayout': inboxStore.loadedChat, 'app-shell': !inboxStore.loadedChat}">
        <div class="side-bar sm:border-r border-gray-600" :class="{'hidden sm:block': inboxStore.loadedChat}">
            <div class="hidden sm:block h-full">
                <div v-if="!accountStore.drawer" class="h-full">
                    <sideBar/>
                </div>
                <div v-else class="h-full">
                    <drawer/>
                </div>
            </div>
            <div class="h-full sm:hidden">
                <div class="flex justify-between p-3 items-center bg-slate-300 dark:bg-gray-800 border-b dark:border-b-gray-600">

                    <!-- App header for small screens -->
                    <div class="flex space-x-3 items-center">
                        <svg @click="accountStore.toggleDrawer()" class="w-6 h-6 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
                        </svg>
                        <span class="font-bold text-lg capitalize">{{ accountStore.active_nav }}</span>
                    </div>
                    <div class="flex space-x-2 items-center">

                        <!-- Switch between group chats && private chats on small screen-->
                        <div v-if="$route.name == 'inbox'">
                            <svg @click="shuffle_sm_chatList" class="w-6 h-6 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16h13M4 16l4-4m-4 4 4 4M20 8H7m13 0-4 4m4-4-4-4"/>
                            </svg>
                        </div>

                        <!-- Toggle theme light/dark mode -->
                        <div>
                            <svg @click="accountStore.toggleDarkMode()" v-if="accountStore.darkMode" class="cursor-pointer w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                            </svg>
                            <svg @click="accountStore.toggleDarkMode()" v-else class="cursor-pointer w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="accountStore.drawer" class="h-full fixed top-0 left-0 bottom-0 z-50">
                    <mobileDrawer/>
                </div>
            </div>
        </div>
        <div class="main h-full overflow-hidden">
            <RouterView/>
        </div>
        <div class="footer sm:hidden" :class="{'hidden': inboxStore.loadedChat}">
            <mobileFooter/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import { ref } from 'vue';
    import { useAccountStore } from '@/stores/account'
    import sideBar from '@/components/sideBar.vue';
    import drawer from '@/components/drawer.vue';
    import mobileDrawer from '@/components/mobileDrawer.vue'
    import mobileFooter from '@/components/mobileFooter.vue';
    import { useInboxStore } from '@/stores/inbox';
import { useLibraryStore } from '@/stores/library';

    const accountStore = useAccountStore()
    const inboxStore = useInboxStore()
    const userAgent = navigator.userAgent
    const isDesktop = ref(false)

    if (/Mobile|Android|iP(hone|od)|IEMobile|Opera Mini/i.test(userAgent)) {
        isDesktop.value = false;
    }else if (/Tablet|iPad/i.test(userAgent)) {
        isDesktop.value = false;
    } else {
        isDesktop.value = true;
    }

    const shuffle_sm_chatList = ()=> {
        inboxStore.toogle_chatList()
    }

</script>

<style scoped>
@media (min-width: 640px) {
    .app-shell{
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: 100%;
        grid-template-areas: "sideBar main";
    }

    .inboxLayout {
        display: grid;
        grid-template-rows: 100%;
        grid-template-areas: "sideBar main";
        grid-template-columns: min-content 1fr;
    }
}
@media (max-width: 639px) {
    .app-shell{
        display: grid;
        grid-template-columns: 100%;
        grid-template-areas: "sideBar" "main" "footer";
        grid-template-rows: min-content 1fr auto;
    }

    .inboxLayout {
        display: grid;
        grid-template-columns: 100%;
        grid-template-areas: "sideBar" "main";
        grid-template-rows: min-content 1fr;
    }
}

.side-bar{
    grid-area: sideBar;
    height: 100%;
}
.main{
    grid-area: main;
    height: 100%;
}
.footer{
    grid-area: footer;
    height: 100%;
}

</style>