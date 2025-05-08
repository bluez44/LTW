import React, { useEffect, useState } from 'react';

import { deleteUser, getAllUsers } from '@/api';
import notify from '@/utils/functions/Notify';

function ManageUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers();

      return res;
    };

    const res = getUsers();

    console.log(res);

    res.then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDeleteUser = (id, index) => {
    const res = deleteUser(id);

    res.then((res) => {
      if (res.status === 200) {
        const newUsers = [...users];
        newUsers.splice(index, 1);
        setUsers(newUsers);
      }

      notify(res.status, res.message);
    });
  };

  return (
    <div className="row" id="basic-table">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <a
              href="#"
              className="burger-btn d-block d-xl-none"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('sidebar').classList.add('active');
              }}
            >
              <i className="bi bi-justify fs-3"></i>
            </a>
            <h4 className="card-title">Danh sách các người dùng có trên hệ thống</h4>
          </div>
          <div className="card-content">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-lg">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Ngày sinh</th>
                      <th>Số điện thoại</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td className="text-bold-500">{user.id}</td>
                          <td className="text-bold-500">
                            {user.last_name} {user.first_name}
                          </td>
                          <td className="text-bold-500">{user.user_name}</td>
                          <td className="text-bold-500">{user.email}</td>
                          <td className="text-bold-500">{user.birth_day}</td>
                          <td className="text-bold-500">{user.phone_number}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                              <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id, index)}>
                                Xóa người dùng
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
