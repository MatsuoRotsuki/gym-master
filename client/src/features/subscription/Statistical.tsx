import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type PropsType = {
  plan: IMembership
  className?: string
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}

export const Registration = ({ plan, className }: PropsType) => {
  const labels = Array.from({ length: 7 }, (_, index) =>
    moment(moment()).subtract(index, 'days').format('YYYY-MM-DD')
  ).reverse()

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(
          date =>
            plan.registrations.filter(item => moment(item.validFrom).isSame(date, 'day')).length
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return <Bar className={className} options={options} data={data} />
}
