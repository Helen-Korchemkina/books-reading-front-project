import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import s from './Graphic.module.scss';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        title: 'Action'
      },
      title: {
        display: true,
        text: `Amont of pages / DA ${0}`,
        align: 'start',
        font: {
          size: 14,
          weight: 500, 
      }
    },
    },
    scales: {
        x: {
            
            stacked: true,
            title: {
                display: true,
                text: 'TIME',
                align: 'end',
                font: {
                  size: 14,
                  weight: 500, 
              }
            }
        }
    }
  };

  const labels = [];

export const data = {
  labels,
  datasets: [
    {
      label: 'ACT',
      data: [],
      borderColor: 'rgb(255,107,8)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.2,
    },
    {
      label: 'PLAN',
      data: [],
      borderColor: 'rgb(9,30,63)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.2,
    },
  ],
};

const Graphic = () => {
  return (
      <>
      <div className={s.container}>
          {/* <h2>Amont of pages / DA <span>0</span></h2> */}
          <div className={s.graphic}>
            <Line options={options} data={data} />
          </div>
      </div>
      </>
  );
}

export default Graphic;