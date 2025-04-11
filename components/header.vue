<template>
    <header>
        <div class="header_logo" href="/">ASU_TEAM</div>
    </header>
</template>

<script setup></script>
<style lang="scss" scoped>
header {
    color: black;
    user-select: none;
    border-bottom: 1px solid rgb(230, 230, 230);
    height: 60px;
    width: 100%;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    .header_logo {
        font-size: 16px;
        font-weight: 600;
        color: black;
        text-decoration: none;
        padding-left: 20px;
        padding-right: 20px;
        line-height: 60px;
        height: 60px;
        display: inline-block;
        transition: color 0.1s;

        &:hover {
            color: #0066ff;
            text-decoration: none;
        }
    }
}
</style>
