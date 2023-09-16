/*eslint linebreak-style: ["error", "windows"]*/
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { IconFileDownload } from '@tabler/icons';

interface PieChartProps {
    pieTitle: string;
    data: number[];
    labels: string[];
    height: string;
}

const PieChart = ({ data, labels, height, pieTitle }: PieChartProps) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart>();

    const saveImage = () => {
        const canvas = chartRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'chart.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                // Create the chart instance
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels,
                        datasets: [
                            {
                                data,
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#4BC0C0',
                                    '#9966FF',
                                    '#FF9F40',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 2,
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                },
                            },
                        },
                    },

                });
            }
        }
    }, [data, labels]);

    return (
        <>
            <div className="bg-white rounded shadow">
                <div className="d-flex justify-content-between align-items-center px-3 pt-3">
                    <p className="muted-text fs-19 fw-600 mb-0">{pieTitle}</p>
                    <button type="button" style={{ right: '2rem' }} className="btn" onClick={saveImage}> <IconFileDownload size={20} className="text-info" /></button>
                </div>
                <hr />
                <div className="position-relative py-4" style={{ height }}>
                    <canvas ref={chartRef} style={{ width: '100%', height: '100%', maxHeight: '100%' }} />
                </div>
            </div>
        </>
    );
};

export default PieChart;
