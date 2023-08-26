import { Sidebar } from "@/app/components/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Sidebar /> {children}
      </div>
    </>
  );
}
