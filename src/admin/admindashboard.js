import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Button, Input } from "@mui/material";

const AdminDashboard = () => {
  const [servicesData, setServicesData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todaysSales, setTodaysSales] = useState(0);
  const [lifetimeSales, setLifetimeSales] = useState(0);
  const [mostPopularService, setMostPopularService] = useState("");
  const [totalServicesCompleted, setTotalServicesCompleted] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortingApplied, setSortingApplied] = useState(false);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/bookings");
        const bookings = response.data.allBookings;

        // Filter bookings where paymentStatus is Completed and serviceStatus is Service Completed
        const completedBookings = bookings.filter(
          (booking) =>
            booking.serviceStatus === "Service Completed" &&
            booking.paymentStatus === "Completed"
        );

        // Calculate the total number of services completed
        const totalServicesCompleted = completedBookings.reduce(
          (total, booking) => total + booking.services.length,
          0
        );

        // Calculate services usage data
        const servicesCount = {};
        completedBookings.forEach((booking) => {
          booking.services.forEach((service) => {
            if (servicesCount[service]) {
              servicesCount[service]++;
            } else {
              servicesCount[service] = 1;
            }
          });
        });
        const totalServices = completedBookings.reduce(
          (total, booking) => total + booking.services.length,
          0
        );
        const percentages = Object.keys(servicesCount).map((service) => ({
          name: service,
          value: Number(((servicesCount[service] / totalServices) * 100).toFixed(2)),
          fill: getRandomColor(),
        }));
        setServicesData(percentages);

        // Calculate sales data by date
        const salesByDate = completedBookings.reduce((acc, booking) => {
          const date = booking.appointmentdate.split("T")[0];
          acc[date] = (acc[date] || 0) + booking.amount;
          return acc;
        }, {});
        const sortedSalesData = Object.entries(salesByDate)
        .map(([date, amount]) => ({ date, amount }))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
      setSalesData(sortedSalesData);

        // Calculate today's sales
        const today = new Date().toISOString().split("T")[0];
        const todaySales = completedBookings
          .filter((booking) => booking.appointmentdate.split("T")[0] === today)
          .reduce((acc, booking) => acc + booking.amount, 0);
        setTodaysSales(todaySales);

        // Calculate lifetime sales
        const lifetimeSales = completedBookings.reduce(
          (acc, booking) => acc + booking.amount,
          0
        );
        setLifetimeSales(lifetimeSales);

        // Calculate most popular service
        const mostPopularService = Object.entries(servicesCount).reduce(
          (max, [service, count]) => {
            return count > max[1] ? [service, count] : max;
          },
          ["", 0]
        )[0];
        setMostPopularService(mostPopularService);
        setTotalServicesCompleted(totalServicesCompleted);
        setLoading(false); // Data fetching completed
      } catch (error) {
        setError(error.message); // Set error state
        setLoading(false); // Data fetching completed (even if error occurs)
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

  // Function to generate a random color
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const applySorting = () => {
    if (fromDate && toDate && new Date(fromDate) <= new Date(toDate)) {
      const filteredSalesData = salesData.filter(
        (sale) =>
          new Date(sale.date) >= new Date(fromDate) &&
          new Date(sale.date) <= new Date(toDate)
      );
      setSalesData(filteredSalesData);
      setSortingApplied(true);
    }
  };

  // Reset sorting and fetch data again
  const resetSorting = () => {
    setFromDate("");
    setToDate("");
    setSortingApplied(false);
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="dashboardContentsdashboard">
        <div
          style={{
            boxShadow: "#1b76797d 4px 4px 6px 2px",
            borderRadius: "5px",
          }}
        >
          <p style={{ color: "#04475f" }}>Services Usage (in %)</p>
          <PieChart width={550} height={400}>
            <Pie dataKey="value" data={servicesData} label fill="#8884d8" />
            <Tooltip />
          </PieChart>
          <p style={{ fontSize: "1.3rem", color: "#04475f" }}>
            {" "}
            Total Count of Completed Services : {totalServicesCompleted}
          </p>
        </div>
        <div>
          <div
            style={{
              boxShadow: "#1b76797d 4px 4px 6px 2px",
              borderRadius: "5px",
            }}
          >
            <p style={{ color: "#04475f" }}>Sales By Date (in ₹)</p>
            <div style={{ margin: "15px", textAlign: "right" ,color: "#04475f"}}>
              {" "}
              From{' '} <Input 
                         type="date" 
                         label="From" 
                         value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                         />
              To <Input 
              type="date" 
              label="to" 
              value={toDate}
                onChange={e => setToDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
              {!sortingApplied ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: 'rgb(4, 71, 95)', margin: '1em' }}
                  onClick={applySorting}
                >
                  Apply
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: 'rgb(4, 71, 95)', margin: '1em' }}
                  onClick={resetSorting}
                >
                  Reset
                </Button>
              )}
            </div>
            <BarChart width={500} height={200} data={salesData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </div>
          <div
            style={{
              boxShadow: "#1b76797d 4px 4px 6px 2px",
              marginTop: "1.7rem",
              height: "22rem",
              fontSize: "20px",
              color: "black",
              padding:'15px',
              borderRadius: "5px",
            }}
          >
            Today's Sales: ₹ {todaysSales} <br /> <br />
            Lifetime Sales: ₹ {lifetimeSales} <br /> <br />
            Most Popular Service: {mostPopularService}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
