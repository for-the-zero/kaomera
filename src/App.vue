<script setup lang="ts">
    import DrawerBtn from './parts/drawer.vue';
    import Prev from './parts/preview.vue';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Play, Pause } from 'lucide-vue-next';
    import { useGlbStore } from '@/utils/glb';
    import { btnOnClick } from '@/utils/ai';

    const { outputs, status } = useGlbStore();
    function displayerCopy(){
        navigator.clipboard.writeText(outputs[outputs.length - 1]);
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
        {{ outputs[outputs.length - 1] }}
    </Button>
    <Button :variant="status.isRunning ? 'destructive' : 'default'"
        class="fixed bottom-7.5 left-7.5"
        @click="btnOnClick"
    >
        <Pause v-if="status.isRunning" />
        <Play v-else />
        {{ status.isRunning ? "停止" : "启动" }}
    </Button>

    <Dialog v-model:open="status.isShowConfigInvalidDia">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>AI模型配置不太对哦</DialogTitle>
                <DialogDescription>到设置里检查一下吧</DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
