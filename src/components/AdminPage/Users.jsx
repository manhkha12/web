import { useState, useEffect } from "react";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../Services/apiservice";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" ,role: "user" });
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ username: "", email: "",  password: "",role: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username.trim() || !newUser.email.trim()) return;
    try {
      await addUser(newUser);
      setNewUser({ username: "", email: "", role: "user" });
      loadUsers();
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUpdatedUser(user);
  };

  const handleUpdateUser = async () => {
    if (!updatedUser.username.trim() || !updatedUser.email.trim()) return;
    try {
      await updateUser(editingUser.id, updatedUser);
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý người dùng</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên người dùng"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          className="form-control mt-2"
          placeholder="Nhập email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control mt-2"
          placeholder="Nhập mật khẩu"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="form-control mt-2"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success mt-2" onClick={handleAddUser}>
          Thêm người dùng
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Mật khẩu</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={updatedUser.name}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    className="form-control"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu mới (bỏ trống nếu không đổi)"
                    value={updatedUser.password}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                  />
                ) : (
                  "********"
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <select
                    className="form-control"
                    value={updatedUser.role}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <button className="btn btn-primary btn-sm" onClick={handleUpdateUser}>
                    Lưu
                  </button>
                ) : (
                  <button className="btn btn-warning btn-sm" onClick={() => handleEditUser(user)}>
                    Sửa
                  </button>
                )}
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDeleteUser(user.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
