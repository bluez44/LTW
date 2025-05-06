import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../mockup/Data';
import './css/News_List.css';

const News_List = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost/backend/app/news/getAll.php?ts=${Date.now()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // kiểm tra đây
                const normalizedData = data.map(normalizeNews);
                setNews(normalizedData);
                setFilteredNews(normalizedData);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                // Nếu fetch lỗi thì vẫn dùng mockup data
                setNews(data);
                setFilteredNews(data);
            });
    }, []);

    const filterNews = (category) => {
        setActiveCategory(category);
        if (category === "all") {
            setFilteredNews(news);
        } else {
            setFilteredNews(news.filter(item => item.category === category));
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            filterNews(activeCategory);
        } else {
            setFilteredNews(news.filter(item => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)));
        }
    };

    const handleSeeMore = (e) => {
        e.preventDefault();
        navigate('./reading-comment');
    };

    const handleNewsClick = (id) => {
        navigate(`/news/${id}`);
    };
    const normalizeNews = (item) => {
        const title = item.title || "";
        let category = "business"; // mặc định
    
        if (title.includes("Thông cáo báo chí")) {
            category = "press";
        } else if (title.includes("Tin tức doanh nghiệp")) {
            category = "business";
        } else if (title.includes("Báo cáo")) {
            category = "report";
        } else if (title.includes("Cổ đông")) {
            category = "shareholder";
        }
    
        return {
            id: parseInt(item.id),
            title: item.title,
            link: `/News/News_${item.id}/News_${item.id}.html`,
            datetime: new Date(item.created_at).toLocaleString("vi-VN"),
            description: item.content.substring(0, 100) + "...",
            image: item.media_url,
            proper_news: `./News/News_${item.id}/News_${item.id}.html`,
            category: category
        };
    };

    return (
        <div className="outer">
            <div id="scrollContent" className="inner scrollContent scrollSwipe">
                <section className="section section--1 margin-bottom-70">
                    <div className="swiper-container header-swiper headeranim-swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide gradient-image">
                                <img className="lazyload" data-src="http://corp.vcdn.vn/upload/vng/source/Banner/header3.jpg" src='http://corp.vcdn.vn/upload/vng/source/Banner/header3.jpg' alt="" />
                                <h2 className="header-title">Tin tức</h2>
                                <div className="header-info lg" data-aos="fade-up">
                                    <div className="header-wrapper">
                                        <a className="header-title" href="#" onClick={(e) => {e.preventDefault();navigate("/news/11");}}>Tin nổi bật</a>
                                        <p className="header-description">VNG trở thành Nơi làm việc tốt nhất Việt Nam 2023</p>
                                        <a className="btn btn-news" href='https://vng.com.vn/news/enterprise/vng-kien-tri-thuc-hien-su-menh-tro-thanh-noi-lam-viec-tot-nhat.html' target="_blank">
                                            <span className="svg" data-icon="arrow-2"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                    <a className="btn-scroll" href="javascript:void(0)">
                        <span className="svg" data-icon="arrow-1"></span>
                    </a>
                </section>

                <section className="section section--wrapper section--wrapper-list-news margin-bottom-65" id="latestnewssection">
                    <div className="container container--news">
                        <h4 className="margin-bottom-25" data-aos="fade-up">Tin tức nổi bật</h4>
                        <ul className="flex align-item-center cate-news space-40" id="posts__tab">
                            <li><a href="#" className={activeCategory === "all" ? "btn-bordergray active" : "btn-bordergray"} onClick={() => filterNews("all")}><span>Tất cả</span></a></li>
                            <li><a href="#" className={activeCategory === "press" ? "btn-bordergray active" : "btn-bordergray"} onClick={() => filterNews("press")}><span>Thông cáo báo chí</span></a></li>
                            <li><a href="#" className={activeCategory === "business" ? "btn-bordergray active" : "btn-bordergray"} onClick={() => filterNews("business")}><span>Tin tức doanh nghiệp</span></a></li>
                            <li><a href="#" className={activeCategory === "shareholder" ? "btn-bordergray active" : "btn-bordergray"} onClick={() => filterNews("shareholder")}><span>Cổ Đông</span></a></li>
                            <li><a href="#" className={activeCategory === "report" ? "btn-bordergray active" : "btn-bordergray"} onClick={() => filterNews("report")}><span>Báo cáo</span></a></li>
                            <li className="search-box flex align-item-center justify-content-space-between">
                                <div id="wrap">
                                    <form autoComplete="on" onSubmit={(e) => e.preventDefault()}>
                                        <input id="search" name="content" type="text" placeholder="Bạn đang tìm kiếm điều gì?" value={searchQuery} onChange={handleSearch} required />
                                        <input id="search_submit" name="action" type="submit" />
                                    </form>
                                </div>
                            </li>
                        </ul>
                        <div className="news-home space-40 posts__list" id="posts__list">
                            {filteredNews.slice(0, 6).map((item) => (
                                <div className="news-item cursor-pointer" onClick={() => handleNewsClick(item.id)} key={item.id}>
                                    <img className="lazyload" data-src={item.image} src={item.image} alt="" />
                                    <div className="news-des">
                                        <h5 className="bold">{item.title}</h5>
                                        <p className="datetime color-black-gray">{item.datetime}</p>
                                        <p className="color-black-gray">
                                            {item.description.split(" ").length > 20
                                                ? item.description.split(" ").slice(0, 20).join(" ") + "..."
                                                : item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <input type="hidden" id='itemTotal' value="257" />
                        <input type="hidden" id='itemPerPage' value="9" />
                        <input type="hidden" id='currentSection' value="danh-sach" />
                        <input type="hidden" id='shortUri' value="//www.vng.com.vn/news/" />
                        <a href="" className="btn-bordergray seemore" id="loadmore-news" onClick={handleSeeMore}>Xem thêm</a>
                    </div>
                </section>

                <section className="section section--wrapper margin-bottom-80" id="gallerysection">
                    <div className="container">
                        <h4 className="margin-bottom-25" data-aos="fade-up">Thư viện hình ảnh</h4>
                        <div className="news-home gallery-grid" data-aos="fade-up">
                            <div className="gallery-item hover-anim">
                                <img className="lazyload imgBg" data-src="//corp.vcdn.vn/products/upload/vng/source/Gallery/THUMBNAIL%20GALLERY/Logo.jpg" src='//corp.vcdn.vn/products/upload/vng/source/Gallery/THUMBNAIL%20GALLERY/Logo.jpg' alt="" style={{ filter: 'blur(4px)' }} />
                                <div className="gallery-des" style={{ height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', bottom: 0 }}>
                                    <h3 className="color-white uppercase">
                                        <a href="//www.vng.com.vn/gallery/logo.1.html" style={{ color: 'white', height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>LOGO</a>
                                    </h3>
                                </div>
                            </div>
                            <div className="gallery-item hover-anim">
                                <img className="lazyload imgBg" data-src="//corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/1.jpg" src="//corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/1.jpg" alt="" style={{ filter: 'blur(4px)' }} />
                                <div className="gallery-des" style={{ height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', bottom: 0 }}>
                                    <h3 className="color-white uppercase">
                                        <a href="//www.vng.com.vn/gallery/offices.1.html" style={{ color: 'white', height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>VĂN PHÒNG</a>
                                    </h3>
                                </div>
                            </div>
                            <div className="gallery-item hover-anim">
                                <img className="lazyload imgBg" data-src="//corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/14.jpg" src='//corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/14.jpg' alt="" style={{ filter: 'blur(4px)' }} />
                                <div className="gallery-des" style={{ height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', bottom: 0 }}>
                                    <h3 className="color-white uppercase">
                                        <a href="//www.vng.com.vn/gallery/awards.1.html" style={{ color: 'white', height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>GIẢI THƯỞNG</a>
                                    </h3>
                                </div>
                            </div>
                            <div className="gallery-item hover-anim">
                                <img className="lazyload imgBg" data-src="//corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/15.jpg" src='//corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/15.jpg' alt="" style={{ filter: 'blur(4px)' }} />
                                <div className="gallery-des" style={{ height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', bottom: 0 }}>
                                    <h3 className="color-white uppercase">
                                        <a href="//www.vng.com.vn/gallery/activities.1.html" style={{ color: 'white', height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>HOẠT ĐỘNG</a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default News_List;
