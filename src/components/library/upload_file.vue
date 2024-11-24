<template>
    <div class="p-6 space-y-4 md:space-y-3 sm:p-8 sm:w-[24rem]">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Upload File
        </h1>
        <form @reset="resetForm" @submit.prevent="createLibrary" class="space-y-4 md:space-y-6" action="#">
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden"/>
                </label>
            </div> 

            <div class="space-y-2">
                <button ref="submitButton" type="submit" class="w-full font-bold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
                <button type="reset" class="w-full border focus:outline-none border-orange-300 font-bold rounded-lg  px-5 py-2.5 text-center dark:border-orange-400">Discard</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { useCreationAreaStore } from '@/stores/creation_area';
import { useLibraryStore, type RawFolder, type RawLibrary } from '@/stores/library';
import { ref } from 'vue';

const accountStore = useAccountStore()
const libraryStore = useLibraryStore()
const creationAreaStore = useCreationAreaStore()
const submitButton = ref<HTMLButtonElement | undefined>()
const libraryName = ref('')
const audience = ref('')

const createLibrary = async()=> {
    if (submitButton.value) {
        submitButton.value.innerText = "Uploading..."
    } else {
        return
    }
    const library: RawLibrary = {
        audience: audience.value as 'private' | 'public',
        name: libraryName.value,
        owner: accountStore.user.email_address
    }

    await libraryStore.createLibrary(library)
    submitButton.value.innerText = "Upload"
    resetForm()
}

const resetForm = ()=> {
    accountStore.switchBottomSheet(false, '')
    libraryStore.switchCreationState(false, '')
    creationAreaStore.switchCreationState(false, '')
}
</script>
