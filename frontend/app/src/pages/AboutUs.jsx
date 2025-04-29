import { useRef, useState } from 'react';
import '@/styles/AboutUs-icon.css'
import '@/styles/AboutUs.css'
import milestones from "../data/aboutUs/milestone.json"
import managers from "../data/aboutUs/manager.json"

const AboutUs = () => {
    const [selectedTab, setSelectedTab] = useState('challenge')
    const [isShowMilestones, setIsShowMilestones] = useState({})

    const targetSection = useRef(null)

    const scrollDown = () => {
        if(targetSection.current) targetSection.current.scrollIntoView({behavior: "smooth"})
    }

    const handleShowMilestone = (index) => {
        setIsShowMilestones((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      };

    const handleTabClick = (event, tab) =>{
        event.preventDefault();
        setSelectedTab(tab)
    }

    const renderContent = () => {
        switch (selectedTab) {
            case 'challenge':
                return (
                    <div className="frame-content">
                        <svg className='challenge-svg'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.45 66.25"><g  data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect width="11.79" height="64.04" x="35.34" y="1" className="cor-1" rx="2.8"></rect><rect width="11.79" height="64.04" x="66.89" y="7.58" className="cor-1" rx="2.8" transform="rotate(-45 72.792 39.598)"></rect><rect width="11.79" height="64.04" x="105.97" y="15.35" className="cor-1" rx="2.8" transform="rotate(-65.26 111.864 47.366)"></rect><rect width="11.79" height="64.04" x="135.92" y="15.35" className="cor-1" rx="2.8" transform="rotate(-65.26 141.81 47.37)"></rect><circle cx="23.13" cy="20.02" r="7.48" className="cor-1"></circle><path d="M13.74 30.1c3.48-2.19 8.68-2.84 13.22 4.95 5.19-5 6.55-4.31 7.47-3.17s-2.84 8.74-6.82 8.79S23 38.85 23 38.85s-.59 4.8-2.05 6.58c4 2.68 5.51 4.14 5.51 6.25V63c0 1.3-4.95 1.14-4.95 0v-9.2c0-1.06-3.73-3.66-5.35-3.9.16 3.89.65 5.51-2.43 7.54s-7 4.79-9.33 5.68c-2.05.78-4.87-3.24-2.52-4.62S8 54.87 8.46 53.8s-1.28-8.51-.32-10.48c1.3-2.65 2.37-11.19 5.6-13.22Z" className="cor-1"></path></g></g></svg>
                        <p>Phương châm "Đón nhận thách thức" đã gắn liền với VNG ngay từ những ngày đầu thành lập. Để biến giấc mơ thành hiện thực, chúng tôi kiên định xây dựng một văn hóa mà ở đó thách thức luôn được đón nhận như những cơ hội để mọi người cùng rèn luyện và phát triển. Chính lòng dũng cảm dám mơ ước những điều vĩ đại đã giúp VNG vượt qua mọi trở ngại và đạt được những thành tựu như ngày hôm nay.</p>
                    </div>
                );
            case 'partnership':
                return (
                    <div className="frame-content">
                        <svg className='pertnership-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.98 65.84"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle cx="19.47" cy="8.81" r="7.81" className="cor-2"></circle><path d="M10.08 15.82S2.55 16.55 1.25 31C-.28 48.1 5.66 47.1 5.66 47.1s.81 17.74 8.73 17.74 9-23 9-31.37c6.41 2.3 12.33 3 13.93 1.9s2.81-5.11 0-6.82-10.72-4.41-13.43-7.61L20 24.44l-1.11-4.61-2.21 4.61Z" className="cor-2"></path><circle cx="61.18" cy="8.81" r="7.81" className="cor-2"></circle><path d="M72.51 59.21c-1.3 3.13-3.27 5.63-6.25 5.63-7.92 0-9-23-9-31.37-6.41 2.3-12.33 3-13.93 1.9s-2.81-5.11 0-6.82S54 24.14 56.74 20.94l3.91 3.5.81-4.87L64 24.44l6.6-8.62s7.5.73 8.8 15.18" className="cor-2"></path><path d="M83.05 38a5.19 5.19 0 0 0-10 1.24l-6 .74 2 15.78L91 53l-2-15.76Z" className="cor-2"></path></g></g></svg>
                        <p>Đối với VNG, "Quan hệ đối tác" không chỉ đơn thuần là quá trình làm việc nhóm và hợp tác song phương trên cơ sở lợi ích, mà còn là quá trình xây dựng các mối quan hệ vững bền trên cơ sở lòng tin. Giá trị cốt lõi này được áp dụng cho toàn bộ các quan hệ hợp tác của VNG, xuyên suốt từ nội bộ đến bên ngoài.</p>
                    </div>
                );
            case 'integrity':
                return (
                    <div className="frame-content">
                        <svg className='integrity-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.93 77.63"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle cx="14.67" cy="21.04" r="8.99" className="cor-3"></circle><path d="M22.91 63.2c-1.5 5.26-4.21 6.9-8.24 6.9-6 0-9.07-3.64-9.57-17.45-6.9-.12-4.77-17.57 4-24.58m11.17 0a20 20 0 0 1 5 6.25" className="cor-3"></path><circle cx="70.26" cy="21.04" r="8.99" className="cor-3"></circle><path d="M62 63.2c1.5 5.26 4.21 6.9 8.23 6.9 6 0 9.07-3.64 9.57-17.45 6.91-.12 4.77-17.57-4-24.58m-11.14 0a20.13 20.13 0 0 0-5 6.25" className="cor-3"></path><circle cx="42.44" cy="10.63" r="9.63" className="cor-3"></circle><path d="M36.44 18.16c-4.63 3.72-7.53 10.16-8.38 15.74m20.38-15.74c4.68 3.76 7.56 10.31 8.41 15.94M42.44 76.63c19.87-6.5 20.93-38.13 20.93-38.13-13.59.38-20.93-7.14-20.93-7.14s-7.34 7.52-20.93 7.14c0 0 1.06 31.63 20.93 38.13Z" className="cor-3"></path><path d="M42.44 70.1s11-5.71 14.65-25.76c-10.67-2.17-14.65-6-14.65-6s-4 3.86-14.65 6C31.43 64.39 42.44 70.1 42.44 70.1Z" className="cor-3"></path></g></g></svg>
                        <p>Chính trực là lời hứa mà VNG cam kết thực hiện với khách hàng, đối tác kinh doanh, và toàn thể thành viên của mình. Tại VNG, chúng tôi nỗ lực xây dựng một tổ chức nơi mọi người có thể tin tưởng lẫn nhau và hành động dựa trên nền tảng là sự trung thực và lòng tin. Chúng tôi muốn đảm bảo rằng các thành viên của mình có thể tự hào là một phần của công ty và là một phần của tập thể nơi mọi người đều được tôn trọng vì tính chính trực, trung thực, và các giá trị cá nhân của mỗi người.</p>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className='container-aboutus'>
            <section className="banner">
                <div className="banner-container">
                    <div className="">
                        <div className="">
                            <img className="desktop" data-src="//corp.vcdn.vn/upload/vng/source/Banner/ABOUT%20BANNER%20220209-02.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Banner/ABOUT%20BANNER%20220209-02.png"/> 
                            <img className="mobile" data-src="//corp.vcdn.vn/upload/vng/source/Banner/ABOUT%20BANNER%20MOBILE-07.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Banner/ABOUT%20BANNER%20MOBILE-07.png"/>
                            <div className="top-content" data-aos="">
                                <div className="">
                                    <h4>Sứ mệnh</h4>
                                    <a className="" href="#">Kiến tạo công nghệ<br/>và phát triển con người&nbsp;<br/>Từ Việt Nam vươn tầm thế giới</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>
                    <a className="btn-scroll-down" onClick={() => scrollDown()}> <span className="svg" data-icon="arrow-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle cx="20" cy="20" r="20" fill="#4d4d4d"></circle><path d="M20 24.5a.5.5 0 0 1-.5-.5V12a.5.5 0 0 1 1 0v12a.5.5 0 0 1-.5.5Z" className="cls-2"></path><path d="M20 28.5a.52.52 0 0 1-.38-.17l-3.5-4a.5.5 0 1 1 .76-.66L20 27.24l3.12-3.57a.5.5 0 0 1 .76.66l-3.5 4a.52.52 0 0 1-.38.17Z" className="cls-2"></path></g></g></svg></span></a>
                </p>
            </section>

            <section className="cores-value"  ref={targetSection}>
                <div className="container-1">
                    <h4 className="" >Giá trị cốt lõi</h4>
                    <h3 className="" >Con người và văn hóa là tài sản quan trọng của VNG.</h3>
                    <p className="">Được định hướng bởi 03 giá trị cốt lõi, chúng tôi nỗ lực vì sự phát triển của cả công ty và cộng đồng.</p>
                    <div className="container-list-tab">
                        <div className="list-tab">
                            <a className={`choose-tab ${selectedTab === 'challenge'? 'active' : '' }`} href="#" onClick={(e) => handleTabClick(e,'challenge')}>
                                <span>ĐÓN NHẬN THÁCH THỨC</span>
                            </a>
                            <a className={`choose-tab ${selectedTab === 'partnership'? 'active' : '' }`} href="#" onClick={(e) => handleTabClick(e,'partnership')}>
                                <span>PHÁT TRIỂN ĐỐI TÁC</span>
                            </a>
                            <a className={`choose-tab ${selectedTab === 'integrity'? 'active' : '' }`} href="#" onClick={(e) => handleTabClick(e,'integrity')}>
                                <span>GIỮ GÌN CHÍNH TRỰC</span>
                            </a>
                        </div>
                        {renderContent()}
                    </div>                    
                </div>
            </section>
            <section className="milestone" id="">
                <div className="container-2">
                    <h4 className="milestone-h4">Cột mốc chính</h4>
                    <div className="content-2">
                        {milestones.map((milestone,index) => (
                            <div className='content-2-wrapper' key={index}>
                                <div className={`${index === 0? 'arrow': ''} milestone-point ${isShowMilestones[index.toString()]? 'show-milestone-background' : ''}`}>
                                    <img data-src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-05.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-05.png"/>
                                        <div className='description'>
                                            <div className={`milestone-content ${isShowMilestones[index.toString()]? 'show-milestone' : ''}`}>
                                                <h6 style={{color: "#eb5a26"}}>{milestone.time}</h6>
                                                <h3>{milestone.title}</h3>
                                                {milestone.submilestones.map((submilestone) => (
                                                    <p style={{ whiteSpace: 'pre-line' }}>
                                                        <span style={{fontWeight: 'bold'}}>{submilestone.time}</span>
                                                        {submilestone.content}
                                                    </p>
                                                ))}
                                            </div>
                                            <a className="" onClick={() => handleShowMilestone(index.toString())}>{isShowMilestones[index.toString()]? 'Thu gọn' : 'Xem thêm'}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>                    
                </div>
            </section>
            <section className="managers" id="">
                <div className="content-3">
                    <h4 className="" data-aos="">
                    Ban lãnh đạo cấp cao
                    </h4>
			        <div className="person-list" data-aos="">
                        {managers.map((manager, index) => (
                            <a key={index} className="person-item" href={manager.reference}>
                                <div className="person-img">
                                    <img className="" alt={`manager-${index}`} src={manager.image}/>
                                </div>
                                <div className="person-infor">
                                    <h4>{manager.name}</h4>
                                    <p className="">{manager.position}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs