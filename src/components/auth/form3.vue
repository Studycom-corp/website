<template>
    <form @submit.prevent="createAccount" class="space-y-4 md:space-y-6" action="#">
        <div class="grid gap-2 grid-cols-2">
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input v-model="form1.email_address" disabled type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
            </div>
            <div>
                <label for="profession" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profession</label>
                <input v-model="form2.profession" disabled type="text" name="profession" id="profession" placeholder="Your profession" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </div>

        <div class=" grid gap-2 grid-cols-2">
            <div>
                <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                <input v-model="full_name" disabled type="text" name="full_name" id="full_name" placeholder="Full name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
                <label for="user_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input v-model="form2.user_name" type="text" name="user_name" id="user_name" placeholder="Username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </div>

        <div>
            <label for="profile_photo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile photo</label>
            <div v-if="!form2.profile_photo" class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                </svg>
                <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">No photo provided</span>
            </div>
            <div v-else class="w-full h-24 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <img :src="form2.profile_photo.base64rep" alt="profile_image" class="object-contain h-full w-full">
            </div>
        </div>

        <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
    </form>
</template>

<script setup lang="ts">
    import type { Signup } from '@/stores/account';
    import { useAuthStore, type ProfilePhoto } from '@/stores/auth';
    import { useAccountStore } from '@/stores/account'
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const accountStore = useAccountStore()
    const router = useRouter()

    const form1 = computed(() => authStore.form1)
    const form2 = computed(() => authStore.form2)
    const full_name = ref(`${form2.value.first_name} ${form2.value.second_name}`)

    const createAccount = async () => {
        const user: Signup = {
            password: form1.value.password,
            full_name: full_name.value,
            email_address: form1.value.email_address,
            user_name: form2.value.user_name,
            profession: form2.value.profession,
            verified: false,
            profile_photo: form2.value.profile_photo as ProfilePhoto
        }

        const response = await accountStore.signup(user)
        if(response)
            router.push({name: 'verify_account'})
        
        authStore.clearForms()
    }

</script>