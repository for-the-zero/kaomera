<script setup lang="ts">
    import DrawerBtn from './parts/drawer.vue';
    import Prev from './parts/preview.vue';
    import { Button } from '@/components/ui/button';
    import { Play, Pause } from 'lucide-vue-next';
    import { useGlbStore } from '@/utils/glb';

    const { outputs, status } = useGlbStore();
    function displayerCopy(){
        navigator.clipboard.writeText(outputs[0]);
    };
</script>

<template>
    <Prev />
    <DrawerBtn />
    <Button variant="secondary"
        class="fixed bottom-7.5 left-1/2 transform -translate-x-1/2 text-3xl w-auto h-auto px-6 py-4"
        v-if="outputs.length >= 1 && status.isRunning"
        @click="displayerCopy"
    >
        {{ outputs[0] }}
    </Button>
    <Button :variant="status.isRunning ? 'destructive' : 'default'"
        class="fixed bottom-7.5 left-7.5"
        @click="()=>{status.isRunning = !status.isRunning}"
    >
        <Pause v-if="status.isRunning" />
        <Play v-else />
        {{ status.isRunning ? "停止" : "启动" }}
    </Button>
</template>
