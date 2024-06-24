import AddUser from "@/component/user/AddUser";
import GetUser from "@/component/user/GetUser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AddUser />
        <GetUser />
      </div>
    </main>
  );
}
