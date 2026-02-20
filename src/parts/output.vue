<script setup lang="ts">
    import { Button } from '@/components/ui/button';
    import { Separator } from '@/components/ui/separator';
    import { PictureInPicture2 } from 'lucide-vue-next';

    import { ref } from 'vue';
    import { useGlbStore } from '@/utils/glb';
    const { outputs, status } = useGlbStore();
    
    const copyNoticing = ref(false);
    let noticeTimeout: any;

    function copyText(text: string) {
        navigator.clipboard.writeText(text);
        copyNoticing.value = true;
        if(noticeTimeout){clearTimeout(noticeTimeout)};
        noticeTimeout = setTimeout(() => {
            copyNoticing.value = false;
        }, 750);
    };
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.1s cubic-bezier(0.3, 0.35, 0, 1.00);
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>

<template>
    <div class="w-[90%] flex flex-row justify-between m-auto">
        <Transition name="fade" mode="out-in">
            <p :key="copyNoticing ? 'copied' : 'default'" class="text-muted-foreground opacity-100">
                {{ copyNoticing ? '已复制~' : '点击即可复制文本，记录仅在这一会话中保留' }}
            </p>
        </Transition>
        
        <Button size="icon" 
            :variant="status.pip ? 'default' : 'outline'"
            @click="status.pip = !status.pip"
        >
            <PictureInPicture2 />
        </Button>
    </div>
    <Separator class="my-3" />
    <div>
        <Button 
            variant="outline" size="lg" 
            class="mr-2 mb-2"
            v-for="value in outputs"
            @click="copyText(value)"
        >
            {{ value }}
        </Button>
    </div>
</template>