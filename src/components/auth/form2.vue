<template>
  <form @submit.prevent="persitForm" class="space-y-4" action="#">
    <div class="grid gap-2 grid-cols-2">
      <div>
        <label for="fName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >First name</label
        >
        <input
          @input="reportEditing('actual_name')"
          @focusout="dropEditing"
          v-model="first_name"
          type="text"
          name="fName"
          id="fName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="First name e.g John"
          required
        />
      </div>
      <div>
        <label for="sName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Second name</label
        >
        <input
          @input="reportEditing('actual_name')"
          @focusout="dropEditing"
          v-model="second_name"
          type="text"
          name="sName"
          id="sName"
          placeholder="Second name e.g Doe"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <p
        v-if="editing.source == 'actual_name'"
        class="col-span-2 text-sm text-red-600 dark:text-red-500"
      >
        First and second name aren't automatically public
      </p>
    </div>

    <div class="grid gap-2 grid-cols-2">
      <div>
        <label for="user_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User name</label
        >
        <input
          @input="reportEditing('user_name')"
          @focusout="dropEditing"
          v-model="user_name"
          type="text"
          name="user_name"
          id="user_name"
          placeholder="e.g Johndoe, seen as @Johndoe"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label for="profession" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Profession</label
        >
        <input
          v-model="profession"
          type="text"
          name="profession"
          id="profession"
          placeholder="e.g Student/Chemist"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <p
        v-if="editing.source == 'user_name'"
        class="col-span-2 text-sm text-red-600 dark:text-red-500"
      >
        User name is your public identity
      </p>
    </div>

    <div v-if="device_type() != 'mobile'">
      <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Profile photo</span
      >
      <label
        v-if="profile_image == undefined"
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 my-2 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
            <span class="font-semibold">profile photo</span>
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          v-on:change="uploadFile"
          id="dropzone-file"
          type="file"
          class="hidden"
          accept="image/*"
        />
      </label>

      <div
        v-else
        class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <svg
          class="w-8 h-8 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Photo selected</span>
      </div>
    </div>

    <div v-else>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size"
        >Profile photo</label
      >
      <input
        v-on:change="uploadFile"
        accept="image/*"
        class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="small_size"
        type="file"
      />
    </div>

    <div class="col-span-2 flex justify-end" :class="{ 'mt-4 md:mt-6': !editing.on }">
      <button
        type="submit"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Next
      </button>
    </div>

    <p class="col-span-2 text-sm font-light text-gray-500 dark:text-gray-400">
      Already have an account?
      <span
        @click="$router.push({ name: 'login' })"
        class="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
        >Login here</span
      >
    </p>
  </form>
</template>

<script setup lang="ts">
    import { useAuthStore, type Form2, type ProfilePhoto } from '@/stores/auth';
    import { useErrorHandle, type LocalError } from '@/stores/error_handle';
    import type { Ref } from 'vue';
    import { computed, onMounted, ref } from 'vue';

    const authStore = useAuthStore()
    const errorHandle = useErrorHandle()

    const first_name = ref('')
    const second_name = ref('')
    const user_name = ref('')
    const profession = ref('')
    const profile_image: Ref<ProfilePhoto | undefined> = ref(undefined)
    const editing = ref({on: false, source: ''})
    const device_type = () => {
        const userAgent = navigator.userAgent
        if(/mobile/i.test(userAgent)){
            return "mobile"
        }
    }

    const reportEditing = (source: string) => {
        editing.value = {on: true, source}
    }

    const dropEditing = ()=> {
        editing.value = {on: false, source: ''}
    }

    const uploadFile = (event: Event)=> {
        const file = (event.target as HTMLInputElement)?.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = ()=> {
                profile_image.value = {
                  name: file.name,
                  lastModified: file.lastModified,
                  type: file.type,
                  base64rep: reader.result as string
                }
            }
            
            reader.onerror = ()=> {
                const error: LocalError = {
                    message: 'Undable to convert to Base64 string',
                    text: 'Image Upload'
                }
                errorHandle.alertError(error)
            }
        }
    }

    onMounted(() => {
        const form2 = computed(() => authStore.form2)
        first_name.value = form2.value.first_name
        second_name.value = form2.value.second_name
        profession.value = form2.value.profession
        user_name.value = form2.value.user_name
        profile_image.value = form2.value.profile_photo
    })

    const persitForm = () => {
        dropEditing()

        const form2: Form2 = {
            first_name: first_name.value,
            second_name: second_name.value,
            profession: profession.value,
            profile_photo: profile_image.value,
            user_name: user_name.value
        }

        authStore.persistForm('form2', form2)
    }
</script>
