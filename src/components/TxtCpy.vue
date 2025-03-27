<template>
  <button class="btn" @click="cpy">
    <slot>复制</slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  txt: string
}>()

const emit = defineEmits(['copied', 'error'])

const cpy = () => {
  if (!props.txt) return
  
  navigator.clipboard.writeText(props.txt)
    .then(() => {
      emit('copied')
      
      const tip = document.createElement('div')
      tip.textContent = '已复制到剪贴板'
      tip.style.position = 'fixed'
      tip.style.top = '20px'
      tip.style.left = '50%'
      tip.style.transform = 'translateX(-50%)'
      tip.style.backgroundColor = '#4CAF50'
      tip.style.color = 'white'
      tip.style.padding = '10px 20px'
      tip.style.borderRadius = '4px'
      tip.style.zIndex = '1000'
      document.body.appendChild(tip)
      
      setTimeout(() => {
        document.body.removeChild(tip)
      }, 2000)
    })
    .catch(err => {
      emit('error', err)
    })
}
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 