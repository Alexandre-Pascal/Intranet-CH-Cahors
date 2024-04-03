import LogosList from "./LogosList/LogosList";
import NavBar from "./NavBar/NavBar";

export default function Header(){
  return (
    <header>
      <NavBar/>
      <LogosList/>
    </header>
  );
}