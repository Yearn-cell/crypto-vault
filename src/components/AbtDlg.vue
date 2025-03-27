<template>
  <Teleport to="body">
    <div v-if="vis" class="dlg" @click.self="cls">
      <div class="box">
        <div class="hdr">
          <h3>关于</h3>
          <button class="cls" @click="cls">×</button>
        </div>
        <div class="cnt">
          <div class="inf">
            <h2>{{ title }}</h2>
            <p>版本: {{ ver }}</p>
            <p>本工具在浏览器中实现加密与解密功能，所有处理均在本地完成，不会上传数据到任何服务器。</p>
            <p>主要功能：</p>
            <ul>
              <li><strong>文件加密/解密</strong>：加密各种类型文件，保护文件安全</li>
              <li><strong>文本加密/解密</strong>：快速加密文本信息，便于安全传输</li>
            </ul>
            <p>支持的加密算法:</p>
            <ul>
              <li>AES - 高级加密标准</li>
              <li>DES - 数据加密标准</li>
              <li>3DES - 三重数据加密算法</li>
            </ul>
            <p>使用CryptoJS库实现密码学功能。</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const title = ref('文件加密工具')
const ver = ref('')
const vis = ref(false)

onMounted(() => {
  title.value = import.meta.env.VITE_APP_TITLE || '文件加密工具'
  ver.value = import.meta.env.VITE_API_VERSION || '1.0'
})

function opn() {
  vis.value = true
}

function cls() {
  vis.value = false
}

defineExpose({
  opn,
  cls
})
</script>

<style scoped>
.dlg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.box {
  width: 500px;
  max-width: 90%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.hdr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.hdr h3 {
  margin: 0;
  color: #333;
}

.cls {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.cnt {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.inf h2 {
  margin-top: 0;
  color: #4CAF50;
}

.inf p {
  margin: 10px 0;
  line-height: 1.5;
}

.inf ul {
  margin: 10px 0;
  padding-left: 20px;
}

.inf li {
  margin: 5px 0;
}
</style> 