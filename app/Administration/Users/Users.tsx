"use client";

import { useEffect, useState } from "react";
import prisma from "../../lib/utils/prisma";
import { SessionObject } from "../../lib/utils/types";

export default function Administration() {
  const [users, setUsers] = useState <SessionObject[]>([]);

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.users);
        alert(JSON.stringify(data.users));
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchUsers();
  }, []);

  //   alert(users);
  return (
    <div>
      { users && ( users.map(user => (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )))}
    </div>
  );
}