'use client'

import {
  Button,
  IconButton,
  ListItem,
  MobileNav,
  Navbar,
  Typography
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import useRolePermission from "../hooks/usePermission";
import useLogin from "../hooks/useLogin";
import { useRouter } from "next/navigation";




export function NavBar() {
  const router = useRouter();
  const { user, logout } = useLogin()
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li> {useRolePermission({
        role: "department",
        children:
          <Link className="text-black" href="/departmentTest">Test Department</Link>
      })}

        {useRolePermission({
          role: "print",
          children:
            <Link className="text-black" href="/print">Print </Link>
        })}
        {useRolePermission({
          role: "superAdmin",
          children:
            <link href="/dashboard/inventory">Inventory </link>
        })}

        {useRolePermission({
          role: "superAdmin",
          children:
            <Link className="text-black" href="/dashboard/department">DEPARTMENT </Link>
        })}
        {useRolePermission({
          role: "superAdmin",
          children:
            <Link className="text-black" href="/dashboard/test">TESTS </Link>
        })}
        {useRolePermission({
          role: "superAdmin",
          children:
            <Link className="text-black" href="/dashboard/subTest">SUBTESTS </Link>
        })}
        {useRolePermission({
          role: "reception",
          children:
            <Link className="text-black" href="/reception">Reception </Link>
        })}
      </li>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          GENERAL MERGASOR HOSPITAL
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {user ? <Button size="sm" className="hidden lg:inline-block"
          onClick={() => {
            logout()
            router.replace('/auth/login',)
          }} variant="gradient" >
          <span>Log out</span>
        </Button> : <Button onClick={() => {
          router.replace('/auth/login',)
        }} variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Log In</span>
        </Button>}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {user ? <Button onClick={() => {
            logout()
            router.replace('/auth/login',)
          }} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Log out</span>
          </Button> : <Button onClick={() => {

            router.replace('/auth/login',)
          }} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Log In</span>
          </Button>}
        </div>
      </MobileNav>
    </Navbar>
  );
}