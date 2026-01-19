<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { ref } from 'vue';
import { DocumentTextIcon, ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';

const generating = ref(false);
const report = ref(null);

const generateReport = async () => {
    generating.value = true;
    report.value = null;

    // Simulate Serverless Lambda Cold Start & Execution
    await new Promise(resolve => setTimeout(resolve, 2500));

    report.value = {
        id: 'RPT-' + Math.floor(Math.random() * 100000),
        date: new Date().toLocaleDateString(),
        summary: {
            totalValue: '$1,245,392.00',
            pnl: '+$142,392.20 (12.4%)',
            trades: 145,
            riskAdjustedReturn: '2.4'
        }
    };
    
    generating.value = false;
};
</script>

<template>
  <MainLayout>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-fintech-text mb-2">Reports & Analytics</h1>
      <p class="text-fintech-muted mb-8">Generate on-demand performance reports using our serverless engine.</p>

      <!-- Generator Card -->
      <div class="bg-fintech-card border border-fintech-border rounded-xl p-8 shadow-lg text-center">
        <div class="w-16 h-16 bg-fintech-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <DocumentTextIcon class="w-8 h-8 text-fintech-accent" />
        </div>
        <h2 class="text-xl font-semibold text-fintech-text mb-2">Monthly Performance Report</h2>
        <p class="text-fintech-muted mb-6 max-w-md mx-auto">
            Comprehensive analysis of your portfolio, including risk metrics, P&L attribution, and benchmark comparison.
        </p>
        
        <button 
            @click="generateReport" 
            :disabled="generating"
            class="bg-fintech-accent hover:bg-sky-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-fintech-accent/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait flex items-center mx-auto gap-2"
        >
            <svg v-if="generating" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ generating ? 'Processing Request...' : 'Generate Report' }}
        </button>
        
        <div v-if="generating" class="mt-4 text-xs text-fintech-muted animate-pulse">
            Invoking AWS Lambda function (simulated)...
        </div>
      </div>

      <!-- Result Card -->
      <div v-if="report" class="mt-8 animate-fade-in-up">
        <div class="bg-fintech-secondary/50 border border-fintech-success/30 rounded-xl p-6 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-fintech-success"></div>
            
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-lg font-semibold text-fintech-text flex items-center gap-2">
                        <CheckCircleIcon class="w-5 h-5 text-fintech-success" />
                        Report Ready
                    </h3>
                    <p class="text-sm text-fintech-muted">Generated on {{ report.date }} • ID: {{ report.id }}</p>
                </div>
                <button class="text-fintech-accent hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                    <ArrowDownTrayIcon class="w-4 h-4" />
                    Download PDF
                </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-fintech-primary/50 p-4 rounded-lg">
                    <p class="text-xs text-fintech-muted">Total Value</p>
                    <p class="text-lg font-bold text-fintech-text">{{ report.summary.totalValue }}</p>
                </div>
                <div class="bg-fintech-primary/50 p-4 rounded-lg">
                    <p class="text-xs text-fintech-muted">Net P&L</p>
                    <p class="text-lg font-bold text-fintech-success">{{ report.summary.pnl }}</p>
                </div>
                <div class="bg-fintech-primary/50 p-4 rounded-lg">
                    <p class="text-xs text-fintech-muted">Total Trades</p>
                    <p class="text-lg font-bold text-fintech-text">{{ report.summary.trades }}</p>
                </div>
                <div class="bg-fintech-primary/50 p-4 rounded-lg">
                    <p class="text-xs text-fintech-muted">Risk Adj. Return</p>
                    <p class="text-lg font-bold text-fintech-accent">{{ report.summary.riskAdjustedReturn }}</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  </MainLayout>
</template>

<style scoped>
@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
}
</style>
