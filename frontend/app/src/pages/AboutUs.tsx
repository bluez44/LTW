import { useRef, useState } from 'react';
import './css/AboutUs-icon.css'
import './css/AboutUs.css'

const AboutUs = () => {
    const [selectedTab, setSelectedTab] = useState<string>('challenge')
    const [isShowMilestone0, setIsShowMileStone0] = useState<boolean>(false)
    const [isShowMilestone1, setIsShowMileStone1] = useState<boolean>(false)
    const [isShowMilestone2, setIsShowMileStone2] = useState<boolean>(false)
    const [isShowMilestone3, setIsShowMileStone3] = useState<boolean>(false)

    const targetSection = useRef<HTMLDivElement | null>(null)

    const scrollDown = () => {
        if(targetSection.current) targetSection.current.scrollIntoView({behavior: "smooth"})
    }

    const handleShowMilestone = (index: number) => {
        if(index === 0) setIsShowMileStone0(!isShowMilestone0)
        else if (index === 1) setIsShowMileStone1(!isShowMilestone1)
        else if (index === 2) setIsShowMileStone2(!isShowMilestone2)
        else setIsShowMileStone3(!isShowMilestone3)
    }

    const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement>, tab: string) =>{
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
        <div className='container'>
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
                    <h4 className="milestone-h4" >Cột mốc chính</h4>
                    <div className="content-2">
                        <div className="content-2-wrapper">
                            <div className={` arrow milestone-point ${isShowMilestone0? 'show-milestone-background' : ''}`}><img className="" data-src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-05.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-05.png"/>
                                <div className="description">
                                    <div className={`milestone-content ${isShowMilestone0? 'show-milestone' : ''}`}>
                                        <h6 className="" style={{color: "#eb5a26"}}>2022 - Nay</h6>
                                        <h3>Trí tuệ nhân tạo</h3>
                                        <p className=""><span className="bold">2024:</span><br/>- 2 năm liên tiếp được vinh danh "Nơi làm việc xuất sắc" - Great Place to Work.<br/>- Ra mắt trung tâm dữ liệu AI Cloud GreenNode tại Bangkok, một trong những trung tâm AI Cloud quy mô lớn đầu tiên của Đông Nam Á.&nbsp;<br/>- VNGGames nhận giải Nhà phát hành xuất sắc năm thứ hai liên tiếp tại giải thưởng Game Việt Nam (Vietnam Game Award).<br/>- Zalo trở thành ứng dụng nhắn tin phổ biến nhất tại Việt Nam với 78 triệu người dùng thường xuyên hàng tháng.<br/>- Zalopay công bố nhận diện thương hiệu mới và định hướng phát triển "Mới và Mở".<br/>- VNG hợp tác với ST Telemedia Global Data Centres (STT GDC) xây dựng và vận hành trung tâm dữ liệu chuẩn quốc tế tại TP. Hồ Chí Minh.<br/>- Kiki Auto cán mốc 1 triệu lượt cài đặt trên ô tô.&nbsp;&nbsp;<br/><span className="bold">2023:</span><br/>- Được vinh danh bởi nhiều giải thưởng uy tín toàn cầu của Nikkei Asia, Great Place To Work®, Asia Pacific Enterprise Awards.<br/>- Nộp hồ sơ F-1 lên Ủy ban Giao dịch chứng khoán Hoa Kỳ (SEC).<br/>- Mã chứng khoán VNZ của công ty chính thức giao dịch trên sàn UpCom (Việt Nam), trở thành mã chứng khoán có trị giá cao nhất trên thị trường.&nbsp;<br/>- Mở rộng nỗ lực "Go Global" với 3 văn phòng mới tại Đài Bắc, Thượng Hải, Bắc Kinh.<br/>- Zalo 3 năm liên tiếp là ứng dụng liên lạc phổ biến nhất Việt Nam, theo báo cáo "The Connected Consumer Q4 2022".<br/>- Zalo AI phát triển hạ tầng mạnh nhất Việt Nam với 8 DGX H100, ra mắt mô hình LLM 7 tỷ tham số vượt trội GPT 3.5.<br/>- Gen AI Avatar của Zalo đạt 6,8 triệu người dùng, Kiki Auto có 600.000 lượt cài đặt trên ô tô.<br/>- Đổi tên Quỹ VNIF thành Quỹ Kiến tạo Ước mơ (DMF), hỗ trợ lĩnh vực Y tế, Giáo dục, Công nghệ.&nbsp;<br/><strong>2022:</strong><br/>- Ra mắt bộ logo mới, giữ vững tinh thần đón nhận thách thức.&nbsp;<br/>- Khánh thành VNG Data Center tại TP.HCM, đạt chứng chỉ Uptime Tier III.<br/>- Zalo trở thành Ứng dụng liên lạc hàng đầu của người Việt (theo Decision Lab), lọt Top 200 ứng dụng miễn phí được yêu thích nhất (theo Apple).<br/>- Zalo AI phát triển ứng dụng định danh điện tử (eKYC) trên Zalo.<br/>- Game của VNGGames phát hành được lựa chọn thi đấu tại SEA Games 31. Thành tích của đội tuyển eSports Việt Nam tại kỳ SEA Games này là 4 HCV, 3 HCB.<br/>- Zalopay chạm cột mốc 10 triệu người dùng thường xuyên.</p>
                                    </div>
                                    <a className="" onClick={() => handleShowMilestone(0)}>{isShowMilestone0? 'Thu gọn' : 'Xem thêm'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="content-2-wrapper">
                            <div className={`milestone-point ${isShowMilestone1? 'show-milestone-background' : ''}`}><img className="" data-src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-04.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-04.png"/>
                                <div className="description">
                                    <div className={`milestone-content ${isShowMilestone1? 'show-milestone' : ''}`}>
                                        <h6 className="" style={{color: "#eb5a26"}}>2018 - 2021</h6>
                                        <h3>Điện toán đám mây</h3>
                                        <p className=""><span className="">2021:</span><br/>- Được HR Asia vinh danh "Nơi làm việc tốt nhất Châu Á" năm thứ 3 liên tiếp.<br/>- Tính đến Q1/2021, Zalo ghi nhận 64 triệu người sử dụng thường xuyên với 1,7 tỷ tin nhắn được gửi đi hàng ngày.&nbsp;<br/>- VNG Cloud nhận giải "Sản phẩm, Giải pháp chuyển đổi số tiêu biểu" tại Giải thưởng Chuyển đổi số Việt Nam.&nbsp;<br/>- Ra mắt nền tảng thiện nguyện Sài gòn bao dung, cùng với tính năng Zalo Connect hỗ trợ người dùng tìm kiếm trợ giúp trong thời gian giãn cách xã hội vì COVID-19.<br/>- Quyên góp 20 tỷ đồng cho Quỹ vắc-xin phòng chống COVID-19 của Bộ Y Tế.<br/><span className="bold">2020:</span><br/>- VNG Cloud đạt chứng nhận "Nền tảng Điện toán đám mây an toàn Việt Nam" của Bộ Thông tin và Truyền thông và được vinh danh là sản phẩm Make in Vietnam tiêu biểu tại giải thưởng "Thành phố thông minh Việt Nam".</p>
                                        <p className="">- Zalo trở thành kênh thông tin chính thức của Chính phủ trong hỗ trợ thiên tai, dịch bệnh.<br/>- Zalopay giành giải Vàng MMA và được bình chọn là "Ví điện tử có hệ sinh thái phong phú".<br/>- Zalo lần đầu ra mắt Kiki Auto - trợ lý ảo tiếng Việt dành cho ô tô.&nbsp;<br/><strong>2019</strong>:<br/>- Khai trương trụ sở VNG Campus, mô hình văn phòng thông minh chuẩn quốc tế.<br/>- Xác định sứ mệnh mới "Kiến tạo công nghệ và phát triển con người. Từ Việt Nam vươn tầm thế giới" cùng 3 giá trị cốt lõi mới: Đón nhận thách thức, Phát triển đối tác, Giữ gìn chính trực.&nbsp;<br/>- VNG lọt Top 50 Thương hiệu có giá trị nhất Việt Nam do tạp chí Forbes bình chọn.&nbsp;<br/>- PUBG Mobile có 13 triệu người dùng chỉ sau 1 năm chính thức ra mắt tại thị trường Việt Nam, đạt Top 1 App Store và Top 10 Google Play liên tục trong 6 tháng.&nbsp;<br/>- Series Dead Target Zombie đạt 150 triệu lượt tải về trên toàn cầu.&nbsp;<br/>- Zalo đạt 52,4 triệu người dùng thường xuyên hàng tháng, hỗ trợ triển khai dịch vụ công của 45 tỉnh thành.&nbsp;<br/><strong>2018:</strong><br/>- Mở rộng hiện diện quốc tế với văn phòng tại Thái Lan và Myanmar.<br/>- VinaData đổi tên thành VNG Cloud, cung cấp giải pháp chuyển đổi số đáng tin cậy.&nbsp;<br/>- Ra mắt UpRace, dự án chạy bộ cộng đồng tiên phong tại Việt Nam.&nbsp;</p>
                                    </div>
                                    <a className="" onClick={() => handleShowMilestone(1)}>{isShowMilestone1? 'Thu gọn' : 'Xem thêm'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="content-2-wrapper">
                            <div className={`milestone-point ${isShowMilestone2? 'show-milestone-background' : ''}`}><img className="" data-src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-03.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-03.png"/>
                                <div className="description">
                                    <div className={`milestone-content ${isShowMilestone2? 'show-milestone' : ''}`}>
                                        <h6 className="" style={{color: "#eb5a26"}}>2013 - 2017</h6>
                                        <h3>Internet Di Động</h3>
                                        <p className=""><span className="">2017:</span><br/>- Ra mắt ứng dụng thanh toán di động Zalopay, thúc đẩy thanh toán không dùng tiền mặt.<br/>- Ký biên bản ghi nhớ về việc niêm yết cổ phiếu trên sàn chứng khoán NASDAQ (Mỹ).<br/>- Lần đầu tiên tổ chức Zalo AI Summit.<br/>- Ông Lê Hồng Minh được vinh danh là một trong 10 nhà lãnh đạo có ảnh hưởng nhất đến Internet Việt Nam.<br/><span className="bold">2015:</span><br/>- Là nhà tài trợ chiến lược của giải IRONMAN 70.3, khởi động phong trào ba môn phối hợp tại Việt Nam.&nbsp;<br/><span className="bold">2014:</span></p>
                                        <p className="">- Là doanh nghiệp kỳ lân đầu tiên của Việt Nam khi được Start-up Report định giá 1 tỷ USD.&nbsp;<br/>- Nhận Huân chương Lao động Hạng Ba và Bằng khen của Thủ tướng Chính phủ tặng ông Lê Hồng Minh - Tổng giám đốc VNG.&nbsp;<br/>- Ra mắt game "Dead Target Zombie", đánh dấu sự hiện diện của game mobile Việt Nam trên bản đồ thế giới.<br/>- Được vinh danh "Doanh nghiệp phát triển nhanh toàn cầu tại khu vực Đông Á" tại Diễn đàn Kinh tế Thế giới 2015 (Manila, Philippines).<br/><span className="bold">2013:</span><br/>- Tập trung vào chiến lược "Mobile first", chuyển đổi sản phẩm sang di động.<br/>- Được Hội tin học TP.HCM (HCA) vinh danh "Đơn vị dịch vụ nội dung số hàng đầu Việt Nam".<br/>- Ra mắt Adtima, nền tảng quảng cáo, truyền thông số và giải trí hàng đầu Việt Nam, đặc biệt trên di động.&nbsp;</p>
                                    </div>
                                    <a className="" onClick={() => handleShowMilestone(2)}>{isShowMilestone2? 'Thu gọn' : 'Xem thêm'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="content-2-wrapper">
                            <div className={`milestone-point ${isShowMilestone3? 'show-milestone-background' : ''}`}><img className="" data-src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-02.png" alt="" src="//corp.vcdn.vn/upload/vng/source/Milestone/MILESTONE-02.png"/>
                                <div className="description">
                                        <div className={`milestone-content ${isShowMilestone3? 'show-milestone' : ''}`}>
                                            <h6 className="" style={{color: "#eb5a26"}} >2004 - 2012</h6>
                                            <h3>Dẫn đầu thị trường dịch vụ internet</h3>
                                            <p className=""><span className="">2012:</span><br/>- Tham gia nhiều hoạt động xã hội, đóng góp xuồng Chủ quyền trị giá 3,5 tỷ đồng cho Trường Sa.<br/>- Khẳng định vị thế quốc tế với việc phát hành trò chơi "Khu Vườn Trên Mây" tại Trung Quốc.<br/>- Ra mắt Zalo, ứng dụng nhắn tin và gọi điện miễn phí, dẫn đầu BXH App Store tại Việt Nam chỉ sau 1 tháng.<br/>- Ra mắt Zing TV, phục vụ nhu cầu giải trí và kết nối mọi lúc mọi nơi trên tất cả các nền tảng.&nbsp;<br/>- Bổ sung nền tảng tổng hợp tin tức Báo Mới vào danh mục sản phẩm đa dạng của VNG.&nbsp;<br/><span className="bold">2011:</span><br/>- Đạt Top 200 thương hiệu Sao Vàng Đất Việt.&nbsp;<br/>- Được vinh danh "Doanh nghiệp nội dung số có sản phẩm, dịch vụ thương hiệu Việt Nam thành công nhất" tại Giải thưởng CNTT-TT Việt Nam 2010 (VICTA).<br/>- Xuất khẩu thành công trò chơi "Ủn Ỉn", chinh phục thị trường Nhật Bản.&nbsp;<br/><strong>2010:</strong><br/>- Đổi tên thương hiệu thành VNG, đánh dấu bước chuyển mình mạnh mẽ.<br/>- Thành lập Quỹ từ thiện cộng đồng Người sử dụng Internet Việt Nam (VNIF).<br/>- "Thuận Thiên Kiếm" đoạt giải Sao Khuê cho nhóm "Sản phẩm/giải pháp game và giải trí điện tử."<br/><strong>2009:</strong><br/>- Ra mắt ZingPlay, cổng game giải trí đa nền tảng đầu tiên tại Việt Nam.<br/>- Giới thiệu mạng xã hội ZingMe, đạt 4 triệu MAU chỉ sau 6 tháng.<br/><strong>2008:</strong><br/>- Đề ra sứ mệnh "Phát triển Internet để thay đổi cuộc sống người Việt Nam", kim chỉ nam cho công ty trong nhiều năm tiếp theo.<br/><strong>2007:</strong><br/>- Đạt Top 50 công ty có môi trường làm việc tốt nhất tại Việt Nam (theo Navigos - AC Nielsen).<br/>- Khánh thành Trung tâm dữ liệu VinaData, giám sát và lưu trữ dữ liệu của tất cả sản phẩm trong công ty.<br/>- Ra mắt Zing MP3, sản phẩm đầu tiên mang thương hiệu Zing, bắt đầu mảng kinh doanh web.<br/><strong>2006:</strong><br/>- Tập trung phát triển các sản phẩm giải trí và phần mềm tiện ích tại Việt Nam.<br/>- Ra mắt phần mềm quản lý phòng máy CSM (Cyber Station Manager).<br/><strong>2005:</strong><br/>- Trở thành công ty đầu tiên đàm phán thành công với đối tác quốc tế và phân phối game bản quyền tại Việt Nam.<br/>- Phát hành game online đầu tiên - Võ Lâm Truyền Kỳ với thành công đột phá 300.000 PCU sau 1 tháng.<br/><strong>2004:</strong><br/>- Thành lập với tên gọi VinaGame tại một quán cà phê Internet, mở ra kỷ nguyên game nhập vai tại Việt Nam.</p>
                                        </div>
                                        <a className="" onClick={() => handleShowMilestone(3)}>{isShowMilestone3? 'Thu gọn' : 'Xem thêm'}</a>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </div>
            </section>
            <section className="managers" id="">
                <div className="content-3">
                    <h4 className="" data-aos="">
                    Ban lãnh đạo cấp cao
                    </h4>
			        <div className="person-list" data-aos="">
                        <a className="person-item" href="//www.vng.com.vn/aboutvng/management-team/le-hong-minh.html">
                            <div className="person-img">
                                <img className="" data-src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Minh-2.jpg" alt="" src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Minh-2.jpg"/>
                            </div>
                            <div className="person-infor">
                                <h4>Lê Hồng Minh </h4>
                                <p className="">Founder &amp; Chairman of VNG </p>
                            </div>
                        </a>
                        <a className="person-item" href="//www.vng.com.vn/aboutvng/management-team/vuong-quang-khai.html">
                            <div className="person-img">
                                <img className="" data-src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Khai-2-1.jpg" alt="" src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Khai-2-1.jpg"/>
                            </div>
                            <div className="person-infor">
                                <h4>Vương Quang Khải </h4>
                                <p className="">Co-founder, Executive Vice President of VNG </p>
                            </div>
                        </a>
                        <a className="person-item" href="//www.vng.com.vn/aboutvng/management-team/nguyen-le-thanh.html">
                            <div className="person-img">
                                <img className="" data-src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Thanh-2.jpg" alt="" src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Thanh-2.jpg"/>
                            </div>
                            <div className="person-infor">
                                <h4>Nguyễn Lê Thành </h4>
                                <p className="">Vice President of VNG, CEO of Digital Business </p>
                            </div>
                        </a>
                        <a className="person-item" href="//www.vng.com.vn/aboutvng/management-team/kelly-wong.html">
                            <div className="person-img">
                                <img className="imgBg ls-is-cached lazyloaded" data-src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Kelly-2.jpg" alt="" src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Kelly-2.jpg"/>
                            </div>
                            <div className="person-infor">
                                <h4>Kelly Wong </h4>
                                <p className="">Vice President of VNG, CEO of VNGGames </p>
                            </div>
                        </a>
                        <a className="person-item" href="//www.vng.com.vn/aboutvng/management-team/raymond-tan.html">
                            <div className="person-img">
                                <img className="" data-src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Ray-2.jpg" alt="" src="//corp.vcdn.vn/products/upload/vng/source/SMT/380x330/A-Ray-2.jpg"/>
                            </div>
                            <div className="person-infor">
                                <h4>Raymond Tan </h4>
                                <p className="">Chief Financial Officer of VNG </p>
                            </div>
                        </a>
             
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs