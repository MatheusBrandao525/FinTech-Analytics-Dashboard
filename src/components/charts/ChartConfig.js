import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Filler
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Filler
)

export const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#94A3B8', // fintech-muted
                font: {
                    family: "'Inter', sans-serif",
                    size: 11
                }
            }
        },
        tooltip: {
            backgroundColor: '#1E293B',
            titleColor: '#F8FAFC',
            bodyColor: '#F8FAFC',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            usePointStyle: true,
        }
    },
    scales: {
        x: {
            grid: {
                color: '#334155', // fintech-border
                drawBorder: false,
            },
            ticks: {
                color: '#94A3B8'
            }
        },
        y: {
            grid: {
                color: '#334155',
                drawBorder: false,
            },
            ticks: {
                color: '#94A3B8'
            }
        }
    }
}
