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
    const [cloudSize, setCloudSize] = useState<number>(0);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/stream');

        eventSource.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'update') {
                const frequencies = await fetchFrequencies(cloudSize);
                setData(frequencies);
            }
        };

        eventSource.onopen = () => {
            console.log('Connection established');
        }

        return () => eventSource.close();
    }, [cloudSize]);

    const options = {
        rotations: 2,
        rotationAngles: [0, 90],
        fontSizes: [10, 60],
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
    } as Options;

    const handleCloudSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);
        if (!isNaN(newSize) && newSize >= 0) {
            setCloudSize(newSize);
        }
    };

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
                <div > No words yet... </div>
            }
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <label htmlFor="cloudSizeInput">Cloud Size:</label>
                <input
                    id="cloudSizeInput"
                    type="number"
                    value={cloudSize}
                    onChange={handleCloudSizeChange}
                    style={{ marginLeft: '5px' }}
                />
            </div>
        </div>

    );
}

const fetchFrequencies = async (size: number): Promise<WordFrequency[]> => {
    const response = await fetch(`http://localhost:8080/frequencies?size=${size}`);
    const data = await response.json() as { word: string, frequency: number }[];
    return data.map((item) => ({ text: item.word, value: item.frequency }));
}

export default WordCloudComponent;
