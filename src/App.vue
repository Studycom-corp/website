<template>
    <div class="h-screen font-serif bg-gray-50 dark:bg-gray-900 dark:text-white text-slate-800">
      <error_banner/>
      <RouterView />
      <transition>
        <bottom_sheet/>
      </transition>
    </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import error_banner from './components/error_banner.vue';
  import { onMounted } from 'vue';
  import { useAccountStore } from './stores/account';
  import bottom_sheet from './components/bottom_sheet.vue';

  const accountStore = useAccountStore()

  const checkUserTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      accountStore.toggleDarkMode('true')
    } else {
      accountStore.toggleDarkMode('false')
    }
  };

  const themeChangeListener = (event: MediaQueryListEvent) => {
    const mode = event.matches ? 'dark' : 'light';

    if (mode == 'dark') {
      accountStore.toggleDarkMode('true')
    } else {
      accountStore.toggleDarkMode('false')
    }
  };

  onMounted(() => {
    checkUserTheme(); 

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', themeChangeListener);
  });

</script>

<style>
.tiny-scrollbar{
  @apply scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
}

@layer {
  .scrollbar-rounded::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5rem;
  }
}
</style>