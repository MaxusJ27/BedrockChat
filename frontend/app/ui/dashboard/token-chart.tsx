"use client";
// react
import { useState, useEffect, useRef } from "react";

// api
import { fetchModelCosts } from "@/app/api/data";
// models
import { Model } from "@/app/lib/models";
// libraries 
// lib
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, BarElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';


const TokenChart = () => {
    const [modelData, setModelData] = useState<Model[]>([]);

    useEffect(() => {
        const fetchModel = async () => {
            const data = await fetchModelCosts();
            if (JSON.stringify(data) !== JSON.stringify(modelData)) {
                setModelData(data);
            }
        }
        fetchModel();
    }, []);
    console.log(modelData);

    return (
        <div className='rounded-md bg-gray-400 p-2 w-full h-full'>
            <Bar
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: "Number of Tokens",
                            color: "white",
                            font: {
                                size: 18,
                            }
                        }
                    },
                    maintainAspectRatio: false,
                }}
                data={
                    {
                        labels: modelData.map((item) => item.modelname),
                        datasets: [
                            {
                                label: 'Number of Input Tokens',
                                data: modelData.map((item) => item.inputToken ),
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            },
                            {
                                label: 'Number of Output Tokens',
                                data: modelData.map((item) => item.outputToken),
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            }
                        ]
                    }

                }

            />
        </div>
    );

}

export default TokenChart;