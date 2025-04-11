<template>
    <NuxtLoadingIndicator />
    <div
        class="default-layout"
        :class="[
            { 'use-max-width': useMaxWidth },
            { 'use-max-height': useMaxHeight },
        ]"
    >
        <Header />
        <slot name="for-teleports" />
        <div class="default-layout__content">
            <slot />
        </div>
    </div>
</template>
<script setup>
defineProps({
    useMaxWidth: {
        type: Boolean,
        default: true,
    },
    useMaxHeight: {
        type: Boolean,
        default: false,
    },
});
</script>
<style lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 100%;
    overflow-y: auto;
    isolation: isolate;

    &__content {
        max-width: 1200px;
        flex: 1;
        min-width: 0;
        max-height: 100%;
        width: 100%;
        margin: 0 auto;
        z-index: 0;
        padding: 10px;
    }
}
</style>
