import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Course() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  if (!token) 
    return redirect("/home");
  return redirect("/user");
}
