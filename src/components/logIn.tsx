"use client";
import { signIn } from "next-auth/react"
import { Button } from "@material-tailwind/react"

export default function Login() {
  return (
    <Button
      placeholder=""
      variant="outlined"
      size="sm"
      color="white"
      onClick={() => signIn("credentials", { redirect: true, callbackUrl: "/user" })}
      className="hidden lg:inline-block"
    >
      <span>Sign in</span>
    </Button>
  );
}