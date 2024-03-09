"use client";
import { signOut } from "next-auth/react"
import { Button } from "@material-tailwind/react"

export default function Login() {
  return (
    <>
      <Button
          placeholder
          variant="outlined"
          size="sm"
          color="white"
          onClick={() => signOut()}
          className="hidden lg:inline-block"
        >
          <span>Sign out</span>
        </Button>
    </>
  );
}