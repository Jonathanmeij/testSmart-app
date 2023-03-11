import { Navbar } from "components/ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="text-san-marino-900">{children}</main>
    </>
  );
}
