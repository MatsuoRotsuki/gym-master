import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import moment from 'moment'
import useSubscriptionStore from '../subscription/SubscriptionStore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type PropsType = {
  className?: string
}

export const Registration = ({ className }: PropsType) => {
  const [plans] = useSubscriptionStore(state => [state.plans])

  const labels = Array.from({ length: 7 }, (_, index) =>
    moment(moment()).subtract(index, 'days').format('YYYY-MM-DD')
  ).reverse()

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(
          date =>
            Array.from(plans.values()).filter(item =>
              item.registrations.some(registration =>
                moment(registration.validFrom).isSame(date, 'day')
              )
            ).length
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return <Line className={className} options={options} data={data} />
}

export const Revenue = ({ className }: PropsType) => {
  const [plans] = useSubscriptionStore(state => [state.plans])

  const labels = Array.from({ length: 7 }, (_, index) =>
    moment(moment()).subtract(index, 'days').format('YYYY-MM-DD')
  ).reverse()

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(date => {
          let total = 0
          Array.from(plans.values()).forEach(item => {
            if (
              item.registrations.some(registration =>
                moment(registration.validFrom).isSame(date, 'day')
              )
            ) {
              total += item.monthlyPrice
            }
          })
          return total
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return <Bar className={className} options={options} data={data} />
}

export const Usage = ({ className }: PropsType) => {
  const [plans] = useSubscriptionStore(state => [state.plans])

  const labels = Array.from({ length: 7 }, (_, index) =>
    moment(moment()).subtract(index, 'days').format('YYYY-MM-DD')
  ).reverse()

  const data = {
    labels,
    datasets: [
      {
        data: [4, 2, 1, 3, 2, 3, 1],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return <Bar className={className} options={options} data={data} />
}
