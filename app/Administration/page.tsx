import CreateRole from "./CreateRole/CreateRole";
import Users from "./Users/Users";

export default function Administration() {

  return (
    <div>
      <h1>Administration</h1>
      {/* <Users/> */}
      <CreateRole/>
    </div>
  );
}