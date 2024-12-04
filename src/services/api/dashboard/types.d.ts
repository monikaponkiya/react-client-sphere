export interface IDashboardRes {
  usersCount: number;
  clientsCount: number;
  projectsCount: number;
  companiesCount: number;
}

export interface IDashboardClientRes {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  clientCompanyName: string;
}

export interface IDashboardCompanyRes {
  id: number;
  name: string;
}
