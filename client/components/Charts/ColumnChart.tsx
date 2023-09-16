/*eslint linebreak-style: ["error", "windows"]*/
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { IconFileDownload } from '@tabler/icons';

interface ColumnChartProps {
  title: string;
  data: number[];
  labels: string[];
  height: string;
}

const ColumnChart = ({ data, labels, height, title }: ColumnChartProps) => {
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
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Data',
                data,
                backgroundColor: 'rgb(104, 124, 254)',
                borderWidth: 1,
              },
              {
                label: 'Line Data',
                data, // Provide the line data here
                type: 'line',
                borderColor: 'rgb(255, 127, 93)',
                backgroundColor: 'rgb(255, 127, 93)',
                fill: false,
                order: 1,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            maintainAspectRatio: false,
            aspectRatio: 2,
          },
        });
      }
    }
  }, [data, labels]);

  return (
    <>
      <div className="bg-white ">
        <div className="d-flex justify-content-between align-items-center px-3 pt-3 pb-2">
          <p className="muted-text fs-19 fw-600 mb-0">{title}</p>
          <button type="button" style={{ right: '2rem' }} className="btn" onClick={saveImage}> <IconFileDownload size={20} className="text-info" /></button>
        </div>
        <div className="position-relative pt-2 pb-4 border-top" style={{ height }}>
          <canvas
            ref={chartRef}
            style={{ width: '100%', height: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>

    </>
  );
};

export default ColumnChart;
