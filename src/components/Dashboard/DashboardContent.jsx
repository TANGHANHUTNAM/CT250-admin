const DashboardContent = () => {
  return (
    <div className="flex-1 p-6 w-full text-black">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Example cards for dashboard metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="mt-2 text-3xl">1,200</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="mt-2 text-3xl">$34,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Active Subscriptions</h2>
          <p className="mt-2 text-3xl">3,200</p>
        </div>
        {/* New Chart Component */}
      </div>
    </div>
  );
};

export default DashboardContent;
