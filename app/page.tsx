import InfosNeeded from "./components/HomePage/InfosNeeded/InfosNeeded";
import FastPathBis from "./components/HomePage/FastPathBis/FastPathBis";
import Infos from "./components/HomePage/Infos/Infos";
import styles from "./styles.module.css";

export default function Home() {

  return (
    <main className={styles.global}>
      <InfosNeeded/>
      <FastPathBis/>
      <Infos/>
      {/* <a href="/testationnage"> Testationnage </a> */}
    </main>
  );
}
