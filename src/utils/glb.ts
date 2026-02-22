import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import pmtText from './prompt.md?raw';

export const useGlbStore = defineStore('glbStore', () => {
    let ls = localStorage.getItem('kaomoji');
    if(ls){
        try{
            JSON.parse(ls);
        } catch(e) {
            ls = null;
        };
    };
    const config = ref<configType>((ls ? JSON.parse(ls) : null) || {
        ai: {
            baseUrl: '',
            kei: '',
            model: '',
            temp: 0.5,
            pmt: pmtText,
        },
        reqMethod: 'async',
        reqItv: 0.2,
        camPrevMode: 'realtime',
        maxHistory: 3,
        moreInfo: '',
        pip: { bg: '#0000FF', fg: "#FFFFFF", text: "#000000" }
    });
    watch(
        config,
        (newConfig) => {
            localStorage.setItem('kaomoji', JSON.stringify(newConfig));
        },
        { deep: true }
    );

    const displayingFrame = ref<string>('');
    const outputs = ref<string[]>([]);
    const status = ref<statusType>({
        pip: false,
        isRunning: false,
        isShowConfigInvalidDia: false,
    });
    const getFrame = ref<(() => string | null) | null>(null);

    return { displayingFrame, config, outputs, status, getFrame };
});