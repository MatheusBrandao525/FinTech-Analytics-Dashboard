<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { ref, computed } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

// Generate heavy mock data
const generatePortfolioData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        symbol: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX'][Math.floor(Math.random() * 8)],
        name: `Asset Position #${i + 1}`,
        type: Math.random() > 0.5 ? 'Stock' : 'Option',
        qty: Math.floor(Math.random() * 1000),
        avgPrice: (Math.random() * 500).toFixed(2),
        currentPrice: (Math.random() * 500).toFixed(2),
        pnl: (Math.random() * 2000 - 1000).toFixed(2),
        allocation: (Math.random() * 5).toFixed(2) + '%'
    }));
};

const portfolioItems = ref(generatePortfolioData(5000));
const searchQuery = ref('');

const filteredItems = computed(() => {
    if (!searchQuery.value) return portfolioItems.value;
    const query = searchQuery.value.toLowerCase();
    return portfolioItems.value.filter(item => 
        item.symbol.toLowerCase().includes(query) || 
        item.name.toLowerCase().includes(query)
    );
});
</script>

<template>
  <MainLayout>
    <div class="p-6 h-[calc(100vh-64px)] flex flex-col">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
            <h1 class="text-3xl font-bold text-fintech-text">Portfolio Holdings</h1>
            <p class="text-fintech-muted">Live view of {{ portfolioItems.length.toLocaleString() }} active positions</p>
        </div>
        
        <div class="relative w-full md:w-64">
             <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search assets..." 
                class="w-full bg-fintech-card border border-fintech-border rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-fintech-accent text-fintech-text placeholder-fintech-muted"
            />
            <div class="absolute right-3 top-2.5 text-fintech-muted">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
      </div>
      
      <!-- Table Header -->
      <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-fintech-secondary border-b border-fintech-border text-xs font-semibold text-fintech-muted uppercase tracking-wider rounded-t-lg">
        <div class="col-span-2">Symbol</div>
        <div class="col-span-3">Name</div>
        <div class="col-span-1 text-right">Qty</div>
        <div class="col-span-2 text-right">Avg Price</div>
        <div class="col-span-2 text-right">Current</div>
        <div class="col-span-2 text-right">P&L</div>
      </div>

      <!-- Virtual Scroller Container -->
      <div class="flex-1 bg-fintech-card border border-fintech-border border-t-0 rounded-b-lg overflow-hidden">
        <RecycleScroller
            class="h-full custom-scrollbar"
            :items="filteredItems"
            :item-size="50"
            key-field="id"
            v-slot="{ item }"
        >
            <div class="grid grid-cols-12 gap-4 px-4 py-3 border-b border-fintech-border/50 hover:bg-fintech-secondary/50 transition-colors items-center text-sm">
                <div class="col-span-2 font-medium text-fintech-accent">{{ item.symbol }}</div>
                <div class="col-span-3 text-fintech-text truncate">{{ item.name }}</div>
                <div class="col-span-1 text-fintech-text text-right">{{ item.qty }}</div>
                <div class="col-span-2 text-fintech-muted text-right">${{ item.avgPrice }}</div>
                <div class="col-span-2 text-fintech-text text-right font-medium">${{ item.currentPrice }}</div>
                <div class="col-span-2 text-right font-medium" :class="item.pnl >= 0 ? 'text-fintech-success' : 'text-fintech-danger'">
                    {{ item.pnl >= 0 ? '+' : '' }}{{ item.pnl }}
                </div>
            </div>
        </RecycleScroller>
      </div>

      <!-- Footer Info -->
      <div class="mt-2 text-xs text-fintech-muted text-right">
        Performance optimized rendering of {{ filteredItems.length }} rows
      </div>
    </div>
  </MainLayout>
</template>
