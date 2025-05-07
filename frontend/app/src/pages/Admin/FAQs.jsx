import React, { useEffect, useMemo, useState } from 'react';
import notify from '@/utils/functions/notify';
import "@/styles/FAQAdmin.css"
import { API_URL, instance } from '@/api';


function FAQs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [showDetail, setShowDetail] = useState(false)
  const [faqShow, setFaqShow] = useState(null)
  
 
  const handleShowDetail = (faq) => {
    setFaqShow(faq)
    setShowDetail(true)
  }

  // const handleUpdateFAQ = async (id, status) => {

  // };

  const handleDeleteFAQ = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa câu hỏi này không? Tất cả câu trả lời liên quan cũng sẽ bị xóa!")
    if (!confirm) return

    try {
        const response = await instance.get(`${API_URL}/delete-question?question_id=${id}`)
        console.log(response)
        if(response.data.status === 'success'){
          fetchFaqs()
          notify(200,"Xóa câu hỏi thành công!")
        }
    } catch (error) {
      notify("Không thể xóa câu hỏi trong lúc này")
    }
  };

  const fetchFaqs = async () =>{
    try {
      const response = await instance.get(`${API_URL}/get-all-questions`)
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
      {showDetail && (<DetailQuestionPopUp 
      onClose={() => setShowDetail(false)} 
      faq={faqShow}
      fetchFaqs={() => fetchFaqs()}/>)}
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
                                      onClick={() => handleShowDetail(faq)}
                                    >
                                      Chi tiết
                                  </button>
                                  {/* <button
                                      className="btn btn-success flex-grow-1 flex-shrink-1"
                                      onClick={() => handleUpdateFAQ(faq.question_id)}
                                    >
                                      Chỉnh sửa
                                  </button> */}
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

const DetailQuestionPopUp = ({onClose, faq, fetchFaqs}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [answerss, setAnswers] = useState([])

  const fetchAnswers = async () => {
    try {
      const response = await instance.get(`${API_URL}/get-answers?question_id=${faq.question_id}`)
      setAnswers(response.data)
    } catch (error) {
      setAnswers([])
    }
  }

  const handleDeleteAnswer = async (answer_id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa câu trả lời này?")

    if(!confirm) return

    try {
        const response = await instance.get(`${API_URL}/delete-answer?answer_id=${answer_id}`)

        if(response.data.status === 'success'){
            fetchAnswers(faq.question_id)
            fetchFaqs()
            notify(200,"Xóa câu trả lời thành công!")
        }
    } catch (error) {
        
    }
  }

  useEffect(() => {
    fetchAnswers()
  },[])

  const filteredAnswers = useMemo(() => {
    return answerss.filter((answer) => {
      return (
        answer?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        answer?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        answer?.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, answerss]);
  return(
    <div className='container-popup-background'>
      <div className='container-popup'>
        <div>
          <button onClick={() => onClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
            <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
            </svg>
          </button>
        </div>
        <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>THÔNG TIN CHI TIẾT</h1>
        <div>
          <div>
            <p>Họ và tên</p>
            <p>{faq.first_name} {faq.last_name}</p>
          </div>
          <div>
            <p>Số câu trả lời</p>
            <p>{faq.answer_count}</p>
          </div>
        </div>
        <div>
          <div>
            <p>Thời gian tạo</p>
            <p>{faq.create_at}</p>
          </div>
          <div>
            <p>Thời gian chỉnh sửa</p>
            <p>{faq.update_at}</p>
          </div>
        </div>
        <div className='title-question'>
          <h6>Chủ đề</h6>
          <p>{faq.title}</p>
        </div>
        <div className='content-question'>
          <h6>Nội dung</h6>
          <p>{faq.content}</p>
        </div>
        <div className='line'></div>
        <div>
          <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Danh sách câu trả lời</h1>
          {faq.answer_count === 0 ? (
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: '300px' }}
            >
              <h4 className="text-center">Không có câu trả lời nào</h4>
            </div>
          ) : (
            <>
              <form className="form-group mt-4">
                <input
                  type="text"
                  id="roundText"
                  className="form-control round"
                  placeholder="Tìm kiếm câu trả lời tên người dùng hoặc nội dung của câu trả lời"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <div className="table-responsive">
                <table className="table table-lg">
                  <thead>
                    <tr>
                      <th>Họ và tên</th>
                      <th>Nội dung</th>
                      <th>Ngày trả lời</th>
                      <th>Ngày chỉnh sửa</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnswers.map((answer) => (
                      <tr key={answer.answer_id}>
                        <td className="text-bold-500">{answer.first_name} {answer.last_name}</td>
                        <td className="text-bold-500">{answer.content}</td>
                        <td className="text-bold-500">{answer.create_at}</td>
                        <td className="text-bold-500">{answer.update_at}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center flex-wrap gap-2">
                            {/* <button className="btn btn-primary flex-grow-1 flex-shrink-1">Xem chi tiết</button> */}
                            {/* <button
                                className="btn btn-success flex-grow-1 flex-shrink-1"
                                onClick={() => handleUpdateAnswer(answer.answer_id)}
                              >
                                Chỉnh sửa
                            </button> */}
                            <button
                              className="btn btn-danger flex-grow-1 flex-shrink-1"
                              onClick={() => handleDeleteAnswer(answer.answer_id)}
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
  )
}

export default FAQs;
