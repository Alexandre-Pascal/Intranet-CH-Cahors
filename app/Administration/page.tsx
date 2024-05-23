import Users from "./Users/Users";

export default function Administration() {

  return (
    <div>
      <h1>Administration</h1>
      <a href="./Administration/CreateRole?kind=create"><h2>Créer un nouveau rôle</h2></a>
      <a href="./Administration/CreateRole?kind=update"><h2>Modifier un rôle</h2></a>
      <Users/>
    </div>
  );
}