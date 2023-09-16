import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import CompanyIcon from "@heroicons/react/24/solid/BuildingOfficeIcon";
import DriverIcon from "@heroicons/react/24/solid/UserIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import CityIcon from "@heroicons/react/24/solid/HomeIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/admin",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Customers",
    path: "/admin/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Companies",
    path: "/admin/companies",
    icon: (
      <SvgIcon fontSize="small">
        <CompanyIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Drivers",
    path: "/admin/drivers",
    icon: (
      <SvgIcon fontSize="small">
        <DriverIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Cities",
    path: "/admin/cities",
    icon: (
      <SvgIcon fontSize="small">
        <CityIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/admin/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
