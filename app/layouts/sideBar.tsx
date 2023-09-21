"use client";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { CiHospital1 } from "react-icons/ci";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const items = [
  {
    name: "Departments",
    path: "/dashboard/department",
    permissions: [],
    icon: (
      <ListItemPrefix>
        <PresentationChartBarIcon className="h-5 w-5" />
      </ListItemPrefix>
    ),
  },
  {
    name: "Tests",
    path: "/dashboard/department",
    permissions: [],
    icon: (
      <ListItemPrefix>
        <PresentationChartBarIcon className="h-5 w-5" />
      </ListItemPrefix>
    ),
  },
  {
    name: "Sub tests",
    path: "/dashboard/department",
    permissions: [],
    icon: (
      <ListItemPrefix>
        <PresentationChartBarIcon className="h-5 w-5" />
      </ListItemPrefix>
    ),
  },
  {
    name: "Print",
    path: "/dashboard/department",
    permissions: [],
    icon: (
      <ListItemPrefix>
        <PresentationChartBarIcon className="h-5 w-5" />
      </ListItemPrefix>
    ),
  },
  {
    name: "Reception",
    path: "/dashboard/department",
    permissions: [],
    icon: (
      <ListItemPrefix>
        <PresentationChartBarIcon className="h-5 w-5" />
      </ListItemPrefix>
    ),
  },
  {
    name: "Room",
    path: "/dashboard/department",
    permissions: [],
    icon: (
      <ListItemPrefix>
        <PresentationChartBarIcon className="h-5 w-5" />
      </ListItemPrefix>
    ),
  },
];

export function SideBar() {
  return (
    <div className="hidden md:block sm:block lg:block h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-[#28272d]">
      <div className="mb-2 p-4 text-white font-bold">
        <CiHospital1 /> MERGASOR GENERAL HOSPITAL{" "}
      </div>
      <List>
        {items.map((e) => {
          return (
            <ListItem className="text-white hover:bg-purple-400 hover:text-white">
              {e.icon}
              <Link href={e.path}>{e.name}</Link>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
