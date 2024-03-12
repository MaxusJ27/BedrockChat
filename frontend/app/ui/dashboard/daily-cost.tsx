"use client";

// react
import { useState, useEffect } from 'react';
// api
import { fetchModelCosts } from "@/app/api/data";
// models
import { Model } from "@/app/lib/models";
// components
import Button from '../neurobutton';
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
    ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, BarElement, LinearScale, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

import { Bar, Pie, Line, Scatter, Bubble } from 'react-chartjs-2';

const DailyCostChart = () => {
    const [modelData, setModelData] = useState<Model[]>([]);
    const [type, setType] = useState<boolean>(true);

    useEffect(() => {
        const fetchModel = async () => {
            const data = await fetchModelCosts();
            if (JSON.stringify(data) !== JSON.stringify(modelData)) {
                setModelData(data);
            }
        }
        fetchModel();
    }, []);

    const conditionalCosts = modelData.map((item) => {
        if (type) {
            return item.estimatedInputCosts;
        } else {
            return item.estimatedOutputCosts;
        }
    });


    return (
        <div className='flex flex-col h-[400px] space-y-2.5 rounded-md bg-gray-400 p-4 justify-center items-center'>
            <Pie
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        title: {
                            display: true,
                            text: "Estimated Token Costs",
                            color: "white",
                            font: {
                                size: 18,
                            }
                        },

                    },


                }}
                data={
                    {
                        labels: modelData.map((item) => item.modelname),
                        datasets: [
                            {
                                label: `Estimated ${type ? 'Input' : 'Output'} Token Costs (USD)`,
                                data: conditionalCosts,
                                backgroundColor: [
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                            },
                        ]
                    }
                } />
            <select
                name="selectType"
                id="selectType"
                onChange={(event) => setType(event.target.value)}
                className="bg-gray-800 text-white w-[128px] text-sm pl-2 py-1 rounded-md"
            >
                <option value="input">Input Token</option>
                <option value="">Output Token</option>
            </select>
        </div>
    );


}

export default DailyCostChart;