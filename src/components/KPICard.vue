<script setup>
defineProps({
    title: String,
    value: String,
    change: String,
    isPositive: Boolean,
    icon: Object
});
</script>

<template>
  <div class="bg-fintech-card border border-fintech-border rounded-xl p-6 hover:border-fintech-accent/50 transition-colors duration-300 card-hover group cursor-pointer relative overflow-hidden">
    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <component :is="icon" class="w-16 h-16 text-fintech-accent" />
    </div>
    
    <div class="flex flex-col relative z-10">
        <span class="text-sm font-medium text-fintech-muted flex items-center gap-2">
            <component :is="icon" class="w-4 h-4" />
            {{ title }}
        </span>
        <span class="text-2xl font-bold text-fintech-text mt-2 tracking-tight">{{ value }}</span>
        <div class="flex items-center mt-3">
             <span 
                class="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center"
                :class="isPositive ? 'bg-fintech-success/10 text-fintech-success' : 'bg-fintech-danger/10 text-fintech-danger'"
             >
                {{ isPositive ? '↑' : '↓' }} {{ change }}
             </span>
             <span class="text-xs text-fintech-muted ml-2">vs last period</span>
        </div>
    </div>
  </div>
</template>
