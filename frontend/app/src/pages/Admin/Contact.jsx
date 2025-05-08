import React, { useEffect, useMemo, useState } from 'react';
import { getAllContactForms } from '@/api';
import { deleteContactForm, updateContactFormStatus } from '@/api';
import notify from '@/utils/functions/notify';

function Contact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForms, setContactForms] = useState([]);

  const handleUpdateContactForm = async (id, status) => {
    try {
      const response = await updateContactFormStatus(id, status);
      if (response.status === 200) {
        const updatedContactForms = contactForms.map((contact) => {
          if (contact.id === id) {
            return { ...contact, status };
          }
          return contact;
        });
        setContactForms(updatedContactForms);
        notify(200, 'Cập nhật trạng thái liên hệ thành công');
      } else {
        console.error('Failed to update contact form status:', response.message);
        notify(400, 'Cập nhật trạng thái liên hệ thất bại');
      }
    } catch (error) {
      console.error('Update contact form status error:', error);
      notify(500, 'Có lỗi xảy ra trong quá trình cập nhật trạng thái liên hệ');
    }
  };

  const handleDeleteContactForm = async (id) => {
    try {
      const response = await deleteContactForm(id);
      if (response.status === 200) {
        const updatedContactForms = contactForms.filter((contact) => contact.id !== id);
        setContactForms(updatedContactForms);
        notify(200, 'Xóa liên hệ thành công');
      } else {
        console.error('Failed to delete contact form:', response.message);
        notify(400, 'Xóa liên hệ thất bại');
      }
    } catch (error) {
      console.error('Delete contact form error:', error);
      notify(500, 'Có lỗi xảy ra trong quá trình xóa liên hệ');
    }
  };

  const fetchContactForms = async () => {
    const response = await getAllContactForms();
    return response;
  };

  useEffect(() => {
    const res = fetchContactForms();
    res.then((res) => {
      // console.log('res', res);
      if (res.status === 200) {
        setContactForms(res.data);
      } else {
        // console.error('Failed to fetch contact forms:', res.message);
      }
    });
  }, []);

  const filterForms = useMemo(() => {
    return contactForms.filter((contact) => {
      return (
        contact?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact?.phone?.includes(searchTerm) ||
        contact?.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, contactForms]);

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
              <h4 className="card-title">Danh sách các liên hệ của người dùng</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                {contactForms.length === 0 ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '300px' }}
                  >
                    <h4 className="text-center">Không có liên hệ nào</h4>
                    <p className="text-center">Hãy kiểm tra lại sau.</p>
                  </div>
                ) : (
                  <>
                    <p className="card-text">
                      Bảng dưới đây hiển thị danh sách tất cả các liên hệ của người dùng đã gửi đến.
                    </p>
                    <form className="form-group mt-4">
                      <input
                        type="text"
                        id="roundText"
                        className="form-control round w-100 w-xl-75"
                        placeholder="Tìm kiếm liên hệ của người dùng theo tên/email/số diện thoại hoặc theo trạng thái của đơn liên hệ"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </form>
                    <div className="table-responsive">
                      <table className="table table-lg">
                        <thead>
                          <tr>
                            <th>Họ tên người gửi</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Nội dung</th>
                            <th>Ngày gửi</th>
                            <th>Trạng thái</th>
                            <th>Ngày xử lý</th>
                            <th className="text-center">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterForms.map((contact) => (
                            <tr key={contact.id}>
                              <td className="text-bold-500">{contact.full_name}</td>
                              <td>{contact.email}</td>
                              <td className="text-bold-500">{contact.phone}</td>
                              <td className="text-bold-500" style={{ maxWidth: 800 }}>
                                {contact.content}
                              </td>
                              <td className="text-bold-500">{contact.created_at}</td>
                              <td
                                className={`text-bold-500 ${contact.status === 'Đã xử lý' ? 'text-success' : 'text-warning'}`}
                              >
                                {contact.status}
                              </td>
                              <td className="text-bold-500">{contact.processedDate || '-'}</td>
                              <td className="text-center">
                                <div className="d-flex justify-content-center flex-wrap gap-2">
                                  {/* <button className="btn btn-primary flex-grow-1 flex-shrink-1">Xem chi tiết</button> */}
                                  {contact.status === 'Chưa xử lý' && (
                                    <button
                                      className="btn btn-success flex-grow-1 flex-shrink-1"
                                      onClick={(e) => handleUpdateContactForm(contact.id, 'Đã xử lý')}
                                    >
                                      Đánh dấu đã hoàn thành
                                    </button>
                                  )}
                                  <button
                                    className="btn btn-danger flex-grow-1 flex-shrink-1"
                                    onClick={(e) => handleDeleteContactForm(contact.id)}
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
