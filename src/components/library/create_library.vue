<template>
    <div class="p-6 space-y-4 md:space-y-3 sm:p-8 sm:w-72">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create Library
        </h1>
        <form @reset="resetForm" @submit.prevent="createLibrary" class="space-y-4 md:space-y-6" action="#">
            <div>
                <label for="library_name" class="block mb-2  font-medium text-gray-900 dark:text-white">Library name</label>
                <input v-model="libraryName" type="library_name" name="library_name" id="library_name" class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Physics" required>
            </div>
            <ul class="space-y-1">
                <li>
                    <div class="flex">
                        <div class="flex items-center h-5">
                            <input v-model="audience" id="public" name="audience" type="radio" value="public" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        </div>
                        <div class="ms-2">
                            <label for="public" class="font-medium text-gray-900 dark:text-gray-300">
                                <div>Public</div>
                                <p id="helper-public" class="text-xs font-normal text-gray-500 dark:text-gray-300">Anyone can see this library. You choose who can edit</p>
                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="flex">
                        <div class="flex items-center h-5">
                            <input v-model="audience" id="private" name="audience" type="radio" value="private" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        </div>
                        <div class="ms-2">
                            <label for="private" class="font-medium text-gray-900 dark:text-gray-300">
                                <div>Private</div>
                                <p id="helper-public" class="text-xs font-normal text-gray-500 dark:text-gray-300">You choose who can view and edit this library</p>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="space-y-2">
                <button ref="submitButton" type="submit" class="w-full font-bold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
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
        submitButton.value.innerText = "Creating..."
    } else {
        return
    }
    const library: RawLibrary = {
        audience: audience.value as 'private' | 'public',
        name: libraryName.value,
        owner: accountStore.user.email_address
    }

    await libraryStore.createLibrary(library)
    submitButton.value.innerText = "Create"
    resetForm()
}

const resetForm = ()=> {
    accountStore.switchBottomSheet(false, '')
    libraryStore.switchCreationState(false, '')
    creationAreaStore.switchCreationState(false, '')
}
</script>
