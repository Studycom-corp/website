<template>
    <form @submit.prevent="persitForm" class="sm:grid grid-cols-2 gap-2 space-y-4 sm:space-y-0" action="#">
        <div class="col-span-2 mb-4 md:mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input v-model="email_address" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input @input="passwordVerify" v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input @input="passwordComfirmation" v-model="password_confirm" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <p v-if="form_error.on" class="col-span-2 mt-2 text-sm text-red-600 dark:text-red-500 mb-4 md:mb-6">{{ form_error.error }}</p>
        
        <div class="col-span-2 flex justify-between items-end" :class="{'mt-4 md:mt-6': !form_error.on}">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input v-model="TAC" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
                </div>
                <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                </div>
            </div>
            <button type="submit" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
        </div>

        <p class="col-span-2 text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <span @click="$router.push({name: 'login'})" class="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</span>
        </p>
    </form>
</template>

<script setup lang="ts">
    import { useAuthStore, type Form1 } from '@/stores/auth';
import { onMounted, ref } from 'vue';

    const authStore = useAuthStore()
    const password = ref('')
    const password_confirm = ref('')
    const email_address = ref('')
    const TAC = ref(false)
    const form_error = ref({on: false, error: ''})

    const passwordComfirmation = () => {
        if(password.value !== password_confirm.value){
            form_error.value = {on: true, error: `Doesn't match password`}
        } else {
            form_error.value = {on: false, error: ''}
        }
    }

    const passwordVerify = () => {
        if (password.value.length < 5) {
            form_error.value = {on: true, error: `Password should at least be 5 characters`}
        } else {
            form_error.value = {on: false, error: ''}
        }
    }

    onMounted(() => {
        const form1 = authStore.form1
        password.value = form1.password
        password_confirm.value = form1.password_confirm
        email_address.value = form1.email_address,
        TAC.value = form1.terms
    })

    const persitForm = () => {
        passwordVerify()
        if(!form_error.value.on){
            passwordComfirmation()
        }

        const form1: Form1 = {
            password: password.value,
            password_confirm: password_confirm.value,
            email_address: email_address.value,
            terms: TAC.value
        }

        if(!form_error.value.on)
            authStore.persistForm('form1', form1)
    }
</script>