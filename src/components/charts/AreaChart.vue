<script setup>
import { Line } from 'vue-chartjs'
import { commonOptions } from './ChartConfig'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const options = {
    ...commonOptions,
     scales: {
        x: { display: false }, // Tiny chart no axis
        y: { display: false }
    },
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    },
    elements: {
        point: { radius: 0 }
    },
    tension: 0.4,
    fill: true
}
</script>

<template>
  <div class="w-full h-full">
    <Line :data="data" :options="options" />
  </div>
</template>
