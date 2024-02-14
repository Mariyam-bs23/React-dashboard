import Chart from 'chart.js/auto';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {   
    return(
        <Line
        datasetIdKey='id'
        data={{
          labels: ['January','February','June', 'July', 'August','September','October','November','December'],
          datasets: [
            {
              id: 1,
              label: 'First Half',
              data: [50, 40, 55 ,30 ,45,35,20.70,73,80],
              borderColor: 'rgb(75, 192, 192)',
                tension: 0.5
            },
            {
              id: 2,
              label: 'Top Gross',
              data: [30, 25, 40,60,110,55,70,64,90,80 ,40,50],
              borderColor: 'rgb(56,56,56)',
              tension: 0.5
            },
          ],
        }}
        options={{
            plugins: {
              title: {
                display: true,
                // text: "Earnings",
                position: "top",
                align: "start"
              },
              legend:{
                align: "end",
                labels: {
                    usePointStyle: true,
                    boxWidth: 100,
                    boxHeight: 100
                }
              }
            }
          }}
      />
    )
}

export default LineChart;
