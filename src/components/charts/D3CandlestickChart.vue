<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  height: {
    type: Number,
    default: 500
  }
});

const chartContainer = ref(null);
const tooltip = ref({ visible: false, x: 0, y: 0, data: null });

const renderChart = () => {
    if (!chartContainer.value || !props.data.length) return;

    // Clear previous
    d3.select(chartContainer.value).selectAll("*").remove();

    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    const width = chartContainer.value.clientWidth - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    const svg = d3.select(chartContainer.value)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dates
    const x = d3.scaleTime()
        .domain(d3.extent(props.data, d => d.date))
        .range([0, width]);

    // Prices
    const y = d3.scaleLinear()
        .domain([
            d3.min(props.data, d => d.low) * 0.99, 
            d3.max(props.data, d => d.high) * 1.01
        ])
        .range([height, 0]);

    // Gridlines
    const make_x_gridlines = () => d3.axisBottom(x).ticks(5);
    const make_y_gridlines = () => d3.axisLeft(y).ticks(5);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .style("stroke-opacity", 0.1)
        .style("color", "#334155")
        .call(make_x_gridlines().tickSize(-height).tickFormat(""));

    svg.append("g")
        .attr("class", "grid")
        .style("stroke-opacity", 0.1)
        .style("color", "#334155")
        .call(make_y_gridlines().tickSize(-width).tickFormat(""));

    // Axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .classed("text-fintech-muted text-xs font-sans", true)
        .select(".domain").remove();

    svg.append("g")
        .call(d3.axisLeft(y))
        .classed("text-fintech-muted text-xs font-sans", true)
        .select(".domain").remove();

    // Candles
    const candleWidth = Math.max(2, (width / props.data.length) * 0.7);

    // Stems
    svg.selectAll("line.stem")
        .data(props.data)
        .enter()
        .append("line")
        .attr("class", "stem")
        .attr("x1", d => x(d.date))
        .attr("x2", d => x(d.date))
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", d => d.open > d.close ? "#EF4444" : "#10B981")
        .attr("stroke-width", 1.5);

    // Rects
    svg.selectAll("rect.candle")
        .data(props.data)
        .enter()
        .append("rect")
        .attr("class", "candle")
        .attr("x", d => x(d.date) - candleWidth / 2)
        .attr("y", d => y(Math.max(d.open, d.close)))
        .attr("width", candleWidth)
        .attr("height", d => Math.max(1, Math.abs(y(d.open) - y(d.close))))
        .attr("fill", d => d.open > d.close ? "#EF4444" : "#10B981")
        .on("mouseenter", (event, d) => {
            tooltip.value = {
                visible: true,
                x: event.clientX,
                y: event.clientY,
                data: d
            };
            d3.select(event.currentTarget).attr("opacity", 0.7);
        })
        .on("mouseleave", (event) => {
            tooltip.value.visible = false;
            d3.select(event.currentTarget).attr("opacity", 1);
        });
        
     // Overlay for crosshair (simplified)
};

// Resize Observer
let resizeObserver = null;

onMounted(() => {
    renderChart();
    resizeObserver = new ResizeObserver(() => {
        renderChart();
    });
    resizeObserver.observe(chartContainer.value);
});

onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
});

watch(() => props.data, renderChart, { deep: true });
</script>

<template>
  <div class="relative w-full h-full bg-fintech-card rounded-xl border border-fintech-border shadow-sm p-4">
    <div ref="chartContainer" class="w-full h-full"></div>
    
    <!-- Custom Tooltip -->
    <div 
        v-if="tooltip.visible"
        class="absolute z-50 bg-fintech-secondary border border-fintech-border text-fintech-text text-sm p-3 rounded shadow-xl pointer-events-none"
        :style="{ left: Math.min(tooltip.x - 20, chartContainer.clientWidth - 150) + 'px', top: '10px' }" 
    >
        <div class="font-bold mb-1">{{ tooltip.data.date.toLocaleDateString() }}</div>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span class="text-fintech-muted">Open:</span> <span>{{ tooltip.data.open.toFixed(2) }}</span>
            <span class="text-fintech-muted">High:</span> <span>{{ tooltip.data.high.toFixed(2) }}</span>
            <span class="text-fintech-muted">Low:</span> <span>{{ tooltip.data.low.toFixed(2) }}</span>
            <span class="text-fintech-muted">Close:</span> 
            <span :class="tooltip.data.close >= tooltip.data.open ? 'text-fintech-success' : 'text-fintech-danger'">
                {{ tooltip.data.close.toFixed(2) }}
            </span>
        </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.domain) { display: none; }
:deep(.tick line) {
     stroke: #334155 !important;
     opacity: 0.2;
}
:deep(.tick text) {
    fill: #94A3B8;
}
</style>
