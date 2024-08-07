import React from "react";
import Loading from "../../components/Loading/Loading";
import { useGetAllUser } from "../../api/userApi";

const AccountManagementPage = () => {
  const { data: users, isLoading, isError, error } = useGetAllUser();

  if (isLoading) return <Loading loading={isLoading} />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-left text-gray-600">No.</th>
              <th className="py-2 px-4 text-left text-gray-600">Username</th>
              <th className="py-2 px-4 text-left text-gray-600">Họ và tên</th>
              <th className="py-2 px-4 text-left text-gray-600">Email</th>
              <th className="py-2 px-4 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="py-2 px-4 text-gray-700">{index+1}</td>
                <td className="py-2 px-4 text-gray-700">{user.userName}</td>
                <td className="py-2 px-4 text-gray-700">{user.lastName}{" "}{user.firstName}</td>
                <td className="py-2 px-4 text-gray-700">{user.email}</td>
                <td className="py-2 px-4 text-gray-700">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagementPage;
