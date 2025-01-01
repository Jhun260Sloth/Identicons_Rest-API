<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as jdenticon from 'jdenticon'

const inputText = ref('')
const svgString = ref('')
const apiUrl = ref('')

const generateIdenticon = () => {
  svgString.value = jdenticon.toSvg(inputText.value || 'default', 200)
}

const downloadSvg = () => {
  const blob = new Blob([svgString.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `identicon-${inputText.value || 'default'}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

watch(inputText, () => {
  generateIdenticon()
  apiUrl.value = `/api/identicon/${encodeURIComponent(inputText.value || 'default')}`
})

onMounted(() => {
  generateIdenticon()
  apiUrl.value = `/api/identicon/default`
})
</script>

<template>
  <div class="identicon-container">
    <h2>Generate Identicon</h2>
    
    <div class="input-group">
      <input 
        v-model="inputText"
        type="text"
        placeholder="Enter text to generate identicon"
        class="input"
      />
    </div>

    <div 
      class="identicon-display"
      v-html="svgString"
    ></div>

    <UButton
      icon="i-heroicons-arrow-down-tray"
      color="primary"
      @click="downloadSvg"
    >
      Download SVG
    </UButton>

    <div class="api-example">
      <h3>API Usage Example</h3>
      <p>Inputted Text Endpoint:</p>
      <code class="api-url">https://identicons-rest-api.vercel.app/api/identicon/+Text_Here+</code>
    </div>

    <div class="api-example">
      <h3>API Usage Example</h3>
      <p>Inputted Text Enpoint + Custom Size:</p>
      <code class="api-url">https://identicons-rest-api.vercel.app/api/identicon/+Text_Here+?size=300]</code>
    
    </div>

  </div>
</template>

<style scoped>
.identicon-container {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input-group {
  width: 100%;
  max-width: 300px;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.identicon-display {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.api-example {
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.api-url {
  display: block;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  margin: 1rem 0;
  word-break: break-all;
}

.api-preview {
  margin: 2rem 0;
}
</style>