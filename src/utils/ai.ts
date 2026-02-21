import { useGlbStore } from "./glb";

let camQuote: string[], config: configType, outputs: string[], status: statusType, getFrame: (() => string | null) | null;
export const setup = () => {
    ({ camQuote, config, outputs, status, getFrame } = useGlbStore());
};

export const btnOnClick = () => {
    if(!status){return;};
    if(status.isRunning){status.isRunning = false;return;};
    if (
        !camQuote || !config || !outputs || !getFrame ||
        !config.ai.baseUrl || !config.ai.model || !config.ai.pmt
    ){
        status.isShowConfigInvalidDia = true;
        return;
    };
    // TODO:
    status.isRunning = !status.isRunning;
};

async function req(){
    // TODO:
};