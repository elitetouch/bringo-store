'use client';
import React, { useRef, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function LineCharts() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current) {
      const context = chartRef.current.getContext('2d');

      // Full dataset and labels
      const dataPoints = [0, 0, 0, 25, 25, 25, 25, 25, 70, 80, 70, 90, 350];
      const labels = [
        '0', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
      ];

      // Get the last 5 data points and corresponding labels
      const visibleData = dataPoints.slice(-5);
      const visibleLabels = labels.slice(-5);

      const maxValue = Math.max(...visibleData);
      const suggestedMax = Math.ceil(maxValue + maxValue * 0.1); // Add 10% padding

      chartInstance = new Chart(context, {
        type: 'line',
        data: {
          labels: visibleLabels,
          datasets: [
            {
              label: 'Monthly Data',
              data: visibleData,
              borderColor: 'green',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
         scales: {
  x: {
    grid: {
      display: false,
    },
  },
  y: {
    beginAtZero: true,
    suggestedMax: suggestedMax,
    suggestedMin: 0,
    grid: {
      display: true,
    },
    ticks: {
      stepSize: 100, // <- fixed Y axis interval
    },
  },
},

        },
      });

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, []);

  return (
    <Box className=' bg-white rounded-lg pt-[20px] w-full'>
        <Box className=''>
        <Box>
            <Box borderBottom="1px" borderColor="gray.600" className=' flex items-center justify-between pb-[10px] w-11/12 m-auto'>
                <Box>
                    <Text className=' lg:text-[18px] font-semibold text-[12px]'>Sale Graph</Text>
                </Box>
                <Box className=' flex items-center gap-x-[10px]'>
                    <Button  position={'unset'} border="1px" borderColor="gray.300" borderRadius="lg" backgroundColor={'white'}>
                        <Text className=' text-[#232321] lg:text-[15px] text-[12px]'>Weekly</Text>
                    </Button>
                     <Button position={'unset'} backgroundColor={'#007460'}>
                        <Text className=' text-white lg:text-[15px] text-[12px]'>Monthly</Text>
                    </Button>
                     <Button position={'unset'} border="1px" borderColor="gray.300" borderRadius="lg" backgroundColor={'white'}>
                        <Text className=' text-[#232321] lg:text-[15px] text-[12px]'>Yearly</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    <div className="w-11/12 m-auto pb-[20px] mt-[30px]" style={{ height: '300px' }}>
      <canvas ref={chartRef} />
    </div>

        </Box>
    </Box>
  );
}

export default LineCharts;
