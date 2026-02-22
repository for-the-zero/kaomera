<script setup lang="ts">
    import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
    import { ref, watch, computed } from 'vue';
    
    const model = defineModel<string>({ default: '#000000' });
    
    const displayValue = ref(model.value.replace('#', ''));
    
    watch(model, (newVal) => {
        displayValue.value = newVal.replace('#', '');
    });
    
    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6).toUpperCase();
        input.value = value;
        displayValue.value = value;
        model.value = '#' + value;
    };
    
    const colorPickerValue = computed({
        get: () => {
            const hex = model.value.replace('#', '');
            if (hex.length === 6 && /^[0-9a-fA-F]{6}$/.test(hex)) {
                return '#' + hex;
            }
            return '#000000';
        },
        set: (val: string) => {
            const hex = val.replace('#', '').toUpperCase();
            displayValue.value = hex;
            model.value = '#' + hex;
        }
    });
</script>

<template>
    <InputGroup>
        <InputGroupAddon align="inline-start">
            <input 
                type="color" 
                class="rounded-full aspect-square w-5 h-5 cursor-pointer border-0 p-0"
                v-model="colorPickerValue"
            />
            <InputGroupText>#</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput 
            :model-value="displayValue"
            @input="handleInput"
            placeholder="000000"
            maxlength="6"
        />
    </InputGroup>
</template>
