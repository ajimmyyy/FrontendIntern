import { Breadcrumbs } from "@material-tailwind/react";
import { useSelectedLayoutSegments } from "next/navigation";
import { MdHome } from "react-icons/md";

export default function BreadCrumbs() {
  const segments = useSelectedLayoutSegments();

  const breadcrumbs: {
    label: string;
    path: string;
  }[] = [
    ...segments.map((segment) => {
      const pathSegments = segments.slice(0, segments.indexOf(segment) + 1);
      const label = segment;
      const path = `/${pathSegments.join("/")}`;
      return { label, path };
    }),
  ].filter((breadcrumb) => breadcrumb.label !== "");

  return (
    <>
      <Breadcrumbs placeholder={undefined}>
        <a key={0} href="/home" className="opacity-60">
          <MdHome />
        </a>
        {breadcrumbs.map((breadcrumb, index) => (
          <a key={index} href={breadcrumb.path} className="opacity-60">
            {breadcrumb.label}
          </a>
        ))}
      </Breadcrumbs>
    </>
  );
}