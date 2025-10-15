"use client";
import UsersTable from "@/component/new/tables/users-table";
import TextBox from "@/component/new/text-box";

const users = [
  {
    name: "Emma Thompson",
    email: "emma@email.com",
    joinDate: "2024-01-15",
    status: "Active",
    totalSpent: 850,
  },
  {
    name: "Sarah Johnson",
    email: "sarah@email.com",
    joinDate: "2024-02-20",
    status: "Active",
    totalSpent: 1200,
  },
  {
    name: "Maria Garcia",
    email: "maria@email.com",
    joinDate: "2024-01-10",
    status: "Active",
    totalSpent: 950,
  },
  {
    name: "Lisa Chen",
    email: "lisa@email.com",
    joinDate: "2024-03-05",
    status: "Inactive",
    totalSpent: 450,
  },
  {
    name: "Anna Rodriguez",
    email: "anna@email.com",
    joinDate: "2024-02-28",
    status: "Active",
    totalSpent: 1150,
  },
  {
    name: "Daniel Clark",
    email: "daniel@email.com",
    joinDate: "2024-04-10",
    status: "Active",
    totalSpent: 880,
  },
  {
    name: "Sophia Lee",
    email: "sophia@email.com",
    joinDate: "2024-05-12",
    status: "Inactive",
    totalSpent: 540,
  },
  {
    name: "James Brown",
    email: "james@email.com",
    joinDate: "2024-06-20",
    status: "Active",
    totalSpent: 1250,
  },
];

const AdminAllUsers = () => {
  return (
    <div className="w-100">
      <TextBox title={"All Users"} description={"Complete list of registered users"}/>
      <UsersTable data={users} rowsPerPage={10} />
    </div>
  );
};

export default AdminAllUsers;
