<script setup lang="ts">
import PasswordInput from './components/PasswordInput.vue'
</script>

<template>
  <main>
    <PasswordInput />
  </main>
</template>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center; 
  align-items: center;     
  height: 100vh;           
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
