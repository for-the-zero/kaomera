import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCameraStore = defineStore('camera', () => {
    const camQuote = ref<string[]>([]);
    const config = ref<configType>({
        ai: {
            baseUrl: '',
            kei: '',
            model: '',
            temp: 0.5,
            pmt: '',
        },
        reqMethod: 'async',
        reqItv: 0.2,
        camPrevMode: 'realtime',
        maxHistory: 3,
    });
    const outputs = ref<string[]>([]);
    const status = ref<statusType>({
        pip: false,
        isRunning: false
    });
    return { camQuote, config, outputs, status };
})