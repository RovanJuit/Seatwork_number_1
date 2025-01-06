import React, { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Rovan" },
    { id: 2, name: "Aldrin" },
    { id: 3, name: "Charles" },
    { id: 4, name: "Tom" },
    { id: 5, name: "Cha" },
  ]);
  const [user, setUser] = useState({});

  // Delete User
  const deleteFxn = (_id) => setUsers(users.filter(({ id }) => id !== _id));

  // Edit User
  const activeUser = (_id) => {
    const selectedUser = users.find(({ id }) => id === _id);
    setUser({ ...selectedUser });
  };

  // Update User List
  const updateUsers = (_user) => {
    if (!_user.name) return; // Avoid update users if the name is empty

    if (_user.id === null) {

      // Create New User
      const newUser = { ..._user, id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1 };
    
      setUsers([...users, newUser]);

    } else {
      // Update Existing User
      setUsers(users.map(u => (u.id === _user.id ? _user : u)));
    }
    clearUser();
  };

  // Clear User Form
  const clearUser = () => setUser({ id: null, name: "" });

  return (
    <div>
      <h1>User List</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <button type="button" title="Edit" onClick={() => activeUser(id)}>
                    Edit
                  </button>
                  <button type="button" title="Delete" onClick={() => deleteFxn(id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div>
        <h3>User Form</h3>
        <form>
          <button type="button" onClick={clearUser}>
            Create New
          </button>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <button type="button" onClick={() => updateUsers(user)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
