<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <span class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="/logo.svg" alt="logo">
                Studycom
            </span>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Verify your account
                    </h1>
                    <form @submit.prevent="verify" class="max-w-sm mx-auto">
                        <div class="flex mb-2 space-x-2 rtl:space-x-reverse">
                            <div>
                                <label for="code-1" class="sr-only">First code</label>
                                <input v-model="code[0]" type="text" maxlength="1" input-next="code-2" id="code-1" class="code_input block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            </div>
                            <div>
                                <label for="code-2" class="sr-only">Second code</label>
                                <input v-model="code[1]" type="text" maxlength="1" input-prev="code-1" input-next="code-3" id="code-2" class="code_input block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            </div>
                            <div>
                                <label for="code-3" class="sr-only">Third code</label>
                                <input v-model="code[2]" type="text" maxlength="1" input-prev="code-2" input-next="code-4" id="code-3" class="code_input block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            </div>
                            <div>
                                <label for="code-4" class="sr-only">Fourth code</label>
                                <input v-model="code[3]" type="text" maxlength="1" input-prev="code-3" input-next="code-5" id="code-4" class="code_input block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            </div>
                            <div>
                                <label for="code-5" class="sr-only">Fifth code</label>
                                <input v-model="code[4]" type="text" maxlength="1" input-prev="code-4" input-next="code-6" id="code-5" class="code_input block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            </div>
                            <div>
                                <label for="code-6" class="sr-only">Sixth code</label>
                                <input v-model="code[5]" type="text" maxlength="1" input-prev="code-5" id="code-6" class="code_input block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            </div>
                        </div>
                        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Please enter the 6 digit code we sent to {{ accountStore.user.email_address }}.</p>
                        <div class="mt-6 space-y-2">
                            <p v-if="reset_period > 0" id="resend" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Didn't receive code? <span class="text-blue-600">Resend in {{ reset_period }}s.</span></p>
                            <p v-else id="resend" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Didn't receive code? <button type="reset" @click="resendCode" class="ml-2 text-blue-600">Resend.</button></p>
                            <button type="submit" :disabled="code.length < 6" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
                            <button type="reset" @click="$router.push({name: 'signup'})" class="w-full text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-orange-600 bg-transparent hover:bg-orange-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, ref, type Ref } from 'vue';
    import { useAccountStore } from '@/stores/account';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useErrorHandle, type LocalError } from '@/stores/error_handle';

    const accountStore = useAccountStore()
    const router = useRouter()
    const errorHandle = useErrorHandle()

    const reset_period = computed(() => accountStore.reset_period)
    const code: Ref<string[]> = ref([])

    const verify = async ()=> {
        const finalCode = code.value.join('')

        if (accountStore.user.email_address.length < 1) {
            const error: LocalError = {
                message: 'No pending verification requirements',
                text: 'Forbidden'
            }

            errorHandle.alertError(error)
            router.push({name: 'home'})
            return
        }

        const response = await accountStore.verify_account(Number(finalCode), accountStore.user.email_address)

        if (response) {
            router.push({name: 'login'})
        }
        code.value = []
    }

    const resendCode = async() => {
        if (accountStore.user.email_address.length < 1) {
            const error: LocalError = {
                message: 'No pending verification requirements',
                text: 'Forbidden'
            }

            errorHandle.alertError(error)
            router.push({name: 'login'})
            return
        }

        await accountStore.requestResendCode(accountStore.user.email_address)
    }

    onMounted(() => {
        const code_inputs = document.querySelectorAll('.code_input')

        code_inputs.forEach((input, key) => {
            input.addEventListener('paste', (event) => {
                event.preventDefault()

                const clipboard = event as ClipboardEvent;
                let pastedData = clipboard.clipboardData?.getData('text') || ''
                code.value = []
                pastedData.split('').forEach(piece => {
                    code.value.push(piece)
                })
            })

            input.addEventListener('input', (event) => {
                event.preventDefault()

                if (code.value.length < 6) {
                    const thisEl = input as HTMLInputElement
                    const next = document.querySelector(`#${thisEl.getAttribute('input-next')}`) as HTMLInputElement
                    next.focus()
                } 
            })

            input.addEventListener('keydown', (event) => {
                const key_event = event as KeyboardEvent
                const thisEl = input as HTMLInputElement
                
                if (key_event.key == 'ArrowLeft' && key > 0) {
                    const prev = document.querySelector(`#${thisEl.getAttribute('input-prev')}`) as HTMLInputElement
                    prev.focus()
                } else if(key_event.key == 'ArrowRight' && key < 5){
                    const next = document.querySelector(`#${thisEl.getAttribute('input-next')}`) as HTMLInputElement
                    next.focus()
                }
            })
        })
    })
</script>