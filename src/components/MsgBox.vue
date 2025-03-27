<template>
  <Teleport to="body">
    <div v-if="vis" class="mod">
      <div class="box" :class="typ">
        <div class="txt">{{ msg }}</div>
        <div class="act">
          <button @click="cls">确定</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Typ = 'inf' | 'err' | 'suc'

const vis = ref(false)
const msg = ref('')
const typ = ref<Typ>('inf')

const opn = (message: string, type: Typ = 'inf') => {
  msg.value = message
  typ.value = type
  vis.value = true
}

const cls = () => {
  vis.value = false
}

defineExpose({
  opn,
  cls
})
</script>

<style scoped>
.mod {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.txt {
  margin-bottom: 20px;
  text-align: center;
}

.act {
  display: flex;
  justify-content: center;
}

.act button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #2196F3;
  color: white;
  cursor: pointer;
}

.inf button {
  background-color: #2196F3;
}

.suc button {
  background-color: #4CAF50;
}

.err button {
  background-color: #F44336;
}
</style> 