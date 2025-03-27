<template>
  <div class="text-decrypt-container">
    <div class="page-header">
      <button class="btn-back" @click="$router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
        返回主页
      </button>
      <h1>文本解密</h1>
    </div>
    
    <div class="decrypt-card card">
      <div class="card-form">
        <div class="form-row">
          <label for="key">解密密钥</label>
          <div class="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
            <input 
              id="key" 
              type="password" 
              v-model="key" 
              placeholder="请输入解密密钥" 
              class="form-input" 
            />
          </div>
        </div>
        
        <div class="form-row">
          <label for="algorithm">解密算法</label>
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
          <label for="text">加密文本</label>
          <textarea 
            id="text" 
            v-model="txt" 
            placeholder="请输入要解密的文本内容" 
            class="form-textarea"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button 
            :disabled="!canDecrypt" 
            @click="decryptText"
            class="btn-action"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
            解密文本
          </button>
        </div>
      </div>
      
      <div v-if="error" class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div class="error-content">
          <span>{{ error }}</span>
          <div class="error-tips">
            <p><strong>解密失败常见问题:</strong></p>
            <ul>
              <li>确保使用与加密时完全相同的密钥</li>
              <li>选择与加密时相同的算法</li>
              <li>确保密文完整、没有多余空格</li>
              <li>尝试刷新页面后重新操作</li>
            </ul>
          </div>
        </div>
      </div>
      
      <transition name="fade">
        <div v-if="result" class="result-section">
          <h3>解密结果</h3>
          <div class="result-box">
            <div class="result-content">{{ result }}</div>
            <div class="result-actions">
              <TxtCpy :txt="result" @error="handleCopyError">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                复制结果
              </TxtCpy>
            </div>
          </div>
        </div>
      </transition>

      <div class="help-section">
        <button @click="showHelp = !showHelp" class="help-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          解密帮助
        </button>
        
        <div v-if="showHelp" class="help-content">
          <h4>使用说明</h4>
          <ol>
            <li>输入加密时使用的<strong>完全相同</strong>的密钥</li>
            <li>选择加密时使用的<strong>相同算法</strong></li>
            <li>粘贴完整的加密文本（不要有前后空格）</li>
            <li>点击"解密文本"按钮</li>
          </ol>
          
          <h4>故障排除</h4>
          <ul>
            <li>如果解密失败，请检查密钥和算法是否与加密时一致</li>
            <li>确保复制粘贴的密文是完整的</li>
            <li>密文通常是一串不可读的字符，如"U2FsdGVkX1..."</li>
          </ul>
          
          <div class="example-section">
            <h4>示例</h4>
            <p><strong>密钥：</strong> test123</p>
            <div class="example-row">
              <div>
                <p><strong>原文：</strong> 你好世界</p>
                <p><strong>算法：</strong> AES</p>
              </div>
              <div>
                <p><strong>密文：</strong> <code class="sample-text">U2FsdGVkX18T7wvz0ECV8LNYCtQ4RXWuSqQbGTSZbd0=</code></p>
                <button @click="fillExampleData" class="example-btn">使用此示例</button>
              </div>
            </div>
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

const canDecrypt = computed(() => {
  return key.value.length > 0 && txt.value.length > 0
})

const resetState = () => {
  error.value = ''
  result.value = ''
}

const decryptText = () => {
  try {
    resetState();
    
    const cleanText = txt.value.trim();
    if (!cleanText) {
      throw new Error('请输入要解密的文本');
    }
    
    if (key.value.length < 1) {
      throw new Error('请输入解密密钥');
    }
    
    try {
      let decrypted;
      
      switch (alg.value) {
        case 'des':
          decrypted = CryptoJS.DES.decrypt(
            cleanText,
            key.value
          );
          break;
        case '3des':
          decrypted = CryptoJS.TripleDES.decrypt(
            cleanText,
            key.value
          );
          break;
        default:
          decrypted = CryptoJS.AES.decrypt(
            cleanText,
            key.value
          );
      }
      
      const resultText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!resultText) {
        throw new Error('解密结果为空，请确认密钥和加密文本是否正确');
      }
      
      result.value = resultText;
      console.log('解密成功:', resultText);
    } catch (cryptoErr) {
      console.error('解密过程中出错:', cryptoErr);
      throw new Error('解密失败，请确保密钥正确且加密文本格式有效');
    }
  } catch (err) {
    error.value = `解密失败: ${err instanceof Error ? err.message : String(err)}`;
  }
};

const fillExampleData = () => {
  key.value = 'test123'
  alg.value = 'aes'
  txt.value = 'U2FsdGVkX18T7wvz0ECV8LNYCtQ4RXWuSqQbGTSZbd0='
}

const handleCopyError = (err: any) => {
  error.value = `复制失败: ${err}`
}
</script>

<style scoped>
.text-decrypt-container {
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

.decrypt-card {
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
  
  .decrypt-card {
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

.error-content {
  display: flex;
  flex-direction: column;
}

.error-tips {
  margin-top: 0.75rem;
  font-size: 0.85rem;
}

.error-tips p {
  margin: 0 0 0.5rem 0;
}

.error-tips ul {
  margin: 0;
  padding-left: 1.25rem;
}

.error-tips li {
  margin-bottom: 0.25rem;
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

.example-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.sample-text {
  background-color: #f1f1f1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  overflow-wrap: break-word;
  word-break: break-all;
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

@media (max-width: 768px) {
  .example-row {
    grid-template-columns: 1fr;
  }
}
</style> 