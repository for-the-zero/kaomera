<script setup lang="ts">
    import { CircleSlash2 } from 'lucide-vue-next';
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useGlbStore } from '@/utils/glb';
    import PiPScript from './pip.vue';

    const store = useGlbStore();
    const { displayingFrame, config } = storeToRefs(store);
    const camUsable = ref(false);
    const camEleRef = ref<HTMLVideoElement | null>(null);

    onMounted(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (camEleRef.value) {
                    camEleRef.value.srcObject = stream;
                    camEleRef.value.play();
                    camUsable.value = true;
                };
            })
            .catch((err) => {
                console.error(err);
                camUsable.value = false;
            });
        store.getFrame = () => {
            if (!camEleRef.value || !camUsable.value) return null;
            const video = camEleRef.value;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            ctx.drawImage(video, 0, 0);
            return canvas.toDataURL('image/png');
        };
    });
</script>

<template>
    <PiPScript />
    <div class="relative w-screen h-screen overflow-hidden">
        <video ref="camEleRef" v-show="config.camPrevMode == 'realtime'" class="absolute inset-0 w-full h-full object-contain scale-x-[-1]" playsinlineautoplay muted></video>
        <img v-show="config.camPrevMode == 'match' && displayingFrame" class="absolute inset-0 w-full h-full object-contain scale-x-[-1]" :src="displayingFrame">
    </div>

    <div v-if="config.camPrevMode == 'match' && !displayingFrame"
        class="flex flex-row justify-center gap-3 fixed top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2">
        <CircleSlash2 />
        <p>暂无画面</p>
    </div>
    <div v-if="!camUsable && config.camPrevMode == 'realtime'"
        class="flex flex-row justify-center gap-3 fixed top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2">
        <CircleSlash2 />
        <p>摄像头暂不可用，请检查网页权限</p>
    </div>
</template>