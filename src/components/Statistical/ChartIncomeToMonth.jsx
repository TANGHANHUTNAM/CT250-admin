import { useEffect, useState } from "react";
import { getTotalIncomesToMonth } from "../../services/statisticService";
import StatusCodes from "../../utils/StatusCodes";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
);

const ChartIncomeToMonth = () => {
  const [dataInComeToMonth, setDataInComeToMonth] = useState([]);

  useEffect(() => {
    fetchDataInComeToMonth();
  }, []);

  const fetchDataInComeToMonth = async () => {
    try {
      const response = await getTotalIncomesToMonth();
      setDataInComeToMonth(
        response?.EC === StatusCodes.SUCCESS_DAFAULT ? response.DT : [],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const labels = dataInComeToMonth.map((item) => item.month);
  const data = {
    labels,
    datasets: [
      {
        label: "Thu nhập theo tháng (VNĐ)",
        data: dataInComeToMonth.map((item) => item.totalIncome),
        backgroundColor: "#42A5F5",
        borderColor: "#42A5F5",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "BIỂU ĐỒ THU NHẬP THEO THÁNG",
        font: {
          size: 18,
          weight: "bold",
          family: "Arial, sans-serif",
        },
        color: "#333",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Tháng",
        },
      },
    },
  };

  return (
    <div className="w-full rounded-lg bg-white p-2 shadow-md">
      <Bar className="min-h-full min-w-full" data={data} options={options} />
    </div>
  );
};

export default ChartIncomeToMonth;
