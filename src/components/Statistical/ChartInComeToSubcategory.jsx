import { useEffect, useState } from "react";
import { getTotalSubcategoryToMonth } from "../../services/statisticService";
import StatusCodes from "../../utils/StatusCodes";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ChartInComeToSubcategory = () => {
  const [dataIncomeToSubcategory, setDataIncomeToSubcategory] = useState([]);

  useEffect(() => {
    fetchDataIncomeToSubcategory();
  }, []);

  const fetchDataIncomeToSubcategory = async () => {
    try {
      const response = await getTotalSubcategoryToMonth();
      setDataIncomeToSubcategory(
        response?.EC === StatusCodes.SUCCESS_DAFAULT ? response.DT : [],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const filteredData = dataIncomeToSubcategory.filter(
    (item) => item.totalIncome > 0,
  );

  const labels = dataIncomeToSubcategory.map((item) => item.name);
  const dataValues = filteredData.map((item) => item.totalIncome);
  const backgroundColors = filteredData.map(() => getRandomColor());

  const data = {
    labels,
    datasets: [
      {
        label: "Tổng thu nhập",
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "BIỂU ĐỒ THU NHẬP THEO DANH MỤC CẤP 2",
        font: {
          family: "Arial, sans-serif",
          size: 18,
          weight: "bold",
        },
        color: "#333",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div className="w-1/2 rounded-lg bg-white p-2 shadow-lg">
      <Pie className="min-h-full min-w-full" data={data} options={options} />
    </div>
  );
};

export default ChartInComeToSubcategory;
