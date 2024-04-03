import LogosList from "./components/LogosList/LogosList";
import NavBar from "./components/NavBar/NavBar";
import InfosNeeded from "./components/HomePage/InfosNeeded/InfosNeeded";
import FastPathBis from "./components/HomePage/FastPathBis/FastPathBis";
import Infos from "./components/HomePage/Infos/Infos";

export default function Home() {
  return (
    <main>
      <div style={{ height: "30vh" }}>
        <NavBar/>
        <LogosList/>
        <InfosNeeded/>
        <FastPathBis/>
      </div>
      <Infos/>
      {/* <a href="/pages/testationnage"> Testationnage </a> */}
    </main>
  );
}
