import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import pmtText from './prompt.md?raw';

export const useGlbStore = defineStore('glbStore', () => {
    let ls = localStorage.getItem('kaomoji');
    try{
        JSON.parse(ls || '{}');
    } catch(e) {
        ls = null;
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
    });
    watch(
        config,
        (newConfig) => {
            localStorage.setItem('kaomoji', JSON.stringify(newConfig));
        },
        { deep: true }
    );

    const camQuote = ref<string[]>([]);
    const outputs = ref<string[]>([]);
    const status = ref<statusType>({
        pip: false,
        isRunning: false
    });
    const getFrame = ref<(() => string | null) | null>(null);

    return { camQuote, config, outputs, status, getFrame };
});