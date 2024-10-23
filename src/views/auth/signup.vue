<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <span @click="$router.push({name: 'index'})" class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="/logo.svg" alt="logo">
                Studycom
            </span>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>

                    <!-- Stepper -->
                    <stepper/>

                    <!-- Forms -->
                    <form1 v-if="authStore.current_step == 'account'"/>
                    <form2 v-if="authStore.current_step == 'personal'"/>
                    <form3 v-if="authStore.current_step == 'preview'"/>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import stepper from '@/components/auth/stepper.vue';
    import form1 from '@/components/auth/form1.vue';
    import form2 from '@/components/auth/form2.vue';
    import form3 from '@/components/auth/form3.vue';

    import { useAuthStore } from '@/stores/auth';

    let authStore = useAuthStore()
</script>