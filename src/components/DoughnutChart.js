import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DoughnutChart = ({ data, title, colors }) => {

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
        legend: {
            display: false,
            position: "right"
            },
            elements: {
            arc: {
                borderWidth: 0
            }
        }
    };    
  }

  return <Doughnut options={getOptions()} data={getData()} />
}

export default DoughnutChart;