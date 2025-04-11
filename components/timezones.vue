<template>
    <div class="chart">
        <h2>Статистика пользователей и организаций по часовым зонам</h2>
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
import { ref, onMounted } from "vue";

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
const jsonUrl = "/timezone_info.json"; // Замените на реальный URL

// Состояние компонента
let chartData = ref(null);
let chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Количество пользователей и организаций по часовым зонам",
        },
        legend: {
            position: "bottom", // Легенда внизу
            labels: {
                boxWidth: 20, // Ширина цветных прямоугольников
                font: {
                    size: 14, // Размер шрифта
                },
            },
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Часовые зоны",
            },
        },
        y: {
            title: {
                display: true,
                text: "Количество",
            },
        },
    },
});
// Функция для создания данных графика
function createChartData(clusters) {
    if (!clusters) return;

    const labels = clusters.map((cluster) => cluster.time_zone);
    const usersData = clusters.map((cluster) => cluster.users_count);
    const organizationsData = clusters.map(
        (cluster) => cluster.organizations_count
    );

    chartData.value = {
        labels,
        datasets: [
            {
                label: "Количество пользователей",
                data: usersData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Количество организаций",
                data: organizationsData,
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
            },
        ],
    };
}

// Функция для загрузки данных
async function fetchClustersData() {
    try {
        const response = await axios.get(jsonUrl);
        const clusters = response.data.clusters;
        createChartData(clusters);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

// При монтировании компонента загружаем данные
onMounted(() => {
    fetchClustersData();
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
