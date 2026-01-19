<script setup>
import { Doughnut } from 'vue-chartjs'
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
        x: { display: false },
        y: { display: false }
    },
    cutout: '75%'
}
</script>

<template>
  <div class="w-full h-full p-4 relative">
    <Doughnut :data="data" :options="options" />
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span class="text-xl font-bold text-fintech-text ml-1.5 mt-1">100%</span>
    </div>
  </div>
</template>
