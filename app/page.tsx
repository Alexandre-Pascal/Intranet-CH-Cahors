import NavBar from "./components/NavBar/NavBar";
import PetitTestTouaaais from "./components/petittestouaaais";

export default function Home() {
  return (
    <main>
      <NavBar/>
      <PetitTestTouaaais/>

      <a href="/testationnage"> Testationnage </a>
    </main>
  );
}
