<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="main-title">加密解密工具</h1>
      <p class="subtitle">安全、快速、简便的加密解密服务</p>
      <p class="description">所有操作在本地完成，数据绝不上传到任何服务器</p>
    </div>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M9 18l3-3-3-3"></path></svg>
        </div>
        <div class="card-content">
          <h3>文件加密</h3>
          <p>加密任何类型的文件，确保您的敏感文档安全</p>
          <button class="card-btn btn-primary" @click="$router.push('/encrypt')">开始使用</button>
        </div>
      </div>
      
      <div class="feature-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"></path><path d="M8 15l4 4 4-4"></path></svg>
        </div>
        <div class="card-content">
          <h3>文件解密</h3>
          <p>使用正确的密钥解密您之前加密的文件</p>
          <button class="card-btn btn-primary" @click="$router.push('/decrypt')">开始使用</button>
        </div>
      </div>
      
      <div class="feature-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v3m-3-3h6"></path><path d="M8.8 4.2L7 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-1.8-2.8A2 2 0 0 0 13.6 3H10a2 2 0 0 0-1.7 1.2z"></path></svg>
        </div>
        <div class="card-content">
          <h3>文本加密</h3>
          <p>加密敏感文本信息，保护您的隐私和通信安全</p>
          <button class="card-btn btn-primary" @click="$router.push('/text-encrypt')">开始使用</button>
        </div>
      </div>
      
      <div class="feature-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-3.39 3.39A6 6 0 1 0 7.5 16.6L2 22l4.5-4.5a6 6 0 1 0 8.39-8.39M16.5 7.5L10 14"></path></svg>
        </div>
        <div class="card-content">
          <h3>文本解密</h3>
          <p>解密使用本工具加密的文本信息</p>
          <button class="card-btn btn-primary" @click="$router.push('/text-decrypt')">开始使用</button>
        </div>
      </div>
    </div>
    
    <div class="info-section">
      <div class="info-card">
        <h3>强大加密技术</h3>
        <div class="algo-badges">
          <span class="badge">AES</span>
          <span class="badge">DES</span>
          <span class="badge">3DES</span>
        </div>
        <p>使用业界标准的加密算法保护您的数据安全</p>
      </div>
      
      <div class="info-card">
        <h3>保护隐私</h3>
        <p>所有加密解密操作都在您的浏览器中完成，我们不会存储任何数据</p>
      </div>
    </div>
    
    <footer class="home-footer">
      <button class="btn-text" @click="showAbout">关于我们</button>
      <span class="copyright">© {{ currentYear }} 加密解密工具</span>
    </footer>
  </div>
  
  <AbtDlg ref="aboutDlg" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AbtDlg from '@/components/AbtDlg.vue'

const aboutDlg = ref()
const currentYear = computed(() => new Date().getFullYear())

const showAbout = () => {
  aboutDlg.value.opn()
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 1rem;
  padding: 2.5rem 1rem;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  border-radius: var(--border-radius);
  color: white;
  box-shadow: var(--box-shadow);
  animation: fadeIn 0.8s ease-out;
}

.main-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
  font-weight: 600;
}

.description {
  font-size: 1rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.feature-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: slideUp 0.5s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s);
  opacity: 0;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
}

.feature-card:nth-child(1) {
  --index: 1;
}

.feature-card:nth-child(2) {
  --index: 2;
}

.feature-card:nth-child(3) {
  --index: 3;
}

.feature-card:nth-child(4) {
  --index: 4;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-light);
  color: white;
  padding: 1.5rem;
}

.card-content {
  padding: 1.5rem;
}

.card-content h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.card-content p {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.card-btn {
  width: 100%;
  font-weight: 600;
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.info-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  text-align: center;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
}

.info-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.info-card p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.algo-badges {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.badge {
  display: inline-block;
  background-color: var(--primary-light);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.home-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .home-footer {
    flex-direction: column;
    gap: 1rem;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 