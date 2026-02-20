<script setup lang="ts">
    import { Button } from '@/components/ui/button';
    import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
    import { Github, FileUser, GalleryHorizontalEnd } from 'lucide-vue-next';
</script>

<template>
    <div class="flex flex-col justify-center gap-4 w-full">
        <h1 class="text-center text-6xl">(/ ≧▽≦ )/</h1>
        <h1 class="text-center text-4xl">Kaomera</h1>
        <p class="text-center">把你的摄像头画面发给vLLM，让它给你一个颜文字</p>
        <div class="flex flex-row justify-center gap-2">
            <TooltipProvider><Tooltip>
                <TooltipTrigger><Button size="icon" variant="outline" as-child><a href="https://github.com/for-the-zero/kaomera" target="_blank"><Github /></a></Button></TooltipTrigger>
                <TooltipContent>Github</TooltipContent>
            </Tooltip></TooltipProvider>
            <TooltipProvider><Tooltip>
                <TooltipTrigger><Button size="icon" variant="outline" as-child><a href="https://ftz.is-a.dev/" target="_blank"><FileUser /></a></Button></TooltipTrigger>
                <TooltipContent>作者的个人主页</TooltipContent>
            </Tooltip></TooltipProvider>
            <TooltipProvider><Tooltip>
                <TooltipTrigger><Button size="icon" variant="outline" as-child><a href="https://github.com/for-the-zero/Free-LLM-Collection" target="_blank"><GalleryHorizontalEnd /></a></Button></TooltipTrigger>
                <TooltipContent>Free-LLM-Collection</TooltipContent>
            </Tooltip></TooltipProvider>
        </div>
    </div>
</template>