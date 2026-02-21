/// <reference types="vite/client" />
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<object, object, unknown>;
    export default component;
};

interface configType {
    ai: {
        baseUrl: string;
        kei: string;
        model: string;
        temp: number;
        pmt: string;
    },
    reqMethod: 'async' | 'wait';
    reqItv: number;
    camPrevMode: 'realtime' | 'match';
    maxHistory: number;
    moreInfo: string;
};
interface statusType {
    pip: boolean;
    isRunning: boolean;
    isShowConfigInvalidDia: boolean;
};