import React, { useEffect, useState } from 'react';

import { getAllMissions, getAllMenuItems, getAllSubMenuItems, updateMission, addMission, deleteMission } from '@/api';

import notify from '@/utils/functions/Notify';

function HomepageManage() {
  const [missions, setMissions] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);

  const [isShowMissionForm, setIsShowMissionForm] = useState(false);

  useEffect(() => {
    const getMissions = async () => {
      const res = await getAllMissions();

      return res;
    };

    const res = getMissions();
    // console.log('res', res);

    res.then((res) => {
      setMissions(res.data);
    });
  }, []);

  useEffect(() => {
    const getMenuItems = async () => {
      const res = await getAllMenuItems();

      return res;
    };

    const res = getMenuItems();
    // console.log('res', res);

    res.then((res) => {
      setMenuItems(res.data);
    });
  }, []);

  useEffect(() => {
    const getSubMenuItems = async () => {
      const res = await getAllSubMenuItems();

      return res;
    };

    const res = getSubMenuItems();
    // console.log('res', res);

    res.then((res) => {
      setSubMenuItems(res.data);
    });
  }, []);

  const handleChangeMissionInput = (e, index) => {
    const newMissions = [...missions];
    newMissions[index][e.target.name] = e.target.value;

    // console.log(newMissions[index][e.target.name]);

    setMissions(newMissions);
  };

  const handleUpdateMission = (missions) => {
    const res = updateMission(missions);

    console.log('res', res);

    res.then((res) => {
      notify(res.status, res.message);
    });
  };

  const handleAddMission = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // console.log(data);

    const res = addMission(data);

    console.log('res', res);

    res.then((res) => {
      notify(res.status, res.message);
      if (res.status === 200) {
        setMissions([...missions, res.data]);
        setIsShowMissionForm(false);
      }
    });
  };

  const handleDeleteMission = (id) => {
    const res = deleteMission(id);

    res.then((res) => {
      notify(res.status, res.message);
      if (res.status === 200) {
        const newMissions = missions.filter((mission) => mission.id !== id);
        setMissions(newMissions);
      }
    });
  };

  console.log('missions', missions);

  return (
    <>
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
              <h4 className="card-title">Danh sách các sứ mệnh</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-lg">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Icon đã chọn</th>
                        <th className="text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {missions.map((mission, index) => (
                        <tr key={index}>
                          <td className="text-bold-500">
                            <input
                              name="title"
                              type="text"
                              className="bg-body form-control"
                              value={mission?.title}
                              onChange={(e) => {
                                handleChangeMissionInput(e, index);
                              }}
                            />
                          </td>
                          <td>
                            <input
                              name="description"
                              type="text"
                              className="bg-body form-control"
                              value={mission?.description}
                              onChange={(e) => {
                                handleChangeMissionInput(e, index);
                              }}
                            />
                          </td>
                          <td className="text-bold-500">
                            <input
                              name="icon"
                              type="text"
                              className="bg-body form-control"
                              value={mission?.icon || ''}
                              onChange={(e) => {
                                handleChangeMissionInput(e, index);
                              }}
                            />
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                              <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log('mission', mission);
                                  handleUpdateMission(mission);
                                }}
                              >
                                Thay đổi
                              </button>
                              <button className="btn btn-danger" onClick={(e) => handleDeleteMission(mission.id)}>
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!isShowMissionForm && (
                    <div className="text-end">
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsShowMissionForm(true);
                        }}
                      >
                        Thêm sứ mệnh mới
                      </button>
                    </div>
                  )}
                  {isShowMissionForm && (
                    <form className="" onSubmit={handleAddMission}>
                      <div className="mt-4">
                        <label htmlFor="title" className="form-label">
                          Tên sứ mệnh
                        </label>
                        <input type="text" name="title" className="form-control" />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="description" className="form-label">
                          Mô tả
                        </label>
                        <input type="text" name="description" className="form-control" />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="icon" className="form-label">
                          Icon
                        </label>
                        <input type="text" name="icon" className="form-control" />
                      </div>
                      <div className="mt-4 d-flex gap-2 justify-content-center">
                        <button className="btn btn-success" type="submit">
                          Thêm
                        </button>
                        <button className="btn btn-danger" onClick={(e) => setIsShowMissionForm(false)}>
                          Hủy
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <h4 className="card-title">Danh sách các nội dung trên menu</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-lg">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Link</th>
                        <th className="text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((menuItem) => (
                        <tr key={menuItem.id}>
                          <td className="text-bold-500">{menuItem.id}</td>
                          <td className="text-bold-500">{menuItem.name}</td>
                          <td>{menuItem.link}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                              <button className="btn btn-warning">Thay đổi</button>
                              <button className="btn btn-danger">Xóa</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end">
                    <button className="btn btn-success">Thêm menu mới</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <h4 className="card-title">Danh sách các nội dung của từng mục trong menu</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-lg">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên menu cha</th>
                        <th>Tên</th>
                        <th>Link</th>
                        <th className="text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subMenuItems.map((subMenuItem) => (
                        <tr key={subMenuItem.id}>
                          <td className="text-bold-500">{subMenuItem.id}</td>
                          <td className="text-bold-500">{subMenuItem.pname}</td>
                          <td className="text-bold-500">{subMenuItem.name}</td>
                          <td>{subMenuItem.link}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                              <button className="btn btn-warning">Thay đổi</button>
                              <button className="btn btn-danger">Xóa</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end">
                    <button className="btn btn-success">Thêm sub menu mới</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomepageManage;
