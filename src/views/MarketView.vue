<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import D3CandlestickChart from '../components/charts/D3CandlestickChart.vue';
import { ref, onMounted } from 'vue';

const marketData = ref([]);

// Generate realistic mock market data
const generateMarketData = (days) => {
    const data = [];
    let price = 1500;
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (days - i));
        
        const open = price + (Math.random() - 0.5) * 50;
        const close = open + (Math.random() - 0.5) * 50;
        const high = Math.max(open, close) + Math.random() * 20;
        const low = Math.min(open, close) - Math.random() * 20;
        
        price = close;
        
        data.push({
            date,
            open,
            high,
            low,
            close
        });
    }
    return data;
};

onMounted(() => {
    marketData.value = generateMarketData(100);
});

const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
const activeTimeframe = ref('3M');
</script>

<template>
  <MainLayout>
    <div class="p-6 h-[calc(100vh-64px)] flex flex-col">
      <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-fintech-text">Market Analytics</h1>
            <p class="text-fintech-muted">S&P 500 E-mini Futures</p>
          </div>
          <div class="flex items-center space-x-2 bg-fintech-card p-1 rounded-lg border border-fintech-border">
                <button 
                    v-for="tf in timeframes" 
                    :key="tf"
                    @click="activeTimeframe = tf"
                    class="px-3 py-1 text-sm font-medium rounded transition-colors"
                    :class="activeTimeframe === tf ? 'bg-fintech-accent text-white' : 'text-fintech-muted hover:text-fintech-text hover:bg-fintech-secondary'"
                >
                    {{ tf }}
                </button>
          </div>
      </div>
      
      <div class="flex-1 min-h-0 bg-fintech-card rounded-xl shadow-lg border border-fintech-border p-4">
        <div class="h-full w-full">
            <D3CandlestickChart :data="marketData" :height="600" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
