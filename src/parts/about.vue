<script setup lang="ts">
    import { Button } from '@/components/ui/button';
    import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
    import { Github, FileUser, GalleryHorizontalEnd } from 'lucide-vue-next';
</script>

<template>
    <div class="flex flex-col justify-center gap-4">
        <h1 class="text-center text-6xl">(/ ≧▽≦ )/</h1>
        <div class="flex flex-row justify-center gap-2">
            <Tooltip>
                <TooltipTrigger><Button size="icon" as-child><a href="https://github.com/for-the-zero/kaomera" target="_blank"><Github /></a></Button></TooltipTrigger>
                <TooltipContent>Github</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button size="icon" as-child><a href="https://ftz.is-a.dev/" target="_blank"><FileUser /></a></Button></TooltipTrigger>
                <TooltipContent>作者的个人主页</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger><Button size="icon" as-child><a href="https://github.com/for-the-zero/Free-LLM-Collection" target="_blank"><GalleryHorizontalEnd /></a></Button></TooltipTrigger>
                <TooltipContent>Free-LLM-Collection</TooltipContent>
            </Tooltip>
        </div>
    </div>
</template>