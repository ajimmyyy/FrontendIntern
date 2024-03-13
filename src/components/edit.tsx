"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  return (
    <Button
      placeholder = ""
      color="white"
      className="!rounded"
      onClick={() => {router.push("/user")}
      }
    >
      edit
    </Button>
  );
}