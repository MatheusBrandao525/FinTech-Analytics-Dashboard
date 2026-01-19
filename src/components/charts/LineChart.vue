<script setup>
import { Line } from 'vue-chartjs'
import { commonOptions } from './ChartConfig'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const options = {
    ...commonOptions,
    plugins: {
        ...commonOptions.plugins,
        title: {
            display: false
        }
    },
    tension: 0.4 // Smooth curves
}
</script>

<template>
  <div class="w-full h-full">
    <Line :data="data" :options="options" />
  </div>
</template>
