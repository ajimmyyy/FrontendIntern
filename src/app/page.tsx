import { redirect } from "next/navigation";

export default async function Default() {
  return redirect("/home");
}
