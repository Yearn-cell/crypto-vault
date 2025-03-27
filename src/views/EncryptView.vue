<template>
  <div class="top">
    <button @click="$router.push('/')">返回主页</button>
    <h2>文件加密</h2>
  </div>
  
  <div class="box">
    <div class="row">
      <label>加密密钥:</label>
      <input type="password" v-model="key" placeholder="请输入加密密钥" />
    </div>
    
    <div class="row">
      <label>加密算法:</label>
      <select v-model="alg">
        <option value="aes">AES</option>
        <option value="des">DES</option>
        <option value="3des">3DES</option>
      </select>
    </div>
    
    <div class="row">
      <label>选择文件:</label>
      <FilDrp @file-selected="handleFileSelected" />
    </div>
    
    <div class="btn">
      <button :disabled="!canEncrypt" @click="encryptFile">加密文件</button>
    </div>
    
    <div v-if="error" class="err">
      {{ error }}
    </div>
    
    <div v-if="store.processed" class="res">
      <p>加密完成！</p>
      <button @click="downloadResult">下载加密文件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FilDrp from '@/components/FilDrp.vue'
import Enc from '@/utils/crypto'

const router = useRouter()

const store = reactive({
  fileName: '',
  fileSize: 0,
  originalFile: null as File | null,
  encryptedBlob: null as Blob | null,
  encryptedFileName: '',
  processing: false,
  processed: false
})

const key = ref('')
const alg = ref<'aes' | 'des' | '3des'>('aes')
const error = ref('')

const canEncrypt = computed(() => {
  return store.originalFile !== null && key.value.length >= 4
})

onMounted(() => {
  resetState()
})

function resetState() {
  store.fileName = ''
  store.fileSize = 0
  store.originalFile = null
  store.encryptedBlob = null
  store.encryptedFileName = ''
  store.processing = false
  store.processed = false
  key.value = ''
  alg.value = 'aes'
}

async function encryptFile() {
  if (!canEncrypt.value || !store.originalFile) return
  
  try {
    store.processing = true
    store.processed = false
    
    const fileBuffer = await Enc.fileToArrayBuffer(store.originalFile)
    const encryptedBuffer = await Enc.encrypt(fileBuffer, key.value, alg.value)
    
    store.encryptedBlob = new Blob([encryptedBuffer], {
      type: 'application/octet-stream'
    })
    
    store.encryptedFileName = `${store.fileName}.enc`
    store.processed = true
  } catch (error) {
    console.error('加密失败:', error)
    alert(`加密失败: ${error instanceof Error ? error.message : String(error)}`)
  } finally {
    store.processing = false
  }
}

function handleFileSelected(selectedFile: File) {
  store.originalFile = selectedFile
  store.fileName = selectedFile.name
  store.fileSize = selectedFile.size
  store.processed = false
  store.encryptedBlob = null
}

function downloadResult() {
  if (!store.encryptedBlob) return
  
  const url = URL.createObjectURL(store.encryptedBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = store.encryptedFileName
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