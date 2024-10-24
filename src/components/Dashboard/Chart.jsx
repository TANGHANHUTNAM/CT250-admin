import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
);

export const LineChart1 = () => {
  const data = {
    type: "line",
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: [
      {
        label: "Đơn",
        data: [13, 15, 19, 20, 15, 21, 15], // Dữ liệu của biểu đồ
        borderColor: "#A9A6EA", // Màu viền của đường
        // backgroundColor: "red", // Không có nền màu
        pointBorderColor: "#A9A6EA", // Màu viền của điểm
        // pointBackgroundColor: "#A9A6EA", // Màu nền của điểm
        pointRadius: 4, // Kích thước điểm
        borderWidth: 2, // Độ dày của đường
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ẩn phần chú thích
      },
    },
    scales: {
      x: {
        display: false, // Ẩn trục x
        grid: {
          display: false, // Ẩn grid dọc
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục dọc
        },
      },
      y: {
        display: false, // Ẩn trục
        grid: {
          display: false, // Ẩn grid ngang
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục dọc
        },
      },
    },
  };

  return <Line className="w-full" data={data} options={options} />;
};

export const LineChart2 = () => {
  const data = {
    type: "line",
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: [
      {
        label: "Đơn",
        data: [11, 13, 13, 14, 10, 8, 9], // Dữ liệu của biểu đồ
        borderColor: "#8BC0F2", // Màu viền của đường
        // backgroundColor: "red", // Không có nền màu
        pointBorderColor: "#8BC0F2", // Màu viền của điểm
        // pointBackgroundColor: "#8BC0F2", // Màu nền của điểm
        pointRadius: 4, // Kích thước điểm
        borderWidth: 2, // Độ dày của đường
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ẩn phần chú thích
      },
    },
    scales: {
      x: {
        display: false, // Ẩn trục x
        grid: {
          display: false, // Ẩn grid dọc
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục dọc
        },
      },
      y: {
        display: false, // Ẩn trục
        grid: {
          display: false, // Ẩn grid ngang
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục dọc
        },
      },
    },
  };

  return <Line className="w-full" data={data} options={options} />;
};

export const LineChart3 = () => {
  const data = {
    type: "line",
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: [
      {
        label: "Tiền",
        data: [2000000, 2000000, 1500000, 3400000, 1800000, 3000000, 1400000], // Dữ liệu của biểu đồ
        borderColor: "#FCD998", // Màu viền của đường
        // backgroundColor: "red", // Không có nền màu
        pointBorderColor: "#FCD998", // Màu viền của điểm
        // pointBackgroundColor: "#FCD998", // Màu nền của điểm
        pointRadius: 4, // Kích thước điểm
        borderWidth: 2, // Độ dày của đường
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ẩn phần chú thích
      },
    },
    scales: {
      x: {
        display: false, // Ẩn trục x
        grid: {
          display: false, // Ẩn grid dọc
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục dọc
        },
      },
      y: {
        display: false, // Ẩn trục
        grid: {
          display: false, // Ẩn grid ngang
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục dọc
        },
      },
    },
  };

  return <Line className="w-full" data={data} options={options} />;
};

export const BarChart1 = () => {
  const data = {
    type: "bar",
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: [
      {
        label: "Khách hàng",
        data: [13, 15, 19, 20, 15, 21, 15], // Dữ liệu của biểu đồ
        backgroundColor: "#E97474", // Màu nền của cột
        borderColor: "#E97474", // Màu viền của cột
        borderWidth: 2, // Độ dày của viền cột
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ẩn phần chú thích
      },
    },
    scales: {
      x: {
        display: false, // Ẩn trục x
        grid: {
          display: false, // Ẩn grid dọc
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục x
        },
      },
      y: {
        display: false, // Ẩn trục y
        grid: {
          display: false, // Ẩn grid ngang
        },
        ticks: {
          display: false, // Ẩn các chỉ số của trục y
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options} />; // Sử dụng Bar thay vì Line
};
