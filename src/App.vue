<script setup lang="ts">
    import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Button } from '@/components/ui/button';
    import { PanelBottomOpen } from 'lucide-vue-next';
    import AboutPage from './parts/about.vue';
    import SetPage from './parts/set.vue';
    import { useGlbStore } from './utils/glb';
    const { config } = useGlbStore();
</script>

<template>
    <Drawer>
        <DrawerTrigger as-child>
            <Button variant="outline" class="fixed bottom-7.5 right-7.5" size="icon-lg"><PanelBottomOpen /></Button>
        </DrawerTrigger>
        <DrawerContent class="h-[80vh] m-auto w-screen sm:w-[60vw]">
            <div class="overflow-y-auto h-full">
                <Tabs default-value="output" class="p-5">
                    <TabsList class="mb-3">
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
                        <!-- TODO: -->
                        {{ config.moreInfo }}
                    </TabsContent>
                    <TabsContent value="set">
                        <SetPage />
                    </TabsContent>
                    <TabsContent value="about">
                        <AboutPage />
                    </TabsContent>
                </Tabs>
            </div>
        </DrawerContent>
    </Drawer>
    <!-- TODO: -->
</template>
