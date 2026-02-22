<script setup lang="ts">
import { useGlbStore } from '@/utils/glb';
import { computed, watch, onUnmounted } from 'vue';

const { outputs, config, status } = useGlbStore();

const latestOutput = computed(() => outputs[outputs.length - 1] || '');

let canvas: HTMLCanvasElement | null = null;
let video: HTMLVideoElement | null = null;
let pipWindow: PictureInPictureWindow | null = null;
let animationId: number | null = null;

const draw = () => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 24;
    const cornerRadius = 16;
    
    ctx.fillStyle = config.pip.bg;
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = config.pip.fg;
    ctx.beginPath();
    ctx.roundRect(padding, padding, width - padding * 2, height - padding * 2, cornerRadius);
    ctx.fill();
    
    const text = latestOutput.value || '';
    ctx.fillStyle = config.pip.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const maxWidth = width - padding * 4;
    const maxHeight = height - padding * 4;
    let fontSize = Math.min(maxWidth, maxHeight);
    
    ctx.font = `${fontSize}px 'Wanted Sans Std Variable', 'Noto Sans SC', sans-serif`;
    
    while (fontSize > 8) {
        ctx.font = `${fontSize}px 'Wanted Sans Std Variable', 'Noto Sans SC', sans-serif`;
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        
        if (textWidth <= maxWidth) break;
        fontSize -= 2;
    }
    
    ctx.fillText(text, width / 2, height / 2, maxWidth);
};

const renderLoop = () => {
    draw();
    animationId = requestAnimationFrame(renderLoop);
};

const startPip = async () => {
    if (pipWindow) return;
    
    canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 180;
    
    draw();
    
    video = document.createElement('video');
    video.srcObject = canvas.captureStream();
    video.muted = true;
    
    await video.play();
    
    try {
        pipWindow = await video.requestPictureInPicture();
        renderLoop();
        
        pipWindow.addEventListener('leave', () => {
            status.pip = false;
        });
    } catch (e) {
        console.error('PiP failed:', e);
        stopPip();
    }
};

const stopPip = async () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
    }
    pipWindow = null;
    
    if (video) {
        video.pause();
        video.srcObject = null;
        video = null;
    }
    
    canvas = null;
};

watch(() => status.pip, (newVal) => {
    if (newVal) {
        startPip();
    } else {
        stopPip();
    }
});

watch([latestOutput, () => config.pip], draw);

onUnmounted(stopPip);
</script>

<template>
    <div></div>
</template>