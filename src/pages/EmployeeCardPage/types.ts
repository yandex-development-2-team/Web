export type EmployeeCardData = {
  fullName: string;
  role: string;
  contact: {
    phone: string;
    email: string;
    city: string;
  };
  position: {
    department: string;
    position: string;
    manager: string;
  };
};
