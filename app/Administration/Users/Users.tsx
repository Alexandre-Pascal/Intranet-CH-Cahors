"use client";

import { useEffect, useState } from "react";
import { SessionObject } from "../../lib/utils/types";

export default function Administration() {
  const [users, setUsers] = useState <SessionObject[]>([]);
  const [roles, setRoles] = useState <any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.users);
        // alert(JSON.stringify(data.users));
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async() => {
      try {
        const response = await fetch("/api/roles");
        const data = await response.json();
        setRoles(data.roles);
        // alert(JSON.stringify(data.roles));
      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>, email: string, role: string) => {
    e.preventDefault();
    try{
      await fetch(`/api/users/${email}`, {
        method: "PUT",
        body: JSON.stringify({ role }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(`Le role de l'utilisateur ${email} a été modifié en ${role}`);
    }
    catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleConfirmDelete = (user: SessionObject) => {
    if (confirm(`Voulez-vous vraiment supprimer l'utilisateur ${user.name} ?`)) {
      handleDelete(user.email);
    }
  };

  const handleDelete = async(email: string) => {
    try {
      await fetch(`/api/users/${email}`, {
        method: "DELETE",
      });
      alert(`L'utilisateur ${email} a été supprimé`);
      window.location.href = "/Administration";
    }
    catch (error) {
      console.error("Erreur:", error);
    }
  };

  //   alert(users);
  return (
    <div>
      { users && ( users.map((user, index) => (
        <div key={index}>
          <form onSubmit={(e) => handleSubmit(e, user.email, selectedRole)}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <select onChange={(e) => setSelectedRole(e.target.value)}>
              {
                user.role ? (
                  <option value={user.role}>{user.role}</option>
                ) : (
                  <option value={""}>Choisissez un role</option>
                )
              }

              { roles && ( roles.map((role, index) => (
                <option key={index} value={role.name}>{role.name}</option>
              )))}
            </select>
            <button type="submit">Modifier</button>
            <button type="button" onClick={() => handleConfirmDelete(user)}>Supprimer</button>
          </form>
        </div>
      )))}
    </div>
  );
}