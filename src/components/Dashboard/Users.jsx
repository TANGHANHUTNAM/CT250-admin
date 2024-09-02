import React from 'react';
import { FaUser } from 'react-icons/fa'; // Example icon from react-icons

const Users = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com' },
        { id: 6, name: 'Eve White', email: 'eve@example.com' }
    ];

    return (
        <div className="flex-1 p-6 w-full text-black">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {users.map(user => (
                    <div key={user.id} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FaUser className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
