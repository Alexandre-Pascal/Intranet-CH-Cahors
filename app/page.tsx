import LogosList from "./components/LogosList/LogosList";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  return (
    <main>
      <NavBar/>
      <LogosList/>

      <a href="/pages/testationnage"> Testationnage </a>
    </main>
  );
}
