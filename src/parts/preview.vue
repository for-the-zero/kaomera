<script setup lang="ts">
    import { CircleSlash2 } from 'lucide-vue-next';
    import { ref, onMounted } from 'vue';
    import { useGlbStore } from '@/utils/glb';
    
    const store = useGlbStore();
    const { camQuote, config } = useGlbStore();
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
    <div class="relative w-screen h-screen overflow-hidden">
        <video ref="camEleRef" v-show="config.camPrevMode == 'realtime'" class="absolute inset-0 w-full h-full object-contain scale-x-[-1]" playsinlineautoplay muted></video>
        <img v-show="config.camPrevMode == 'match' && camQuote.length > 0" class="absolute inset-0 w-full h-full object-cover" :src="camQuote[0]">
    </div>

    <div v-if="config.camPrevMode == 'match' && camQuote.length == 0"
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