"use client";
import { useSession } from "next-auth/react"
import {
  Navbar,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import Login from "@/components/logIn";
import Logout from "@/components/logOut";
import Profile from "@/components/profile";
import BreadCrumbs from "./breadCrumbs";

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <>
      <Navbar
        placeholder=""
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography
            placeholder=""
            as="a"
            href="/home"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            我的部落格
          </Typography>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              crossOrigin=""
              type="search"
              color="white"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              placeholder=""
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
          <div className="flex gap-1 md:mr-4">
            {session ?
              <div className="flex gap-5">
                <Profile />
                <Logout />
              </div>
              : <Login />}
          </div>
        </div>
      </Navbar>
      <div className="flex w-full justify-center">
        <div className="container">
          <BreadCrumbs />
        </div>
      </div>
    </>
  );
}