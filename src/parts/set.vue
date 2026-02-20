<script lang="ts" setup>
    import { Field, FieldLabel, FieldSet, FieldLegend, FieldDescription } from '@/components/ui/field';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
    import { Button } from '@/components/ui/button';
    import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';

    import InputPw from './set_InputPw.vue';
    import InputNum from './set_InputNum.vue';

    import { ref } from 'vue';
    import { useGlbStore } from '../utils/glb';
    const store = useGlbStore();
    const editingConfig = ref<configType>(JSON.parse(JSON.stringify(store.config)));
    function saveConfig() {
        Object.assign(store.config, editingConfig.value);
    };
</script>

<template>
    <FieldSet>
        <FieldLegend class="text-2xl">模型设置</FieldLegend>
        <div class="flex flex-row gap-3">
            <Field>
                <FieldLabel>BaseURL</FieldLabel>
                <InputGroup>
                    <InputGroupInput placeholder="https://..." v-model="editingConfig.ai.baseUrl" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>/chat/completions</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <FieldDescription>仅支持OpenAI格式API</FieldDescription>
            </Field>
            <Field>
                <FieldLabel>API密钥</FieldLabel>
                <InputPw v-model="editingConfig.ai.kei" />
            </Field>
        </div>
        <div class="flex flex-row gap-3">
            <Field>
                <FieldLabel>模型</FieldLabel>
                <Input v-model="editingConfig.ai.model" />
            </Field>
            <Field>
                <FieldLabel>Temperature</FieldLabel>
                <Select v-model="editingConfig.ai.temp">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem 
                                v-for="value in Array.from({length: 21}, (_, i) => i * 0.05)" 
                                :key="value" 
                                :value="value"
                            >
                                {{ value.toFixed(2) }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FieldDescription>生成结果多样性，Temperatrue越高，随机性越高</FieldDescription>
            </Field>
        </div>
        <Field>
            <FieldLabel>系统提示词</FieldLabel>
            <Textarea v-model="editingConfig.ai.pmt" />
        </Field>
        <FieldLegend class="text-2xl">请求设置</FieldLegend>
        <div class="flex flex-row gap-3"> 
            <Field>
                <FieldLabel>请求方式</FieldLabel>
                <Select v-model="editingConfig.reqMethod">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="async">
                                间隔固定时间请求
                            </SelectItem>
                            <SelectItem value="wait">
                                上一次请求结束后等待固定时间请求
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Field>
                <FieldLabel>间隔时间</FieldLabel>
                <InputNum :val="editingConfig.reqItv" @change="(newVal: number)=>{editingConfig.reqItv = newVal}" />
            </Field>
            <Field>
                <FieldLabel>上下文留存图像数</FieldLabel>
                <InputNum :val="editingConfig.maxHistory" @change="(newVal: number)=>{editingConfig.maxHistory = newVal}" :is-int="true" :max="50" />
            </Field>
        </div>
        <FieldLegend class="text-2xl">其他设置</FieldLegend>
        <Field>
            <FieldLabel>预览画面显示模式</FieldLabel>
            <Select v-model="editingConfig.camPrevMode">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="realtime">
                            实时显示摄像头画面
                        </SelectItem>
                        <SelectItem value="match">
                            显示返回结果对应的请求的画面
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
        <Field>
            <FieldLabel>给AI的补充信息</FieldLabel>
            <Textarea v-model="editingConfig.moreInfo" />
            <FieldDescription>可选，会添加到系统提示词中</FieldDescription>
        </Field>
    </FieldSet>
    <FieldSet class="flex flex-row gap-3 justify-end"> 
        <Button size="lg" @click="saveConfig">保存</Button>
    </FieldSet>
</template>
