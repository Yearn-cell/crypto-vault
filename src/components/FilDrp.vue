<template>
  <div 
    class="drp"
    :class="{ act: isDragging }"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <div class="ico">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
    </div>
    <div class="msg">
      <p>拖放文件至此处或</p>
      <label class="btn">
        浏览文件
        <input type="file" @change="onFileChange" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])
const isDragging = ref(false)

const onDragEnter = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    handleFile(e.dataTransfer.files[0])
  }
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    handleFile(target.files[0])
  }
}

const handleFile = (file: File) => {
  emit('file-selected', file)
}
</script>

<style scoped>
.drp {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.3s;
  background-color: #f9f9f9;
  cursor: pointer;
}

.drp.act {
  border-color: #2196F3;
  background-color: rgba(33, 150, 243, 0.05);
}

.ico {
  color: #666;
  margin-bottom: 16px;
}

.msg p {
  margin-bottom: 12px;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn input {
  display: none;
}
</style> 