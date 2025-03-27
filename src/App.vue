<template>
  <div class="app-container">
    <div class="app-content">
      <router-view v-slot="{ Component }">
        <!-- <transition name="page" mode="out-in"> -->
          <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
body {
  margin: 0;
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--background);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f1fe 100%);
}

.app-content {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  flex-grow: 1;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .app-content {
    padding: 1rem;
  }
}
</style> 