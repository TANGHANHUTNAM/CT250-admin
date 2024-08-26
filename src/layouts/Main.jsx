import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import DashboardContent from '../components/Dashboard/DashboardContent'
import Users from '../components/Dashboard/Users';
import Settings from '../components/Dashboard/Settings';
import MyChart from '../components/Dashboard/Chart';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      case 'reports':
        return <MyChart />;
      default:
        return <DashboardContent />;
    }
  };
    return (
        <div className="flex h-screen bg-gray-100 w-screen">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex-1 p-4">{renderContent()}</div>
        </div>
    );
}

export default Dashboard;
