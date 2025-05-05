import React, { useEffect, useMemo, useState } from 'react';
import { getAllContactForms } from '@/api';

const contacts = [
  {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    sentDate: '2025-05-01',
    status: 'Chưa xử lý',
    processedDate: null,
  },
  {
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0912345678',
    sentDate: '2025-05-02',
    status: 'Đã xử lý',
    processedDate: '2025-05-03',
  },
  {
    name: 'Lê Minh C',
    email: 'leminhc@example.com',
    phone: '0987654321',
    sentDate: '2025-05-04',
    status: 'Chưa xử lý',
    processedDate: null,
  },
  {
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    phone: '0922334455',
    sentDate: '2025-05-03',
    status: 'Đã xử lý',
    processedDate: '2025-05-04',
  },
  {
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    phone: '0966778899',
    sentDate: '2025-05-05',
    status: 'Chưa xử lý',
    processedDate: null,
  },
];

function Contact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForms, setContactForms] = useState([]);

  useEffect(() => {
    const fetchContactForms = async () => {
      const response = await getAllContactForms();
      return response;
    };

    const res = fetchContactForms();
    res.then((res) => {
      console.log('res', res);
      if (res.status === 200) {
        setContactForms(res.data);
      } else {
        console.error('Failed to fetch contact forms:', res.message);
      }
    });
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, contacts]);

  return (
    <>
      <div className="row" id="basic-table">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Danh sách các liên hệ của người dùng</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                <p className="card-text">
                  Bảng dưới đây hiển thị danh sách tất cả các liên hệ của người dùng đã gửi đến.
                </p>
                <form className="form-group mt-4">
                  <input
                    type="text"
                    id="roundText"
                    className="form-control round"
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
                        {/* <th>Nội dung</th> */}
                        <th>Ngày gửi</th>
                        <th>Trạng thái</th>
                        <th>Ngày xử lý</th>
                        <th className="text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactForms.map((contact) => (
                        <tr key={contact.id}>
                          <td className="text-bold-500">{contact.full_name}</td>
                          <td>{contact.email}</td>
                          <td className="text-bold-500">{contact.phone}</td>
                          <td className="text-bold-500">{contact.created_at}</td>
                          <td
                            className={`text-bold-500 ${contact.status === 'Đã xử lý' ? 'text-success' : 'text-warning'}`}
                          >
                            {contact.status}
                          </td>
                          <td className="text-bold-500">{contact.processedDate || '-'}</td>
                          <td className="text-center">
                            <button className="btn btn-primary">
                              Xem chi tiết
                            </button>
                            <button className="btn ms-2 btn-danger">Xóa</button>
                            <button className="btn ms-2 btn-success">Đánh dấu hoàn thành</button>
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
    </>
  );
}

export default Contact;
