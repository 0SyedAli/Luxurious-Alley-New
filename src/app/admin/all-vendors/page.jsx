"use client";
import VendorsTable from "@/component/new/tables/vendors-table";
import TextBox from "@/component/new/text-box";

const vendors = [
  {
    name: "Beauty Supply Co.",
    category: "Hair Products",
    email: "emma@email.com",
    contactPerson: "John Smith",
    status: "Active",
    lastOrder: "2024-10-05",
  },
  {
    name: "Sarah Johnson",
    category: "Hair Products",
    email: "sarah@email.com",
    contactPerson: "John Smith",
    status: "Active",
    lastOrder: "2024-10-05",
  },
  {
    name: "Maria Garcia",
    category: "Hair Products",
    email: "maria@email.com",
    contactPerson: "John Smith",
    status: "Active",
    lastOrder: "2024-10-05",
  },
  {
    name: "Lisa Chen",
    category: "Hair Products",
    email: "lisa@email.com",
    contactPerson: "John Smith",
    status: "Inactive",
    lastOrder: "2024-10-05",
  },
  {
    name: "Anna Rodriguez",
    category: "Hair Products",
    email: "anna@email.com",
    contactPerson: "John Smith",
    status: "Active",
    lastOrder: "2024-10-05",
  },
  {
    name: "Daniel Clark",
    category: "Hair Products",
    email: "daniel@email.com",
    contactPerson: "John Smith",
    status: "Active",
    lastOrder: "2024-10-05",
  },
  {
    name: "Sophia Lee",
    category: "Hair Products",
    email: "sophia@email.com",
    contactPerson: "John Smith",
    status: "Inactive",
    lastOrder: "2024-10-05",
  },
  {
    name: "James Brown",
    category: "Hair Products",
    email: "james@email.com",
    contactPerson: "John Smith",
    status: "Active",
    lastOrder: "2024-10-05",
  },
];

const AdminAllVendors = () => {
  return (
    <div className="w-100">
      <TextBox
        title={"All Vendors"}
        description={"Complete list of vendor partners"}
      />
      <VendorsTable data={vendors} rowsPerPage={10} />
    </div>
  );
};

export default AdminAllVendors;
