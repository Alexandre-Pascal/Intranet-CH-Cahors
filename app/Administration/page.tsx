import Users from "./Users/Users";

export default function Administration() {

  return (
    <div>
      <h1>Administration</h1>
      <a href="./Administration/CreateRole"><h2>Créer un nouveau rôle</h2></a>
      <Users/>
    </div>
  );
}