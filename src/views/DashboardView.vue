<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { ref, onMounted } from 'vue';
import KPICard from '../components/KPICard.vue';
import { 
    CurrencyDollarIcon, 
    ArrowTrendingUpIcon, 
    ChartPieIcon, 
    ShieldCheckIcon 
} from '@heroicons/vue/24/outline';

const kpiData = ref([
    { title: 'Portfolio Value', value: '$1,245,392.00', change: '+2.4%', isPositive: true, icon: CurrencyDollarIcon },
    { title: 'Daily P&L', value: '$8,230.50', change: '+0.8%', isPositive: true, icon: ArrowTrendingUpIcon },
    { title: 'Monthly Return', value: '18.2%', change: '-0.5%', isPositive: false, icon: ChartPieIcon },
    { title: 'Risk Score', value: 'Low (2/10)', change: 'Stable', isPositive: true, icon: ShieldCheckIcon },
]);

import LineChart from '../components/charts/LineChart.vue';
import DoughnutChart from '../components/charts/DoughnutChart.vue';
import AreaChart from '../components/charts/AreaChart.vue';

const lineChartData = {
    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{
        label: 'Market Trend',
        data: [150, 155, 148, 160, 158, 165, 170],
        borderColor: '#38BDF8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true
    }]
};

const doughnutChartData = {
    labels: ['Stocks', 'Crypto', 'Bonds', 'Cash'],
    datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: ['#38BDF8', '#10B981', '#F59E0B', '#64748B'],
        borderWidth: 0
    }]
};

const areaChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Growth',
        data: [10000, 12000, 11500, 14000, 16000, 18500],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4
    }]
};

// Simulated realtime updates
onMounted(() => {
    setInterval(() => {
        // Subtle randomization to simulate live market data
        const randomFactor = Math.random() > 0.5 ? 1 : -1;
        const amount = Math.floor(Math.random() * 50);
        let currentVal = parseInt(kpiData.value[1].value.replace(/[^0-9.-]+/g,""));
        currentVal += (amount * randomFactor);
        kpiData.value[1].value = '$' + currentVal.toLocaleString('en-US', {minimumFractionDigits: 2});
    }, 3000);
});
</script>

<template>
  <MainLayout>
    <div class="p-6 space-y-6">
      
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-fintech-text tracking-tight">Dashboard Overview</h1>
                <p class="text-sm text-fintech-muted">Real-time market insights and portfolio status</p>
            </div>
            <div class="flex space-x-3">
                 <span class="px-3 py-1 bg-fintech-success/10 text-fintech-success text-xs font-semibold rounded-full flex items-center border border-fintech-success/20">
                    <span class="w-2 h-2 bg-fintech-success rounded-full mr-2 animate-pulse"></span>
                    Market Open
                 </span>
            </div>
        </div>

        <!-- KPI Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
                v-for="(kpi, index) in kpiData" 
                :key="index"
                :title="kpi.title"
                :value="kpi.value"
                :change="kpi.change"
                :isPositive="kpi.isPositive"
                :icon="kpi.icon"
            />
        </div>

        <!-- Charts Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
            <!-- Main Chart (Large) -->
            <div class="lg:col-span-2 bg-fintech-card border border-fintech-border rounded-xl p-6 shadow-sm flex flex-col">
                <h3 class="text-lg font-semibold text-fintech-text mb-4">Market Trend</h3>
                <div class="flex-1 min-h-0 relative">
                    <LineChart :data="lineChartData" />
                </div>
            </div>

            <!-- Side Chart -->
            <div class="bg-fintech-card border border-fintech-border rounded-xl p-6 shadow-sm flex flex-col">
                 <h3 class="text-lg font-semibold text-fintech-text mb-4">Asset Allocation</h3>
                 <div class="flex-1 min-h-0 relative flex items-center justify-center">
                    <DoughnutChart :data="doughnutChartData" />
                </div>
            </div>
        </div>
        
        <!-- Bottom Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
             <div class="bg-fintech-card border border-fintech-border rounded-xl p-6 shadow-sm min-h-[300px]">
                 <h3 class="text-lg font-semibold text-fintech-text mb-4">Recent Activity</h3>
                 <div class="space-y-4">
                    <div v-for="i in 5" :key="i" class="flex items-center justify-between p-3 rounded-lg hover:bg-fintech-secondary transition-colors cursor-pointer border border-transparent hover:border-fintech-border">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" :class="i % 2 === 0 ? 'bg-fintech-success/20 text-fintech-success' : 'bg-fintech-accent/20 text-fintech-accent'">
                                {{ i % 2 === 0 ? 'Buy' : 'Sell' }}
                            </div>
                            <div>
                                <p class="text-sm font-medium text-fintech-text">AAPL Stock</p>
                                <p class="text-xs text-fintech-muted">10:4{{ i }} AM</p>
                            </div>
                        </div>
                        <div class="text-right">
                             <p class="text-sm font-medium text-fintech-text">$1,2{{ i }}0.00</p>
                             <p class="text-xs" :class="i % 2 === 0 ? 'text-fintech-success' : 'text-fintech-muted'">Completed</p>
                        </div>
                    </div>
                </div>
            </div>
            
             <div class="bg-fintech-card border border-fintech-border rounded-xl p-6 shadow-sm min-h-[300px]">
                 <h3 class="text-lg font-semibold text-fintech-text mb-4">Portfolio Growth</h3>
                  <div class="h-[250px] w-full">
                    <AreaChart :data="areaChartData" />
                </div>
            </div>
        </div>

    </div>
  </MainLayout>
</template>
