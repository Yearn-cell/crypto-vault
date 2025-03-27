<template>
  <div class="bar">
    <div class="val" :style="{ width: `${val}%` }"></div>
  </div>
  <div class="txt">
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  val: number
  msg?: string
}>()

const text = computed(() => {
  return props.msg || `${props.val}%`
})
</script>

<style scoped>
.bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.val {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.txt {
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style> 