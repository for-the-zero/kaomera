<script setup lang="ts">
    import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Button } from '@/components/ui/button';
    import { PanelBottomOpen } from 'lucide-vue-next';
    import AboutPage from './parts/about.vue';
</script>

<template>
    <Drawer>
        <DrawerTrigger as-child>
            <Button variant="outline" class="fixed bottom-7.5 right-7.5" size="icon-lg"><PanelBottomOpen /></Button>
        </DrawerTrigger>
        <DrawerContent class="min-h-[75vh] m-auto w-screen sm:w-[60vw]">
            <Tabs default-value="output" class="p-3">
                <TabsList>
                    <TabsTrigger value="output">
                        输出
                    </TabsTrigger>
                    <TabsTrigger value="set">
                        设置
                    </TabsTrigger>
                    <TabsTrigger value="about">
                        关于
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="output">
                    1<!-- TODO: -->
                </TabsContent>
                <TabsContent value="set">
                    2<!-- TODO: -->
                </TabsContent>
                <TabsContent value="about">
                    <AboutPage />
                </TabsContent>
            </Tabs>
        </DrawerContent>
    </Drawer>
</template>
