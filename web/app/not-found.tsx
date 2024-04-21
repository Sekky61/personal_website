import Link from "next/link";

export const metadata = {
  title: "404",
};

export default function FourOhFour() {
  return (
    <>
      <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </>
  );
}
