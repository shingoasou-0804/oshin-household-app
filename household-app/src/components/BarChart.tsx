import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { Transaction } from '../types';

Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  monthlyTransactions: Transaction[]
}

const BarChart = ({ monthlyTransactions }: BarChartProps) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  const dateLabels = Object.keys(dailyBalances);
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense)
  const incomeData = dateLabels.map((day) => dailyBalances[day].income)
  const labels = ['2024-10-01', '2024-10-08', '2024-10-16', '2024-10-24'];
  const data = {
    labels,
    datasets: [
      {
        label: '支出',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '収入',
        data: [28, 48, 40, 19],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default BarChart
