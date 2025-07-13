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
const [isEmptyData, setIsEmptyData] = React.useState(false);

useEffect(() => {
  if (!chartRef.current) return;

  const context = chartRef.current.getContext('2d');

  const dataPoints = [0, 0, 0, 0, 0];
  const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];

  const allZero = dataPoints.every(val => val === 0);
  const emptyData = dataPoints.length === 0;

  if (emptyData || allZero) {
    setIsEmptyData(true);
    return;
  }

  setIsEmptyData(false); // there's valid data

  // your existing chart setup
  const chartInstance = new Chart(context, {
    type: 'line',
    data: {
      labels: labels.slice(-5),
      datasets: [
        {
          label: 'Monthly Data',
          data: dataPoints.slice(-5),
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
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          suggestedMin: 0,
          grid: { display: true },
          ticks: { stepSize: 100 },
        },
      },
    },
  });

  return () => {
    chartInstance.destroy();
  };
}, []);



  return (
    <Box className=' bg-white rounded-lg pt-[20px] w-full'>
        <Box className=''>
        <Box>
            <Box borderBottom="1px" borderColor="gray.600" className=' flex items-center justify-between pb-[10px] w-11/12 m-auto'>
                <Box>
                    <Text className=' lg:text-[18px] font-semibold text-[12px]'>Sales Graph</Text>
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
  {isEmptyData ? (
    <Text textAlign="center" color="gray.500">No data available</Text>
  ) : (
    <canvas ref={chartRef} />
  )}
</div>


        </Box>
    </Box>
  );
}

export default LineCharts;
