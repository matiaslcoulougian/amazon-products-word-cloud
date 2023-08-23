import React, { useEffect, useState } from 'react';
import WordCloud, {Options} from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

type WordFrequency = {
    text: string;
    value: number;
};

export const WordCloudComponent: React.FC = () => {
    const [data, setData] = useState<WordFrequency[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/stream');

        eventSource.onmessage = (event) => {
            const incomingData = JSON.parse(event.data) as { word: string, frequency: number }[];
            const newData: WordFrequency[] = incomingData.map((item) => ({ text: item.word, value: item.frequency }));
            setData(newData);
        };

        eventSource.onopen = () => {
            console.log('Connection established');
        }

        return () => eventSource.close();
    }, []);

    const options = {
        rotations: 2,
        rotationAngles: [0, 90],
        fontSizes: [10, 60],
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
    } as Options;

    return (
        <div>
            { data.length > 0 ?
                <div style={{ width: '100%', height: '400px' }}>
                    <WordCloud
                        options={options}
                        words={data}
                    />
                </div>
                :
                <div> No words yet... </div>
            }
        </div>
    );
}

export default WordCloudComponent;
