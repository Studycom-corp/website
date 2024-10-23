<template>
    <div class="space-y-3 p-2 px-4">
        <div class="flex flex-col">
            <span class="font-bold text-lg">{{ user.full_name }}</span>
            <span class="font-light text-gray-500">@{{ user.user_name }}</span>
        </div>
        <div>
            <span class="font-bold text-lg">{{ user.email_address }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAccountStore } from '@/stores/account';
    import { computed } from 'vue';

    const accountStore = useAccountStore()
    const user = computed(() => accountStore.user)

</script>