
"use client";

// ChartJS requires the use of client components such as useState, useEffect, 
// so client-side fetching is not possible


// react 
import { useState, useEffect, useMemo } from 'react';
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
// model
// api
import { fetchFileByType } from "@/app/api/data"
// fonts 
import { lato } from "@/app/ui/fonts"

const FileTypeChart = () => {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFiles = async () => {
            const filesRetrieved = await fetchFileByType();
            // prevent infinite loop re-rendering
            if (JSON.stringify(files) !== JSON.stringify(filesRetrieved)) {
                setFiles(filesRetrieved);
            }
        }
        getFiles();
    }, []);




    return (
        <div className='rounded-md bg-gray-400 p-2 h-[400px]'>
            <Bar
                options={
                    {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                text: "Number of Files",
                                display: true,
                                color: 'white',
                                font: {
                                    size: 18,
                                }
                            },

                        },
                        elements: {
                            bar: {
                                barPercentage: 0.5,
                                categoryPercentage: 0.5,
                            },
                        }
                    }
                }
                data={
                    {
                        labels: files.map(file => file.type),
                        datasets: [
                            {
                                label: 'Number of Files',
                                data: files.map(file => file.count),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                // borderColor: [
                                //     'rgba(255, 99, 132, 1)',
                                //     'rgba(54, 162, 235, 1)',
                                //     'rgba(255, 206, 86, 1)',
                                //     'rgba(75, 192, 192, 1)',
                                //     'rgba(153, 102, 255, 1)',
                                //     'rgba(255, 159, 64, 1)',
                                // ],
                                borderWidth: 1,
                            },
                        ],
                    }
                }

            />

        </div>
    );
}

export default FileTypeChart;