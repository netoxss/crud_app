import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost/crud_app/get_users.php");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const addUser = async () => {
    if (!name || !email) return;
    try {
      await axios.post("http://localhost/crud_app/add_user.php", { name, email });
      fetchUsers();
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.post("http://localhost/crud_app/delete_user.php", { id });
      fetchUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const editUser = (user) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = async () => {
    if (!name || !email) return;
    try {
      await axios.post("http://localhost/crud_app/update_user.php", {
        id: editingUserId,
        name,
        email,
      });
      fetchUsers();
      setName("");
      setEmail("");
      setIsEditing(false);
      setEditingUserId(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <div>
      <h1>CRUD de Usuários</h1>
      <div>
        <input 
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
  
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={isEditing ? updateUser : addUser}>
          {isEditing ? "Atualizar Usuário" : "Adicionar Usuário"}
        </button>
      </div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}{" "}
            <button onClick={() => editUser(user)}>Editar</button>
            <button onClick={() => deleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
