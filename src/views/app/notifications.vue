<template>
  <div class="h-full pl-4 overflow-y-auto tiny-scrollbar scrollbar-rounded">
    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <li :id="'notification-'+ notification.id" v-for="(notification, index) in notifications" :key="notification.id" class="mb-5 ms-4 notification">
        <div class="absolute z-10 w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{notification.createdAt}}</time>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400"></p>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore, type Notification } from '@/stores/home'
import { onBeforeUnmount, onMounted } from 'vue'
import { computed } from 'vue'

const homeStore = useHomeStore()

const notifications = computed(() => homeStore.notifications)

const layoutParser = (target: Notification) => {
    let construct = ''

    const level1Tokens = target.layout.split('.')
    level1Tokens.forEach((token) => {
        if (token == 'source') {
        construct += ` <span class="source font-bold cursor-pointer">${target.source}</span>`
        } else if (token == 'subject') {
        construct += ` <span class="subject font-bold cursor-pointer">${target.subject}</span>`
        } else {
        construct += ` ${token}`
        }
    })

    //  TODO: Need to make token passing for innermost notations
    const level2Tokens = construct.split('<')

    const targetDom = document.querySelector(`#notification-${target.id}`)?.lastElementChild
    if (targetDom) {
        targetDom.innerHTML = construct
    }
}

onMounted(() => {
    const observer = new IntersectionObserver((elements) => {
        elements.forEach(element => {
            const elementId = element.target.id.split('-')[1]
            
            const target = notifications.value.find(value => value.id == elementId)
            if(!target){
                return
            }
            
            layoutParser(target)
        })
    })

    const targetElements = document.querySelectorAll('.notification')
    
    targetElements.forEach(element => {
        observer.observe(element)
    })

    if (targetElements.length > 0) {
        onBeforeUnmount(() => {
            targetElements.forEach(element => {
                observer.unobserve(element)
            })
        })
    }
    
})
</script>
