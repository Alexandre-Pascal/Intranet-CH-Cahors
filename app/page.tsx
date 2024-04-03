import LogosList from "./components/LogosList/LogosList";
import NavBar from "./components/NavBar/NavBar";
import InfosNeeded from "./components/HomePage/InfosNeeded/InfosNeeded";
import FastPathBis from "./components/HomePage/FastPathBis/FastPathBis";

export default function Home() {
  return (
    <main>
      <NavBar/>
      <LogosList/>
      <InfosNeeded/>
      <FastPathBis/>

      <a href="/pages/testationnage"> Testationnage </a>
    </main>
  );
}
