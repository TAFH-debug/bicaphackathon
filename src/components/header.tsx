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
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit text-xl text-primary">
          <a href="/">
          BICAPRIPACDIRAP
          </a>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
        {/* <Autocomplete
          placeholder="Search"
          className="max-w-xs"
          onInputChange={fetchBooks}
          startContent={<AiOutlineSearch />}
        >
          {
            books.map((book) => 
              <AutocompleteItem key={book.id} as={Link} href={`/books/${book.id}`} textValue={book.title}>
                <div>
                  <h1>{book.title}</h1>
                  <p className='text-default-500 text-xs'>{book.author}</p>
                </div>
              </AutocompleteItem>
            ).concat(
              users.map((user) => 
                <AutocompleteItem key={user.id} as={Link} href={`/users/${user.id}`} textValue={user.name}>
                  <div>
                    <h1>{user.name} {user.surname}</h1>
                    <p className='text-default-500 text-xs'>{user.email}</p>
                  </div>
                </AutocompleteItem>
              )
            )
          }
        </Autocomplete> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {
          user ? <>
          <NavbarItem>
            <p>Hello, <Link href={`/users/${user.id}`}>{user.name} {user.surname}</Link>!</p>
          </NavbarItem>
          </> :
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
        }
      </NavbarContent>
    </Navbar>
  );
}
