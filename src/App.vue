<script setup lang="ts">
    import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
</script>

<template>
    <SidebarProvider>
        <Sidebar side="right" collapsible="icon">
            <SidebarContent>
                <Tabs default-value="output" class="p-3 w-[33vw]">
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
                        3<!-- TODO: -->
                    </TabsContent>
                </Tabs>
            </SidebarContent>
        </Sidebar>
        <main>
            114514<!-- TODO: -->
        </main>
    </SidebarProvider>
</template>
