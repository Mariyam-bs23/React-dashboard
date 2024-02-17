import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useMemo } from 'react';

const LineChart = (props) => {   
  const {dataset , labels } = props;
  // const chartData = useMemo(() => dataset.slice(), [dataKey, dataset])
    return(
        <Line
        datasetIdKey={Math.random()}
        data={{
          labels:labels,
          datasets: Array.from(dataset)
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
              },
            },
            responsive: true,
            animation: {
              duration: 2000
            },
          }}
      />
    )
}

export default LineChart;
