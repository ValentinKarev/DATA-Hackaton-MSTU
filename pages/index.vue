<template>
    <div class="index-page">
        <Rotation />
        <Timezones />
        <Organizations />
        <table-data />
        <a href="data.csv" class="link" download target="_blank">
            Скачать обработанный датасет
        </a>
    </div>
</template>
<style scoped land="scss">
.index-page {
    display: flex;
    flex-direction: column;
    gap: 100px;
    padding-bottom: 20px;

    .link {
        margin-top: -80px;
        background-color: black;
        color: white;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
    }
}
</style>
