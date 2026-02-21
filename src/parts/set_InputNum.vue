<script lang="ts" setup>
    import { Input } from '@/components/ui/input';
    import { ref, watch } from 'vue';
    
    const props = withDefaults(defineProps<{
        val?: number;
        isInt?: boolean;
        min?: number;
        max?: number;
    }>(), {
        val: 0,
        isInt: false,
        min: 0,
        max: 10,
    });
    const emit = defineEmits<{
        change: [value: number];
    }>();

    const inputValue = ref(String(props.val ?? 0));

    watch(() => props.val, (newVal) => {
        inputValue.value = String(newVal ?? 0);
    });

    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/[^0-9.]/g, '');
        if (props.isInt) {
            value = value.replace(/\./g, '');
        } else {
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            if (value.length > 6) {
                value = value.slice(0, 6);
            }
        }
        if (value === '' || /^0+$/.test(value)) {
            value = '0';
        }
        input.value = value;
        inputValue.value = value;
        let numValue = props.isInt ? parseInt(value) : parseFloat(value);
        if (isNaN(numValue)) numValue = 0;
        if (numValue < props.min) {
            numValue = props.min;
            inputValue.value = String(numValue);
            input.value = String(numValue);
        }
        if (numValue > props.max) {
            numValue = props.max;
            inputValue.value = String(numValue);
            input.value = String(numValue);
        }
        emit('change', numValue);
    };
</script>

<template>
    <Input 
        :model-value="inputValue"
        @input="handleInput"
        type="text"
        inputmode="numeric"
        :pattern="isInt ? '[0-9]*' : '[0-9.]*'"
    />
</template>