<template>
  <div class="text-encrypt-container">
    <div class="page-header">
      <button class="btn-back" @click="$router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
        返回主页
      </button>
      <h1>文本加密</h1>
    </div>
    
    <div class="encrypt-card card">
      <div class="card-form">
        <div class="form-row">
          <label for="key">加密密钥</label>
          <div class="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
            <input 
              id="key" 
              type="password" 
              v-model="key" 
              placeholder="请输入加密密钥" 
              class="form-input" 
            />
          </div>
        </div>
        
        <div class="form-row">
          <label for="algorithm">加密算法</label>
          <div class="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V6"></path><path d="M12 14v4"></path><circle cx="12" cy="12" r="9"></circle></svg>
            <select 
              id="algorithm" 
              v-model="alg" 
              class="form-input"
            >
              <option value="aes">AES - 高级加密标准</option>
              <option value="des">DES - 数据加密标准</option>
              <option value="3des">3DES - 三重数据加密算法</option>
            </select>
          </div>
        </div>
        
        <div class="form-row text-area-row">
          <label for="text">输入文本</label>
          <textarea 
            id="text" 
            v-model="txt" 
            placeholder="请输入要加密的文本内容" 
            class="form-textarea"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button 
            :disabled="!canEncrypt" 
            @click="encryptText"
            class="btn-action"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            加密文本
          </button>
        </div>
      </div>
      
      <div v-if="error" class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div class="error-content">
          <span>{{ error }}</span>
        </div>
      </div>
      
      <transition name="fade">
        <div v-if="result" class="result-section">
          <h3>加密结果</h3>
          <div class="result-box">
            <div class="result-content">{{ result }}</div>
            <div class="result-actions">
              <TxtCpy :txt="result" @error="handleCopyError">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                复制结果
              </TxtCpy>
            </div>
          </div>
          <div class="encryption-tips">
            <p>重要提示：请保存您的密钥，没有密钥将无法解密！</p>
          </div>
        </div>
      </transition>
      
      <div class="help-section">
        <button @click="showHelp = !showHelp" class="help-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          加密帮助
        </button>
        
        <div v-if="showHelp" class="help-content">
          <h4>安全提示</h4>
          <ul>
            <li>使用强密钥（字母、数字和特殊字符的组合）</li>
            <li>请务必记住您的密钥，没有它将无法解密数据</li>
            <li>密钥和算法都需要在解密时提供，请记录这些信息</li>
          </ul>
          
          <h4>加密算法说明</h4>
          <ul>
            <li><strong>AES</strong> - 高级加密标准，目前最安全的对称加密算法之一</li>
            <li><strong>DES</strong> - 数据加密标准，较老的加密算法，安全性较低</li>
            <li><strong>3DES</strong> - 三重DES，比DES更安全但比AES慢</li>
          </ul>
          
          <h4>使用方法</h4>
          <ol>
            <li>输入要加密的文本内容</li>
            <li>设置一个安全的密钥（请记住它！）</li>
            <li>选择加密算法（默认AES推荐）</li>
            <li>点击"加密文本"按钮</li>
            <li>复制生成的加密文本</li>
          </ol>
          
          <div class="example-section">
            <h4>快速开始</h4>
            <p>使用示例数据快速尝试加密功能：</p>
            <button @click="fillExampleData" class="example-btn">使用示例数据</button>
            <p class="example-details">
              <small>示例使用 "test123" 作为密钥，AES 算法，和 "测试加密文本" 作为内容</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CryptoJS from 'crypto-js'
import TxtCpy from '@/components/TxtCpy.vue'

const key = ref('')
const alg = ref('aes')
const txt = ref('')
const error = ref('')
const result = ref('')
const showHelp = ref(false)

onMounted(() => {
  resetState()
})

const canEncrypt = computed(() => {
  return key.value.length > 0 && txt.value.length > 0
})

const resetState = () => {
  error.value = ''
  result.value = ''
}

const encryptText = () => {
  try {
    resetState()
    
    const inputText = txt.value.trim()
    if (!inputText) {
      throw new Error('请输入要加密的文本')
    }
    
    if (key.value.length < 4) {
      throw new Error('密钥长度太短，请使用至少4个字符的密钥')
    }
    
    try {
      let encrypted;
      
      switch (alg.value) {
        case 'des':
          encrypted = CryptoJS.DES.encrypt(
            inputText, 
            key.value
          ).toString();
          break;
        case '3des':
          encrypted = CryptoJS.TripleDES.encrypt(
            inputText, 
            key.value
          ).toString();
          break;
        default:
          encrypted = CryptoJS.AES.encrypt(
            inputText, 
            key.value
          ).toString();
      }
      
      result.value = encrypted;
      console.log('加密结果:', result.value);
      console.log('使用的加密算法:', alg.value);
      console.log('请确保解密时使用相同的密钥和算法');
    } catch (cryptoErr) {
      console.error('加密过程中出错:', cryptoErr);
      throw new Error('加密过程出错，请重试');
    }
  } catch (err) {
    error.value = `加密失败: ${err instanceof Error ? err.message : String(err)}`;
  }
};

const fillExampleData = () => {
  txt.value = '测试加密文本';
  key.value = 'test123';
  alg.value = 'aes';
};

const handleCopyError = (err: any) => {
  error.value = `复制失败: ${err}`
}
</script>

<style scoped>
.text-encrypt-container {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  color: var(--primary-color);
  font-weight: 600;
  border-radius: var(--border-radius);
}

.btn-back:hover {
  background-color: rgba(33, 150, 243, 0.08);
  box-shadow: none;
}

.encrypt-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  animation: slideUp 0.5s ease-out;
}

.card-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon svg {
  position: absolute;
  left: 1rem;
  color: var(--text-hint);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: white;
}

.form-textarea {
  width: 100%;
  min-height: 150px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  resize: vertical;
  background-color: white;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-action:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-action:disabled {
  background-color: var(--text-hint);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #FEE2E2;
  color: #DC2626;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease;
}

.error-message svg {
  color: #DC2626;
  flex-shrink: 0;
}

.error-content {
  display: flex;
  flex-direction: column;
}

.encryption-tips {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #FFF8E1;
  border-radius: var(--border-radius);
  color: #F57C00;
  font-size: 0.9rem;
  border-left: 4px solid #FF9800;
}

.encryption-tips p {
  margin: 0;
}

.result-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  animation: slideUp 0.5s ease;
}

.result-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.result-box {
  background-color: #F9FAFB;
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.result-content {
  padding: 1rem;
  font-family: monospace;
  word-break: break-all;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-primary);
}

.result-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem;
  background-color: #F1F5F9;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .encrypt-card {
    padding: 1.5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.help-section {
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.help-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  cursor: pointer;
}

.help-toggle:hover {
  text-decoration: underline;
  background: none;
  box-shadow: none;
}

.help-content {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #F0F7FF;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  animation: slideDown 0.3s ease;
}

.help-content h4 {
  margin: 0 0 0.75rem 0;
  color: var(--primary-color);
}

.help-content ol, .help-content ul {
  margin: 0 0 1.25rem 0;
  padding-left: 1.5rem;
}

.help-content li {
  margin-bottom: 0.5rem;
}

.example-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border-color);
}

.example-btn {
  margin-top: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.85rem;
  cursor: pointer;
}

.example-details {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 