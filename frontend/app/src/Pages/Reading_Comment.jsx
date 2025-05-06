import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "./css/Reading_Comment.css";
import data from "../mockup/Data";

const Reading_Comment = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const [ filteredNews,setFilteredNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const validMockupData = data.map(item => ({
      id: item.id,
      title: item.title || "No title available",
      link: item.link || "#",
      datetime: item.datetime || "No datetime available",
      description: item.description || "No description available",
      image: item.image || "//default-image-url.jpg",
      category: item.category || "uncategorized",
      comments: item.comments || [],
      isMockup: true, // đánh dấu bài này là từ mockup
    }));

    fetch('http://localhost/backend/app/news/getAll.php')
      .then(response => response.json())
      .then(apiData => {
        const validApiData = apiData.map(item => {
          const title = item.title || "";
          let category = "business";
        
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
              title: item.title || "No title available",
              link: `/News/News_${item.id}/News_${item.id}.html`,
              datetime: item.created_at
                ? new Date(item.created_at).toLocaleString("vi-VN")
                : "No datetime available",
              description: item.content
                ? item.content.substring(0, 100) + "..."
                : "No description available",
              image: item.media_url || "//default-image-url.jpg",
              proper_news: `/News/News_${item.id}/News_${item.id}.html`,
              category: category,
              comments: item.comments || [],
              isMockup: false
          };
        });
        const mockupMap = new Map(validMockupData.map(item => [item.id, item]));
        const mergedData = validApiData.map(apiItem => {
          if (mockupMap.has(apiItem.id)) {
            mockupMap.delete(apiItem.id);
          }
          return apiItem;
        });

        // Gộp mockup + api
        setNews([...mergedData, ...mockupMap.values()]);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        // Nếu fetch lỗi thì chỉ dùng mockup
        setNews(validMockupData);
      });
  }, []);

  const handleClick = (article) => {
    navigate(`/news/${article.id}`);
  };
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
        setFilteredNews(news.filter(item => item.title.toLowerCase().includes(query)));
    }
};
  return (
    <div className="news-container">
      <div className="news-list">
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
        {filteredNews.map((article) => (
          <div 
            key={article.id} 
            className="news-item" 
            onClick={() => handleClick(article)}
          >
            <img src={article.image} alt={article.title} className="news-image" />
            <h3 className="modal-title">{article.title}</h3>
            <p className="date">{article.datetime}</p>
            <p>{article.description.substring(0, 100)}...</p>
            <button className="read-more">Read more</button>
          </div>
        ))}
      </div>

      <div className="latest-articles">
        <h4>Latest article</h4>
        <ul>
          {news.map((article) => (
            <li key={article.id} onClick={() => handleClick(article)}>{article.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reading_Comment;
