import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Ensure to import Chart.js
import data from "../../../public/data.json"; // Import the JSON data
import { useDynamicTitle } from "../../hooks";

const Statistics = () => {
  useDynamicTitle("Thống kê");
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate data fetching with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDishes(data.dishes);
      setReservations(data.reservations);
      setOrders(data.orders);

      // Calculate daily revenue
      const revenueByDate = {};
      orders.forEach((order) => {
        const date = order.orderDate;
        revenueByDate[date] = (revenueByDate[date] || 0) + order.totalAmount;
      });

      // Convert the revenue object to an array
      setDailyRevenue(
        Object.entries(revenueByDate).map(([date, total]) => ({
          date,
          totalRevenue: total,
        }))
      );

      setLoading(false);
    };

    fetchData();
  }, []);

  const dishColumns = [
    {
      title: "Dish Name",
      dataIndex: "DISH_Name",
      key: "DISH_Name",
      sorter: (a, b) => a.DISH_Name.localeCompare(b.DISH_Name),
    },
    {
      title: "Total Sold",
      dataIndex: "DISH_TotalSold",
      key: "DISH_TotalSold",
      sorter: (a, b) => b.DISH_TotalSold - a.DISH_TotalSold,
    },
    {
      title: "Price",
      dataIndex: "DISH_Price",
      key: "DISH_Price",
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  const revenueColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (total) => `$${total.toFixed(2)}`,
    },
  ];

  const tableStyle = {
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const createLineData = () => {
    const orderCounts = {};
    orders.forEach((order) => {
      const date = order.orderDate;
      orderCounts[date] = (orderCounts[date] || 0) + order.totalItems;
    });

    return {
      labels: Object.keys(orderCounts),
      datasets: [
        {
          label: "Orders Count",
          data: Object.values(orderCounts),
          borderColor: "#4bc0c0",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const createPieData = () => ({
    labels: dishes.map((dish) => dish.DISH_Name),
    datasets: [
      {
        label: "Number of Dishes Sold",
        data: dishes.map((dish) => dish.DISH_TotalSold),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
        ],
      },
    ],
  });

  const createReservationBarData = () => {
    const reservationCounts = {};
    reservations.forEach((reservation) => {
      const date = reservation.reservationDate;
      reservationCounts[date] =
        (reservationCounts[date] || 0) + reservation.people;
    });

    return {
      labels: Object.keys(reservationCounts),
      datasets: [
        {
          label: "Reservations Count",
          data: Object.values(reservationCounts),
          backgroundColor: "#ff6384",
        },
      ],
    };
  };

  return (
    <div className="container mx-auto my-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Top Selling Dishes
          </h1>
          <div style={tableStyle}>
            <Table
              columns={dishColumns}
              dataSource={dishes}
              rowKey="DISH_ID"
              pagination={false}
              className="rounded-lg"
              bordered={false}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">Daily Revenue Table</h2>
          <div style={tableStyle}>
            <Table
              columns={revenueColumns}
              dataSource={dailyRevenue}
              rowKey="date"
              pagination={false}
              className="rounded-lg"
              bordered={false}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Dish Sales Doughnut Chart
          </h2>
          <div style={{ height: "300px", width: "100%" }}>
            <Doughnut
              data={createPieData()}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Orders Over Days Line Chart
          </h2>
          <div style={{ height: "300px", width: "100%" }}>
            <Line
              data={createLineData()}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Reservations Over Days Bar Chart
          </h2>
          <div style={{ height: "300px", width: "100%" }}>
            <Bar
              data={createReservationBarData()}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
