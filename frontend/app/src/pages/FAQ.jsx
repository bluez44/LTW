import { useEffect, useRef, useState } from "react"
import "@/styles/FAQ-icon.css"
import "@/styles/FAQ.css"
import userImage from "@/assets/user.jpg"
import listFAQ from "@/mockups/FAQ"


const FAQ = () => {
    const [filterState, setFilterState] = useState("all")
    const [faqs, setFaqs] = useState([])
    const [openedAnswers, setOpenedAnswers] = useState([]);
    const targetSection = useRef(null)
    const scrollDown = () => {
        if(targetSection.current) targetSection.current.scrollIntoView({behavior: "smooth"})
    }

    const toggleAnswer = (index) => {
        if (!openedAnswers.includes(index)) {
            setOpenedAnswers([...openedAnswers, index]);
        } else{
            setOpenedAnswers(openedAnswers.filter(i => i !== index))
        }
    };


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

    useEffect(() => {
        setFaqs(listFAQ)
    })
    return(
        <div className="container">
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
                        <input type="text" placeholder="Nhập từ khóa bạn muốn tìm...">
                        </input>
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.78 13.78"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M5.56 11.12a5.56 5.56 0 1 1 5.56-5.56 5.56 5.56 0 0 1-5.56 5.56ZM5.56 1a4.56 4.56 0 1 0 4.56 4.56A4.57 4.57 0 0 0 5.56 1Z" className="search-1"></path><path d="M13.28 13.78a.51.51 0 0 1-.36-.15L8.81 9.52a.5.5 0 1 1 .71-.71l4.11 4.11a.5.5 0 0 1 0 .71.49.49 0 0 1-.35.15Z" className="search-1"></path></g></g></svg>
                        <p className="faq-number">{faqs.length} Câu hỏi</p>
                    </div>
                    <div className="filter-option">
                        <div className="filter-wrapper">
                            <a className={`${filterState === 'all'? 'filter-option-active': ''}`} onClick={() => setFilterState("all")}>Tất cả</a>
                            <a className={`${filterState === 'unanswer'? 'filter-option-active': ''}`} onClick={() => setFilterState("unanswer")}>Chưa trả lời</a>
                            <a className={`${filterState === 'answered'? 'filter-option-active': ''}`} onClick={() => setFilterState("answered")}>Đã trả lời</a>
                        </div>
                    </div>
                    <p className="faq-number-mobile">{faqs.length} Câu hỏi</p>
                </div>

                <div className="list-faq">
                    {faqs.map((faq, index) => (
                        <div className="faq-container">
                            <div className="faq-info">
                                <div className="faq-info-container">
                                    <img src={userImage}/>
                                    <div className="username-time">
                                        <p className="username-question">{faq.username}</p>
                                        <p className="time-question" style={{color: "gray", fontStyle: "italic", marginBlockStart: "5px"}}>{timeAgo(faq.create_at)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="faq-content">
                                <p className="question-tittle" style={{fontWeight: "bold"}}>{faq.tittle}</p>
                                <p className="question-content">{faq.content}</p>
                            </div>
                            <div style={{borderBlockStart: "1px solid rgba(0, 0, 0, 0.2)", marginBottom: "10px", marginTop: "15px"}}></div>
                            {openedAnswers.includes(index) && (
                                <>
                                     <div className="answer-section">
                                        <div className="answer-container">
                                            <div className="answer-info">
                                                <img src={userImage}/>
                                                <div className="username-time">
                                                    <p className="username-answer">Đặng Tiến Đạt</p>
                                                    <p className="time-answer"style={{color: "gray", fontStyle: "italic", marginBlockStart: "5px"}}>1 tháng trước</p>
                                                </div>
                                            </div>
                                            <p style={{marginBlockStart: "10px"}}>Em chỉ việc gửi qua mail của công ty thì tự động sẽ có mail phản hồi kết quả thôi em nhé</p>
                                        </div>
                                        <div className="answer-input">
                                            <textarea rows={4} placeholder="Viết câu trả lời của bạn..."/>
                                        </div>
                                    </div>
                                    <div style={{borderBlockStart: "1px solid rgba(0, 0, 0, 0.2)", marginBottom: "10px", marginTop: "5px"}}></div>
            
                                </>
                            )}
                            
                            <div className="faq-answer">
                                <p style={{color: "gray"}}>X câu trả lời</p>
                                <button type="button" className="answer-btn" onClick={() => toggleAnswer(index)}>{openedAnswers.includes(index)? "Thu gọn" : "Trả lời"}</button>
                            </div>  
                        </div> 
                    ))}
                    <div className="more">
                        <button className="more-btn">Xem thêm</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FAQ