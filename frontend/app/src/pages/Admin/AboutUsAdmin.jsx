import React, { useEffect, useMemo, useState } from 'react';
import { getAllContactForms } from '@/api';
import { deleteContactForm, updateContactFormStatus } from '@/api';
import notify from '@/utils/functions/notify';
import axios from 'axios';

function AboutUsAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [faqs, setFaqs] = useState([]);

  const handleUpdateFAQ = async (id, status) => {

  };

  const handleDeleteFAQ = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa câu hỏi này không?")
    if (!confirm) return

    try {
        const response = await axios.get(`http://localhost:85/LTW_ASS/backend/app/public/delete-question?question_id=${id}`)
        console.log(response)
        if(response.data.status === 'success'){
          fetchFaqs()
        }
    } catch (error) {
      notify("Không thể xóa câu hỏi trong lúc này")
    }
  };

  const fetchFaqs = async () =>{
    try {
      const response = await axios.get('http://localhost:85/LTW_ASS/backend/app/public/get-all-questions')
      setFaqs(response.data)
    } catch (error) {
      setFaqs([])
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      return (
        faq?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq?.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq?.title?.includes(searchTerm)
      );
    });
  }, [searchTerm, faqs]);

  return (
    <>
      <div className="row" id="basic-table">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Danh sách các câu hỏi</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                {faqs.length === 0 ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '300px' }}
                  >
                    <h4 className="text-center">Không có câu hỏi nào</h4>
                    <p className="text-center">Hãy kiểm tra lại sau.</p>
                  </div>
                ) : (
                  <>
                    <p className="card-text">
                      Bảng dưới đây hiển thị danh sách tất cả các câu hỏi của người dùng trong mục hỏi đáp.
                    </p>
                    <form className="form-group mt-4">
                      <input
                        type="text"
                        id="roundText"
                        className="form-control round"
                        placeholder="Tìm kiếm câu hỏi của người dùng theo tên/tiêu đề hoặc nội dung của câu hỏi"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </form>
                    <div className="table-responsive">
                      <table className="table table-lg">
                        <thead>
                          <tr>
                            <th>Họ và tên</th>
                            <th>Chủ đề</th>
                            <th>Nội dung</th>
                            <th>Ngày đăng</th>
                            <th>Ngày chỉnh sửa</th>
                            <th>Số câu trả lời</th>
                            <th className="text-center">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredFaqs.map((faq) => (
                            <tr key={faq.question_id}>
                              <td className="text-bold-500">{faq.first_name} {faq.last_name}</td>
                              <td>{faq.title}</td>
                              <td className="text-bold-500">{faq.content}</td>
                              <td className="text-bold-500">{faq.create_at}</td>
                              <td className="text-bold-500">{faq.update_at}</td>
                              <td className="text-bold-500">{faq.answer_count}</td>
                              <td className="text-center">
                                <div className="d-flex justify-content-center flex-wrap gap-2">
                                  {/* <button className="btn btn-primary flex-grow-1 flex-shrink-1">Xem chi tiết</button> */}
                                  <button
                                      className="btn btn-secondary flex-grow-1 flex-shrink-1"
                                      onClick={() => handleUpdateFAQ(faq.question_id)}
                                    >
                                      Chi tiết
                                  </button>
                                  <button
                                      className="btn btn-success flex-grow-1 flex-shrink-1"
                                      onClick={() => handleUpdateFAQ(faq.question_id)}
                                    >
                                      Chỉnh sửa
                                  </button>
                                  <button
                                    className="btn btn-danger flex-grow-1 flex-shrink-1"
                                    onClick={() => handleDeleteFAQ(faq.question_id)}
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

export default AboutUsAdmin;
