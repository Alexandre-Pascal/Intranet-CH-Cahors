import LogosList from "./LogosList/LogosList";
import NavBar from "./NavBar/NavBar";

export default function Header({ isMenuOpen, setIsMenuOpen }: {isMenuOpen: boolean, setIsMenuOpen: (value: boolean) => void}) {
  return (
    <header>
      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <LogosList/>
    </header>
  );
}