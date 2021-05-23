import { Logo } from "../components/Logo";
import MainTable from "../components/MainTable";

export function Home(props) {
  return (
    <div className="w-10/12 sm:w-11/12 m-auto p-3">
      <Logo />
      <MainTable />
    </div>
  );
}
