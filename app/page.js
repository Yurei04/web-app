import Table from "./components/Table";
import Navbar from "./components/NavBar";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-6 md:p-12 lg:p-24">
      <Navbar></Navbar>
      <Table></Table>


    </main>
  );
}
