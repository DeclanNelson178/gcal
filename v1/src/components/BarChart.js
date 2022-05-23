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
    var labels = Object.keys(data);
    var values = Object.values(data);
    var sortedList = [];

    labels.forEach((label, idx) => {
      sortedList.push([label, values[idx]])
    });

    sortedList = sortedList.sort((a, b) => b[1] - a[1]);
    
    if (!colors) {
      sortedList = sortedList.slice(0, 10);
      labels = sortedList.map(item => item[0])
      values = sortedList.map(item => item[1]);
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data: values,
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
        }
      },
    };    
  }

  return <Bar options={getOptions()} data={getData()} />
}

export default BarChart;