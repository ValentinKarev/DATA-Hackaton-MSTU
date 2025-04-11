<template>
    <div class="chart">
        <h2>Процентное соотношение школ, вузов и колледжей</h2>
        <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
        <p v-else>Загрузка данных...</p>
    </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from "chart.js";
import { ref, onMounted } from "vue";

// Регистрация плагинов chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Состояние компонента
let chartData = ref(null);
let chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%", // Создает "донат" вместо полного круга для лучшей видимости
    plugins: {
        title: {
            display: true,
            text: "Процентное соотношение школ, вузов и колледжей",
        },
        legend: {
            position: "bottom", // Легенда внизу
            labels: {
                generateLabels: (chart) => {
                    const datasets = chart.data.datasets[0];
                    return chart.data.labels.map((label, index) => {
                        const text =
                            index == 2
                                ? 0.075028
                                : datasets.data[index].toFixed(2);
                        return {
                            text: `${label}: ${text}%`, // Добавляем проценты
                            fillStyle: datasets.backgroundColor[index],
                            strokeStyle: datasets.borderColor[index],
                            lineWidth: 1,
                        };
                    });
                },
            },
        },
    },
});

// Функция для создания данных графика
function createChartData() {
    const labels = ["Вузы", "Школы", "Колледжи"];
    const data = [96.77751, 3.147462, 2];

    chartData.value = {
        labels,
        datasets: [
            {
                label: "Процентное соотношение",
                data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
}

// При монтировании компонента создаем данные для графика
onMounted(() => {
    createChartData();
});
</script>

<style scoped lang="scss">
.chart {
    width: 100%;
    height: 400px;
    margin: 20px auto;
    text-align: center;

    h2 {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #333;
    }
}
</style>
