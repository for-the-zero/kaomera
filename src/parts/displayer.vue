<script setup lang="ts">
    import { Button } from '@/components/ui/button';
    import { useGlbStore } from '@/utils/glb';
    const { outputs, status } = useGlbStore();
    function copy(){
        navigator.clipboard.writeText(outputs[0]);
    };
</script>

<template>
    <Button variant="secondary"
        class="fixed bottom-7.5 left-1/2 transform -translate-x-1/2 text-3xl w-auto h-auto px-6 py-4"
        v-if="outputs.length >= 1 && status.isRunning"
        @click="copy"
    >
        {{ outputs[0] }}
    </Button>
</template>