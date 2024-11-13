<template>
    <div class="w-full">
        <form>
            <label for="chat" class="sr-only">Your message</label>
            <div class="flex items-start px-3 py-2 bg-gray-300 dark:bg-gray-800">
                <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                    </svg>
                    <span class="sr-only">Upload image</span>
                </button>
                <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                    </svg>
                    <span class="sr-only">Add emoji</span>
                </button>

                <!-- Text area element and dammy/mirror div element for rows auto adjustment-->
                <textarea @input="setLineBreakCount" id="chat" :rows="textAreaRows" class="block tiny-scrollbar mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                <div id="mirror" aria-hidden="true" style="white-space: pre-wrap; visibility: hidden; position: absolute; top: 0; left: -9999px;"></div>

                <!-- Send button -->
                <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span class="sr-only">Send message</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const textAreaRows = ref(1)

    const focusInput = ()=> {
        const target = document.querySelector('#chat') as HTMLInputElement
        target!.focus()
    }

    const setLineBreakCount = () => {
        const textarea = document.getElementById("chat") as HTMLInputElement
        const mirror = document.getElementById("mirror");

        const textareaStyles = window.getComputedStyle(textarea);
        const lineHeight = parseInt(textareaStyles.lineHeight);

        // Copy relevant styles to the mirror for accurate measurement
        mirror!.style.width = textareaStyles.width;
        mirror!.style.font = textareaStyles.font;
        mirror!.style.padding = textareaStyles.padding;
        mirror!.style.border = textareaStyles.border;
        mirror!.style.whiteSpace = "pre-wrap";
        mirror!.style.wordWrap = "break-word";

        // Copy the textarea content into the mirror element
        mirror!.textContent = textarea.value + '\u200b';  // Zero-width space to force line height

        // Calculate the number of lines by dividing mirror height by line height
        let lineCount = Math.floor(mirror!.offsetHeight / lineHeight);

        if (lineCount-1 > 4) {
            return
        }
        textAreaRows.value = lineCount-1;
    }
</script>