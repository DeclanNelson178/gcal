import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title, colors }) => {

  const getData = () => {
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: title,
          data: Object.values(data),
          backgroundColor: colors ? colors : 'blue'
        }
      ]
    }
  }

  const getOptions = () => {
    return {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
        },
      },
    };    
  }

  return <Bar options={getOptions()} data={getData()} />
}

export default BarChart;