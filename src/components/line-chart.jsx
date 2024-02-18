import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = (props) => {   
  const {dataset , labels } = props;
  
    return(
        <Line
        datasetIdKey={"id"}
        data={{
          labels:labels,
          datasets: Array.from(dataset)
        }}
        options={{
            plugins: {
              title: {
                display: true,
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
