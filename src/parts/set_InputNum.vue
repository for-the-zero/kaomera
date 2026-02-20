<script lang="ts" setup>
    import { Input } from '@/components/ui/input';
    import { ref } from 'vue';
    
    const inputValue = ref('')

    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement
        // 只允许输入数字
        input.value = input.value.replace(/[^0-9]/g, '')
        inputValue.value = input.value
    }
</script>

<template>
    <Input 
        v-model="inputValue"
        @input="handleInput"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
    />
</template>