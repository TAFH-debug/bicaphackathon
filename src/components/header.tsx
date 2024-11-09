"use client";
import axiosInstance from "@/axiosInstance";
import { User } from "@/types/types";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (window && localStorage.getItem("token")) {
      axiosInstance.get("/users/me").then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit text-xl text-primary">
          <a href="/">BICAPRIPACDIRAP</a>
        </p>
      </NavbarBrand>

      {/* Responsive Navbar Content */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {/* Search component goes here */}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <>
            <NavbarItem>
              <p>
                Hello, <Link href={`/users/${user.id}`}>{user.name} {user.surname}</Link>!
              </p>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/signin">Sign In</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Navbar - Show as dropdown or a mobile-friendly version */}
      <div className="sm:hidden flex justify-between items-center p-4">
        <Button as={Link} href="/signin">Sign In</Button>
        <Button as={Link} href="/signup" color="primary" variant="flat">Sign Up</Button>
      </div>
    </Navbar>
  );
}
