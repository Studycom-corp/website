<template>
    <div @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" ref="bottomSheet" :class="{'hidden': !accountStore.bottomSheet.active, 'block sm:hidden': accountStore.bottomSheet.active}" class="absolute bottom-0 h-auto sm:hidden bg-gray-50 dark:bg-gray-900 w-full pt-2 rounded-t-2xl border-t border-t-gray-500 dark:border-t-gray-300">
        <div class="w-[30%] border-b-4 border-b-gray-400 m-auto rounded-full"></div>
        <div class="bottom-sheet p-4"></div>
    </div>
</template>

<script setup lang="ts">
    import { useAccountStore } from '@/stores/account';
    import { ref } from 'vue';

    const accountStore = useAccountStore()
    const bottomSheet = ref<HTMLDivElement | null>(null);

    // Touch positions
    const startY = ref(0);
    const currentY = ref(0);
    const deltaY = ref(0);

    const startDrag = (event: TouchEvent) => {
      const touch = event.touches[0];
      startY.value = touch.clientY;
      currentY.value = touch.clientY;
      deltaY.value = 0;
    };

    const drag = (event: TouchEvent) => {
      const touch = event.touches[0];
      currentY.value = touch.clientY;
      deltaY.value = currentY.value - startY.value;

      if (deltaY.value > 100) {
        // If dragged down sufficiently, close the bottom sheet
        
        accountStore.switchBottomSheet(false, '');
        if (bottomSheet.value) {
            bottomSheet.value.style.transform = `translateY(0)`;
        }
      }

      if (bottomSheet.value) {
        const newPosition = Math.max(0, deltaY.value);
        bottomSheet.value.style.transform = `translateY(${newPosition}px)`;
      }
    };

    const endDrag = () => {
      if (deltaY.value > 100) {
        // If dragged down sufficiently, close the bottom sheet
        accountStore.switchBottomSheet(false, '');
        if (bottomSheet.value) {
            bottomSheet.value.style.transform = `translateY(0)`;
        }
      } else {
        // Reset the position
        if (bottomSheet.value) {
          bottomSheet.value.style.transform = `translateY(0)`;
        }
      }
    };
</script>