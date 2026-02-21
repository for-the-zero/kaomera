import { useGlbStore } from "./glb";

let picHistory: string[] = [];
let interval: ReturnType<typeof setInterval> | undefined;

export const btnOnClick = () => {
    const { config, status } = useGlbStore();
    if(status.isRunning){
        if(interval){
            clearInterval(interval);
        };
        status.isRunning = false;
        return;
    };
    if (!config.ai.baseUrl || !config.ai.model || !config.ai.pmt){
        status.isShowConfigInvalidDia = true;
        return;
    };
    status.isRunning = true;
    if(config.reqMethod === 'async'){
        interval = setInterval(() => {
            req();
        }, config.reqItv * 1000);
    } else {
        req(true);
    };
    
};

function req(isWait: boolean = false){
    const { config, outputs, getFrame, status } = useGlbStore();
    if(!getFrame){return;};
    let pic = getFrame();
    if(!pic){return;};
    while(picHistory.length >= config.maxHistory){
        picHistory.shift();
    };
    picHistory.push(pic);
    fetch(config.ai.baseUrl + '/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.ai.kei}`
        },
        body: JSON.stringify({
            model: config.ai.model,
            temperature: config.ai.temp,
            stream: false,
            messages: [
                {
                    role: 'system',
                    content: config.ai.pmt
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `过往的画面：`
                        },
                        ...picHistory.slice(0, -1).map((pic) => ({
                            type: 'image_url',
                            image_url: { url: pic }
                        })),
                        {
                            type: 'text',
                            text: `${config.moreInfo ? `补充信息：${config.moreInfo}\n` : ''}最后一个画面：`
                        },
                        {
                            type: 'image_url',
                            image_url: { url: picHistory[picHistory.length - 1] }
                        }
                    ]
                }
            ]
        })
    }).then((res) => {
        if(!res.ok){
            if(outputs[outputs.length-1] !== '[error]'){
                outputs.push('[error]');
                if(isWait){
                    status.isRunning = false
                };
            };
        };
        res.json().then((data)=>{
            if(data.choices[0].message.content && /```kaomoji[\s\S]*?```/.test(data.choices[0].message.content)){
                let content = [...data.choices[0].message.content.matchAll(/```kaomoji\n([\s\S]*?)```/g)].pop()?.[1];
                if(outputs[outputs.length-1] == '[error]'){
                    outputs[outputs.length-1] = content;
                } else {
                    outputs.push(content);
                    useGlbStore().displayingFrame = pic;
                    if(isWait && status.isRunning){
                        setTimeout(() => {
                            if(useGlbStore().status.isRunning){
                                req(true);
                            };
                        }, config.reqItv * 1000);
                    };
                };
            } else {
                if(outputs[outputs.length-1] !== '[error]'){
                    outputs.push('[error]');
                    if(isWait){
                        status.isRunning = false
                    };
                };
            };
        });
    }).catch((e)=>{
        console.error(e);
        if(outputs[outputs.length-1] !== '[error]'){
            outputs.push('[error]');
            if(isWait){
                status.isRunning = false
            };
        };
    });
};