<template>
    <div class="chart">
        <h2>Количество пользователей и преподавателей по месяцам</h2>
        <button @click="toggleRotationData" class="toggle-button">
            {{
                showRotationData
                    ? "Скрыть данные ротации"
                    : "Показать данные ротации"
            }}
        </button>
        <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
        <p v-else>Загрузка данных...</p>
    </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import axios from "axios";
import { ref, watch } from "vue";

// Регистрация плагинов chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

// URL JSON-файла
const jsonUrl = "/DATA-Hackaton-MSTU/clusters_data.json"; // Замените на реальный URL

// Состояние компонента
let chartData = ref(null);
let rawClusters = ref(null); // Для хранения исходных данных
let chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Статистика кластеров по месяцам",
        },
        legend: {
            position: "bottom", // Перемещаем легенду вниз
            labels: {
                boxWidth: 20, // Ширина цветных прямоугольников в легенде
                font: {
                    size: 14, // Размер шрифта в легенде
                },
            },
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Месяцы",
            },
        },
        y: {
            title: {
                display: true,
                text: "Значения",
            },
        },
    },
});

// Данные ротации
const rotationData = [
    0, 20.4759459, 6.31434454, 20.5357143, 220.895971, 19.100346, 384.317362,
    160.279915, 0, 0, 0, 119.784624,
];

// Состояние для отображения данных ротации
let showRotationData = ref(false);

// Функция для группировки данных по месяцам с округлением вверх
function groupByMonths(clusters) {
    const monthsData = {
        pointsCount: Array(12).fill(0),
        sumY: Array(12).fill(0),
    };

    clusters.forEach((cluster, index) => {
        const weekIndex = index % 52; // Неделя от 0 до 51
        const monthIndex = Math.floor(weekIndex / 4); // Преобразуем недели в месяцы (0-11)

        if (monthIndex >= 0 && monthIndex < 12) {
            monthsData.pointsCount[monthIndex] += cluster.points_count;
            monthsData.sumY[monthIndex] += cluster.sum_y;

            // Если показывать ротацию, добавляем её к sumY
            if (showRotationData.value) {
                monthsData.sumY[monthIndex] += rotationData[monthIndex] || 0;
            }
        }
    });

    // Округляем значения вверх
    monthsData.pointsCount = monthsData.pointsCount.map(Math.ceil);
    monthsData.sumY = monthsData.sumY.map(Math.ceil);

    return monthsData;
}

// Функция для первоначальной загрузки данных
async function fetchInitialData() {
    try {
        const response = await axios.get(jsonUrl);
        return response.data.clusters;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

// Функция для создания данных графика
function createChartData(clusters) {
    if (!clusters) return;

    // Группируем данные по месяцам
    const groupedData = groupByMonths(clusters);

    // Создаем данные для графика
    chartData.value = {
        labels: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        datasets: [
            {
                label: "Количество пользователей",
                data: groupedData.pointsCount,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Количество преподавателей",
                data: groupedData.sumY,
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
            },
        ],
    };
}

// Функция для обновления данных графика
function updateChartData(clusters) {
    createChartData(clusters);
}

// При монтировании компонента загружаем данные
fetchInitialData().then((data) => {
    rawClusters.value = data;
    updateChartData(data);
});

// Функция для переключения отображения данных ротации
function toggleRotationData() {
    showRotationData.value = !showRotationData.value;

    // При переключении обновляем данные графика
    if (rawClusters.value) {
        updateChartData(rawClusters.value);
    }
}
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

    .toggle-button {
        margin-bottom: 10px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #0056b3;
        }
    }
}
</style>
