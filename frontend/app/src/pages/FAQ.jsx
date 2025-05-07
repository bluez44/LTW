import { useEffect, useLayoutEffect, useRef, useState } from "react"
import "../styles/FAQ-icon.css"
import "../styles/FAQ.css"
import userImage from "../assets/user.jpg"
import { getUserInfo } from "@/api"
import notify from '@/utils/functions/Notify';
import { API_URL, instance } from "@/api"

const FAQ = () => {
    const [filterState, setFilterState] = useState("all")
    const [faqs, setFaqs] = useState([])
    const [search, setSearch] = useState("")
    const [totalQuestion, setTotalQuestion] = useState(0)
    const [openedAnswers, setOpenedAnswers] = useState([]);
    const [listAnswers, setListAnswers] = useState({})
    const [listTextAreaAnswers, setListTextAreaAnswers] = useState({}) 
    const [isCreateQuestion, setIsCreateQuestion] = useState(null)
    const [titleInputQuestion, setTitleInputQuestion] = useState("")
    const [contentInputQuestion, setContentInputQuestion] = useState("")
    const [isUpdateAnswer, setIsUpdateAnswer] = useState(0)
    const [userInfo, setUserInfo] = useState(null);

    const targetSection = useRef(null)
    const createQuestionTarget = useRef(null)
    
    useLayoutEffect(() => {
        const fetchUser = async () => {
            const res = await getUserInfo();
            return res;
        };

        const res = fetchUser();
        // console.log('res', res);

        res.then((res) => {
            if (res.status === 200) {
            setUserInfo(res.data.user);
            } else {
            setUserInfo(null);
            }
        });
    }, [userInfo]);

    const scrollDown = () => {
        if(targetSection.current) targetSection.current.scrollIntoView({behavior: "smooth"})
    }

    const handleOpenFormCreate = () => {
        setIsCreateQuestion("create")
        setTimeout(() => scrollDownCreateQuestionForm(), 100);
    }

    const handleUpdateFAQ = async (question_id, title, content) => {
        setTimeout(() => scrollDownCreateQuestionForm(), 100);
        setTitleInputQuestion(title)
        setContentInputQuestion(content)
        setIsCreateQuestion(question_id)
    }

    const handleUpdateAnswer = async (text, question_id, answer_id) => {
        handleTypeAnswer(text, question_id)
        setIsUpdateAnswer(answer_id)
    }

    const handleCancelUpdateAnswer = (question_id) => {
        handleTypeAnswer("", question_id)
        setIsUpdateAnswer(0)
    }

    const scrollDownCreateQuestionForm = () => {
        if (createQuestionTarget.current) {
            createQuestionTarget.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const handleCancelCreateFAQ = () => {
        if(isCreateQuestion !== "create"){
            setContentInputQuestion("")
            setTitleInputQuestion("")
        }
        setIsCreateQuestion(null)
    }

    const removeVietnameseTones = (str) => {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
    };

    const handleFilter = async (filter) => {
        setFilterState(filter)
        try {
            fetchTotalQuestion(filter, search);
            setFaqs([])
            setOpenedAnswers([])
            fetchInitFAQs(filter, search)
        } catch (error) {
            
        }
    }

    const handleCreateOrUpdateQuestion =  async () => {
        if(userInfo === null){
            notify(400,"Vui lòng đăng nhập để đặt câu hỏi!")
        }else{
            if(contentInputQuestion === "" || titleInputQuestion === ""){
                alert("Nhập đầy đủ tiêu đề và nội dung câu hỏi trước khi gửi")
                return
            }
            try {
                if(isCreateQuestion === "create"){
                    const response = await instance.post(`${API_URL}/create-question`, {
                        user_id: userInfo.id,
                        title: titleInputQuestion,
                        content: contentInputQuestion,
                    })
                    console.log(response)
                    if(response.data.status === 'success'){
                        setSearch("")
                        fetchInitFAQs("all", "")
                        setFilterState("all")
                        setContentInputQuestion("")
                        setTitleInputQuestion("")
                        fetchTotalQuestion("all", "")
                        setIsCreateQuestion(null)
                        notify(200,"Tạo câu hỏi thành công!")
                    }
                } else{
                    const response = await instance.post(`${API_URL}/update-question`, {
                        question_id: isCreateQuestion,
                        title: titleInputQuestion,
                        content: contentInputQuestion,
                    })
                    if(response.data.status === 'success'){
                        fetchInitFAQs(filterState, search)
                        fetchTotalQuestion(filterState, search)
                        setContentInputQuestion("")
                        setTitleInputQuestion("")
                        setIsCreateQuestion(null)
                        notify(200,"Chỉnh sửa câu hỏi thành công!")
                    }
                }
            } catch (error) {
                setIsCreateQuestion(false)
            }
        }
    }

    const fetchAnswersOfQuestion = async (question_id) =>{
        try {
            const response = await instance.get(`${API_URL}/get-answers?question_id=${question_id}`)
            setListAnswers(prevList => ({
                ...prevList,
                [question_id]: response.data
            }))
        } catch (error) {
            
        }
    }

    const toggleAnswer = async (index, question_id) => {
        if (!openedAnswers.includes(index)) {
            await fetchAnswersOfQuestion(question_id)
            setOpenedAnswers([...openedAnswers, index]);
        } else{
            setOpenedAnswers(openedAnswers.filter(i => i !== index))
        }
    };

    const handleDeleteAnswer = async (answer_id, question_id) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa câu trả lời này?")

        if(!confirm) return

        try {
            const response = await instance.get(`${API_URL}/delete-answer?answer_id=${answer_id}`)

            if(response.data.status === 'success'){
                fetchAnswersOfQuestion(question_id)
                notify(200,"Xóa câu trả lời thành công!")
            }
        } catch (error) {
            
        }
    }

    const handleCreateOrUpdateAnswer = async (question_id) => {
        if(userInfo === null){
            notify(400,"Vui lòng đăng nhập để trả lời")
        }else{
            if (listTextAreaAnswers[question_id] === undefined){
                alert("Vui lòng nhập câu trả lời trước khi gửi")
                return
            }
            try {
                if(isUpdateAnswer !== 0){
                    const response = await instance.post(`${API_URL}/update-answer`, {
                        answer_id: isUpdateAnswer,
                        content: listTextAreaAnswers[question_id]
                    })
                    if (response.data.status === "success"){
                        handleTypeAnswer("",question_id)
                        setIsUpdateAnswer(0)
                        fetchAnswersOfQuestion(question_id)
                        notify(200,"Chỉnh sửa câu hỏi thành công!")
                    }
                }else{
                    const response = await instance.post(`${API_URL}/create-answer`, {
                        user_id: userInfo.id,
                        question_id,
                        content: listTextAreaAnswers[question_id]
                    })
                    if (response.data.status === "success"){
                        handleTypeAnswer("",question_id)
                        fetchAnswersOfQuestion(question_id)
                        notify(200,"Tạo câu hỏi thành công!")
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSearch = async (str) => {
        setSearch(str)
        const normalizedSearch = removeVietnameseTones(str);
        try {
            fetchTotalQuestion(filterState, normalizedSearch)
            fetchInitFAQs(filterState, normalizedSearch)
        } catch (error) {
            console.log(error)
        }
    }

    const timeAgo = (date) => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
        if (diff < 60) return `${diff} giây trước`;
        const minutes = Math.floor(diff / 60);
        if (minutes < 60) return `${minutes} phút trước`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} giờ trước`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} ngày trước`;
        const weeks = Math.floor(days / 7);
        if (weeks < 4) return `${weeks} tuần trước`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} tháng trước`;
        const years = Math.floor(days / 365);
        return `${years} năm trước`;
    };

    const fetchMoreFAQs = async (filter, searchText) => {
        try {
            const response = await instance.get(`${API_URL}/get-10-questions?offset=${faqs.length}&limit=${faqs.length + 10}&filter=${filter}&search=${searchText}`)
            setFaqs(prevFAQs => [...prevFAQs, ...response.data])
        } catch (error) {
            console.error("Fetch error:", error);
            setFaqs([])
        }
    }

    const fetchInitFAQs = async (filter, searchText) => {
        try {
            const response = await instance.get(`${API_URL}/get-10-questions?offset=0&limit=10&filter=${filter}&search=${searchText}`)
            setFaqs(response.data)
        } catch (error) {
            console.error("Fetch error:", error);
            setFaqs([])
        }
    }

    const fetchTotalQuestion = async (filter, searchText) => {
        try {
            const response = await instance.get(`${API_URL}/count?filter=${filter}&search=${searchText}`)
            setTotalQuestion(response.data) 
        } catch (error) {
            console.error("Fetch error:", error);
            setTotalQuestion(0)

        }
    }

    const handleDeleteQuestion = async (question_id, index) =>{
        const confirm = window.confirm("Bạn có chắc muốn xóa câu hỏi này không?")
        if (!confirm) return

        try {
            const response = await instance.get(`${API_URL}/delete-question?question_id=${question_id}`)
            if(response.data.status === 'success'){
                if(faqs.length < 10) {
                    fetchInitFAQs(filterState, search)
                }else{
                    setFaqs(faqs.filter(faq => faq.question_id !== question_id))
                }
                setOpenedAnswers(openedAnswers.filter(openedAnswer => openedAnswer !== index))
                fetchTotalQuestion(filterState, search)
                notify(200,"Xóa câu hỏi thành công!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleTypeAnswer = (text, question_id) => {
        setListTextAreaAnswers(prev => ({
            ...prev,
            [question_id]: text
        }))
    }

    useEffect( () => {
        fetchInitFAQs("all", "")
        fetchTotalQuestion("all", "")
    }, [])
    return(
        <div className="container-faq">

            <section className="banner">
                <div className="banner-container">
                    <div className="banner-wrapper">
                        <div className="banner-slide">
                            <img className="" data-src="http://corp.vcdn.vn/upload/vng/source/Banner/header3.jpg" alt="" src="http://corp.vcdn.vn/upload/vng/source/Banner/header3.jpg"/>
                            <h2 className="">HỎI ĐÁP</h2>
                            <div className="banner-info" >
                                <div className="">
                                    <a className="" href="https://vng.com.vn/news/enterprise/vng-kien-tri-thuc-hien-su-menh-tro-thanh-noi-lam-viec-tot-nhat.html">Câu hỏi nổi bật </a>
                                    <p className="">Nơi bạn có thể đặt bất kỳ câu hỏi nào cho chúng tôi </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="scroll-down" onClick={scrollDown}>
                    <span className="svg" data-icon="arrow-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle cx="20" cy="20" r="20" fill="#4d4d4d"></circle><path d="M20 24.5a.5.5 0 0 1-.5-.5V12a.5.5 0 0 1 1 0v12a.5.5 0 0 1-.5.5Z" className="cls-2"></path><path d="M20 28.5a.52.52 0 0 1-.38-.17l-3.5-4a.5.5 0 1 1 .76-.66L20 27.24l3.12-3.57a.5.5 0 0 1 .76.66l-3.5 4a.52.52 0 0 1-.38.17Z" className="cls-2"></path></g></g></svg></span>
                </a>
            </section>
            <section className="faq" ref={targetSection}>
                <div className="option-bar">
                    <div className="search-option">
                        <input type="text" placeholder="Nhập từ khóa bạn muốn tìm..." value={search} onChange={(e) => handleSearch(e.target.value)}>
                        </input>
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.78 13.78"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M5.56 11.12a5.56 5.56 0 1 1 5.56-5.56 5.56 5.56 0 0 1-5.56 5.56ZM5.56 1a4.56 4.56 0 1 0 4.56 4.56A4.57 4.57 0 0 0 5.56 1Z" className="search-1"></path><path d="M13.28 13.78a.51.51 0 0 1-.36-.15L8.81 9.52a.5.5 0 1 1 .71-.71l4.11 4.11a.5.5 0 0 1 0 .71.49.49 0 0 1-.35.15Z" className="search-1"></path></g></g></svg>
                        <p className="faq-number">{totalQuestion} Câu hỏi</p>
                    </div>
                    <div className="filter-option">
                        <div className="filter-wrapper">
                            <a className={`${filterState === 'all'? 'filter-option-active': ''}`} onClick={() => handleFilter("all")}>Tất cả</a>
                            <a className={`${filterState === 'unanswer'? 'filter-option-active': ''}`} onClick={() => handleFilter("unanswer")}>Chưa trả lời</a>
                            <a className={`${filterState === 'answered'? 'filter-option-active': ''}`} onClick={() => handleFilter("answered")}>Đã trả lời</a>
                        </div>
                    </div>
                    <p className="faq-number-mobile">{totalQuestion} Câu hỏi</p>
                </div>

                <div className="list-faq">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-container">
                            <div className="faq-info">
                                <div className="faq-info-container">
                                    <img src={userImage}/>
                                    <div className="username-time">
                                        <p className="username-question">{faq.first_name} {faq.last_name}</p>
                                        <p className="time-question" style={{color: "gray", fontStyle: "italic", marginBlockStart: "5px"}}>
                                            {faq.create_at ? timeAgo(new Date(faq.create_at)) : "Không rõ thời gian"}
                                        </p>
                                    </div>
                                </div>
                                { faq.user_id === userInfo?.id && (
                                    <div className="answer-option">
                                        <a onClick={() => handleUpdateFAQ(faq.question_id, faq.title, faq.content)}>Chỉnh sửa</a>
                                        <p>|</p>
                                        <a onClick={() => handleDeleteQuestion(faq.question_id, index)}>Xóa</a>
                                    </div>
                                )}
                            </div>
                            <div className="faq-content">
                                <p className="question-tittle" style={{fontWeight: "bold"}}>{faq.title}</p>
                                <p className="question-content">{faq.content}</p>
                            </div>
                            <div style={{borderBlockStart: "1px solid rgba(0, 0, 0, 0.2)", marginBottom: "10px", marginTop: "15px"}}></div>
                            {openedAnswers.includes(index) && (
                                <>
                                    <div className="answer-section">
                                        {listAnswers[faq.question_id].map((answer, ansIdx) => (
                                            <div key={ansIdx}>
                                                <div className="answer-container">
                                                    <div className="top-answer-section">
                                                        <div className="answer-info">
                                                            <img src={userImage}/>
                                                            <div className="username-time">
                                                                <p className="username-answer">{answer.first_name} {answer.last_name}</p>
                                                                <p className="time-answer"style={{color: "gray", fontStyle: "italic", marginBlockStart: "5px"}}>{timeAgo(new Date(answer.create_at))}</p>
                                                            </div>
                                                        </div>
                                                        {answer.user_id === userInfo?.id && (<div className="answer-option">
                                                            <a onClick={() => handleUpdateAnswer(answer.content, answer.question_id, answer.answer_id)}>Chỉnh sửa</a>
                                                            <p>|</p>
                                                            <a onClick={() => handleDeleteAnswer(answer.answer_id, answer.question_id)}>Xóa</a>
                                                        </div>)}
                                                    </div>
                                                    <p style={{marginBlockStart: "10px"}}>{answer.content}</p>
                                                </div> 
                                            </div>
                                        ))}
                                        <div className="answer-input">
                                            <textarea 
                                            rows={4} 
                                            placeholder="Viết câu trả lời của bạn..." 
                                            onChange={(e) => handleTypeAnswer(e.target.value, faq.question_id)}     
                                            value={listTextAreaAnswers[faq.question_id] || ""}/>
                                            <div>
                                                {isUpdateAnswer !== 0 && (
                                                    <button className="cancel-btn" style={{marginRight: '10px'}} onClick={() => handleCancelUpdateAnswer(faq.question_id)}>Hủy chỉnh sửa</button>
                                                )}
                                                <button className="submit-button" onClick={() => handleCreateOrUpdateAnswer(faq.question_id)}>Gửi</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{borderBlockStart: "1px solid rgba(0, 0, 0, 0.2)", marginBottom: "10px", marginTop: "5px"}}></div>
                                </>
                            )}
                            
                            <div className="faq-answer">
                                <p style={{color: "gray"}}>{faq.answer_count} câu trả lời</p>
                                <button type="button" className="answer-btn" onClick={() => toggleAnswer(index, faq.question_id)}>{openedAnswers.includes(index)? "Thu gọn" : "Trả lời"}</button>
                            </div> 
                        </div> 
                    ))}
                    {faqs.length < totalQuestion && (
                        <div className="more">
                            <button className="more-btn" onClick={() => fetchMoreFAQs(filterState, search)}>Xem thêm</button>
                        </div>)
                    }
                </div>
                {isCreateQuestion ? (
                    <div ref={createQuestionTarget} className="create-question-container" style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="create-question-form">
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>Đặt câu hỏi</p>
                            <div>
                                <label>Tiêu đề</label>
                                <input 
                                type="text" 
                                placeholder="Nhập tiêu đề cho câu hỏi..." 
                                value={titleInputQuestion} 
                                onChange={(e) => setTitleInputQuestion(e.target.value)}/>
                            </div>
                
                            <div>
                                <label>Nội dung</label>
                                <textarea 
                                rows={5} 
                                placeholder="Nhập nội dung cho câu hỏi..."
                                value={contentInputQuestion} 
                                onChange={(e) => setContentInputQuestion(e.target.value)}></textarea>
                            </div>
                
                            <div className="create-question-option">
                                <button className="cancel-btn" onClick={() => handleCancelCreateFAQ()}>Hủy</button>
                                <button className="submit-button" onClick={() => handleCreateOrUpdateQuestion()}>Gửi</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button className="create-new-question" onClick={() => handleOpenFormCreate()}>Đặt câu hỏi mới</button>
                )}
                
            </section>
        </div>
    )
}


export default FAQ