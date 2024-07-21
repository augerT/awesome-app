<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import fs from 'fs'
import path from 'path'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello World!'
    }
  },
  setup() {
    const files = ref<string[]>([])
    const error = ref<string | null>(null)

    const readDirectory = async (path: string) => {
      try {
        // TypeScript doesn't know about our custom electronAPI by default
        const api = (window as any).electronAPI
        const result = await api.readDirectory(path)
        files.value = result
      } catch (err) {
        error.value = err instanceof Error ? err.message : String(err)
        console.error(err)
      }
    }

    console.log(files.value[0])
    onMounted(() => {
      readDirectory('C:/Medal/Clips/Gears 5')
    })

    return { 
      readDirectory
    }
  },
  methods: {
    
  }
})

</script>

<style>
  .hello-world {
    font-family: Arial, sans-serif;
    text-align: center;
  }
</style>