<template>
  <div class="top">
    <button @click="$router.push('/')">返回主页</button>
    <h2>文件解密</h2>
  </div>
  
  <div class="box">
    <div class="row">
      <label>解密密钥:</label>
      <input type="password" v-model="key" placeholder="请输入解密密钥" />
    </div>
    
    <div class="row">
      <label>解密算法:</label>
      <select v-model="alg">
        <option value="aes">AES</option>
        <option value="des">DES</option>
        <option value="3des">3DES</option>
      </select>
    </div>
    
    <div class="row">
      <label>选择加密文件:</label>
      <FilDrp @file-selected="handleFileSelected" />
    </div>
    
    <div class="btn">
      <button :disabled="!canDecrypt" @click="decryptFile">解密文件</button>
    </div>
    
    <div v-if="error" class="err">
      {{ error }}
    </div>
    
    <div v-if="store.processed" class="res">
      <p>解密完成！</p>
      <button @click="downloadResult">下载解密文件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useCryptoStore } from '@/store'
import Enc from '@/utils/crypto'
import FilDrp from '@/components/FilDrp.vue'
import MsgBox from '@/components/MsgBox.vue'

const store = reactive({
  fileName: '',
  fileSize: 0,
  originalFile: null as File | null,
  decryptedBlob: null as Blob | null,
  decryptedFileName: '',
  processing: false,
  processed: false
})

const key = ref('')
const alg = ref<'aes' | 'des' | '3des'>('aes')
const error = ref('')
const file = ref<File | null>(null)
const msgBox = ref()

onMounted(() => {
  resetState()
})

const canDecrypt = computed(() => {
  return store.originalFile !== null && key.value.length >= 4
})

function resetState() {
  store.fileName = ''
  store.fileSize = 0
  store.originalFile = null
  store.decryptedBlob = null
  store.decryptedFileName = ''
  store.processing = false
  store.processed = false
  key.value = ''
  alg.value = 'aes'
}

function getDecryptedFileName(encFileName: string): string {
  if (encFileName.toLowerCase().endsWith('.enc')) {
    return encFileName.slice(0, -4)
  }
  
  return `decrypted_${encFileName}`
}

async function decryptFile() {
  if (!canDecrypt.value || !store.originalFile) return
  
  try {
    store.processing = true
    store.processed = false
    
    const fileBuffer = await Enc.fileToArrayBuffer(store.originalFile)
    const decryptedBuffer = await Enc.decrypt(fileBuffer, key.value, alg.value)
    
    store.decryptedFileName = getDecryptedFileName(store.fileName)
    
    store.decryptedBlob = await Enc.createBlobFromDecryptedData(
      decryptedBuffer,
      store.decryptedFileName
    )
    
    store.processed = true
  } catch (error) {
    console.error('解密失败:', error)
    msgBox.value.opn(`解密失败: ${error instanceof Error ? error.message : String(error)}`, 'err')
  } finally {
    store.processing = false
  }
}

function handleFileSelected(selectedFile: File) {
  store.originalFile = selectedFile
  store.fileName = selectedFile.name
  store.fileSize = selectedFile.size
  store.processed = false
  store.decryptedBlob = null
  
  const suggestedFileName = getDecryptedFileName(selectedFile.name)
  store.decryptedFileName = suggestedFileName
}

function downloadResult() {
  if (!store.decryptedBlob) return
  
  const url = URL.createObjectURL(store.decryptedBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = store.decryptedFileName
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
</script>

<style scoped>
.top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.top button {
  margin-right: 20px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.row {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.row label {
  margin-bottom: 8px;
  font-weight: bold;
}

.row input, .row select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  margin-top: 25px;
}

.btn button {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.err {
  margin-top: 20px;
  color: #D32F2F;
  padding: 10px;
  background-color: #FFEBEE;
  border-radius: 4px;
}

.res {
  margin-top: 20px;
  text-align: center;
  padding: 15px;
  background-color: #E8F5E9;
  border-radius: 4px;
}

.res button {
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style> 