<script setup lang="ts">
    import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from '@/components/ui/input-group';
    import { Eye, EyeClosed } from 'lucide-vue-next';
    import { ref } from 'vue';
    const isVisible = ref(false);
    const val = defineModel()
</script>

<template>
    <InputGroup>
        <InputGroupInput :type="isVisible ? 'text' : 'password'" v-model="val" />
        <InputGroupAddon align="inline-end">
            <InputGroupButton @click="isVisible = !isVisible">
                <Eye v-if="isVisible" />
                <EyeClosed v-else />
            </InputGroupButton>
        </InputGroupAddon>
    </InputGroup>
</template>