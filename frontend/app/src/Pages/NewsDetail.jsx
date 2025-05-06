import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../mockup/Data";
import "./css/NewsDetail.css";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [articleHtml, setArticleHtml] = useState("");
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "quangminh2004.qng";
  const avatarLetter = username.charAt(0).toUpperCase();
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const isAdmin = storedUser?.role === "admin";

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`http://localhost/backend/app/news/getOne.php?id=${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const fetchedData = await res.json();

        if (fetchedData && fetchedData.id) {
          const title = fetchedData.title || "No title available";
          const createdAt = fetchedData.created_at
            ? new Date(fetchedData.created_at).toLocaleString("vi-VN")
            : "No datetime available";
          const content = fetchedData.content || "";
          const properNews = `/News/News_${fetchedData.id}/News_${fetchedData.id}.html`;

          setArticle({
            id: fetchedData.id,
            title: title,
            datetime: createdAt,
            proper_news: properNews,
          });

          const htmlRes = await fetch(properNews);
          if (htmlRes.ok) {
            const html = await htmlRes.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const selectorsToRemove = ["header", "footer", ".topbar", ".toolbar", ".footer"];
            selectorsToRemove.forEach((selector) => {
              const el = doc.querySelector(selector);
              if (el) el.remove();
            });

            const styles = doc.querySelectorAll("style, link[rel='stylesheet']");
            styles.forEach((styleEl) => {
              const cloned = styleEl.cloneNode(true);
              cloned.setAttribute("data-dynamic-style", fetchedData.id);
              document.head.appendChild(cloned);
            });

            const images = doc.querySelectorAll("img");
            images.forEach((img) => {
              img.style.maxWidth = "100%";
              img.style.height = "auto";
              img.style.display = "block";
              img.style.margin = "1rem auto";
            });

            const contentElement =
              doc.querySelector("main") ||
              doc.querySelector("article") ||
              doc.querySelector(".content") ||
              doc.body;

            setArticleHtml(contentElement.innerHTML);
          } else {
            setArticleHtml(`<div>${content}</div>`);
          }

          return () => {
            const oldStyles = document.querySelectorAll(`[data-dynamic-style="${fetchedData.id}"]`);
            oldStyles.forEach((el) => el.remove());
          };
        }
      } catch (error) {
        console.error("Fetch backend failed, fallback to mock data:", error);

        const found = data.find((item) => String(item.id) === id);
        setArticle(found);

        if (found?.proper_news) {
          fetch(`/${found.proper_news}`)
            .then((res) => res.text())
            .then((html) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, "text/html");

              const selectorsToRemove = ["header", "footer", ".topbar", ".toolbar", ".footer"];
              selectorsToRemove.forEach((selector) => {
                const el = doc.querySelector(selector);
                if (el) el.remove();
              });

              const styles = doc.querySelectorAll("style, link[rel='stylesheet']");
              styles.forEach((styleEl) => {
                const cloned = styleEl.cloneNode(true);
                cloned.setAttribute("data-dynamic-style", found.id);
                document.head.appendChild(cloned);
              });

              const images = doc.querySelectorAll("img");
              images.forEach((img) => {
                img.style.maxWidth = "100%";
                img.style.height = "auto";
                img.style.display = "block";
                img.style.margin = "1rem auto";
              });

              const content =
                doc.querySelector("main") ||
                doc.querySelector("article") ||
                doc.querySelector(".content") ||
                doc.body;

              setArticleHtml(content.innerHTML);
            })
            .catch((err) => {
              console.error("Error loading article from file:", err);
              setArticleHtml("<p>Không thể tải nội dung bài viết.</p>");
            });

          return () => {
            const oldStyles = document.querySelectorAll(`[data-dynamic-style="${found?.id}"]`);
            oldStyles.forEach((el) => el.remove());
          };
        }
      }
    }

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost/backend/app/comments/getByPost.php?product_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            
            setSubmittedComments(data.reverse());
          }
        })
        .catch((err) => console.error("Failed to fetch comments:", err));
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (comment.trim()) {
      fetch(`http://localhost/backend/app/comments/create.php`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedUser.token}`},
        body: JSON.stringify({
          product_id: id,
          username: username,
          content: comment.trim(),
        }),
      })
        .then((res) => res.json())
        .then((newComment) => {
          setSubmittedComments([newComment, ...submittedComments]);
          setComment("");
        })
        .catch((err) => console.error("Error posting comment:", err));
    }
  };

  const handleDeleteComment = (commentId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) return;

    fetch(`http://localhost/backend/app/comments/delete.php?id=${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setSubmittedComments(submittedComments.filter((cmt) => cmt.id !== commentId));
      })
      .catch((err) => console.error("Error deleting comment:", err));
  };

  const handleLike = (index) => {
    const updatedComments = [...submittedComments];
    updatedComments[index].likes = Number(updatedComments[index].likes || 0) + 1;
    setSubmittedComments(updatedComments);
  };

  const toggleReplyBox = (index) => {
    const updatedComments = [...submittedComments];
    updatedComments[index].showReplyBox = !updatedComments[index].showReplyBox;
    setSubmittedComments(updatedComments);
  };

  const handleReplySubmit = (e, index, replyText) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updatedComments = [...submittedComments];
    updatedComments[index].replies = updatedComments[index].replies || [];
    updatedComments[index].replies.push({
      username: username,
      content: replyText.trim(),
      time: new Date().toLocaleString("vi-VN"),
    });
    updatedComments[index].showReplyBox = false;
    setSubmittedComments(updatedComments);
  };

  if (!article) {
    return <div className="centered-error">Article not found.</div>;
  }

  return (
    <div className="news-detail-container">
      <h1 className="news-title">{article.title}</h1>
      <p className="news-date">{article.datetime}</p>

      {articleHtml ? (
        <div className="news-content" dangerouslySetInnerHTML={{ __html: articleHtml }}></div>
      ) : (
        <div className="content-placeholder">Không thể tải nội dung bài viết hoặc bài viết không tồn tại.</div>
      )}

      <section className="comment-section">
        <h2 className="comment-title">Ý kiến ({submittedComments.length})</h2>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            className="comment-textarea"
            placeholder="Chia sẻ ý kiến của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className="comment-form-footer">
            <div className="user-info">
              <div className="avatar">{avatarLetter}</div>
              <span className="username">{username}</span>
            </div>
            <button type="submit" className="submit-btn">Gửi</button>
          </div>
        </form>

        <div className="submitted-comments">
          {submittedComments.map((cmt, index) => (
            <div key={cmt.id || index} className="comment-card">
              <div className="avatar">{cmt.user_name?.charAt(0).toUpperCase() || "?"}</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-username">{cmt.user_name}</span>
                  <span className="comment-time">{new Date(cmt.created_at).toLocaleString()}</span>
                </div>
                <p className="comment-text">{cmt.content}</p>

                <div className="comment-actions">
                  <button className="like-btn" onClick={() => handleLike(index)}>👍 {cmt.likes}</button>
                  <button className="reply-btn" onClick={() => toggleReplyBox(index)}>💬 Trả lời</button>
                  {isAdmin && (
                    <button className="delete-btn" onClick={() => handleDeleteComment(cmt.id)}>🗑️ Xóa</button>
                  )}
                </div>

                {cmt.showReplyBox && (
                  <form onSubmit={(e) => handleReplySubmit(e, index, e.target.elements.reply.value)} className="reply-form">
                    <textarea name="reply" className="reply-textarea" placeholder="Phản hồi..."></textarea>
                    <button type="submit" className="submit-reply-btn">Gửi phản hồi</button>
                  </form>
                )}

                {cmt.replies?.length > 0 && (
                  <div className="replies">
                    {cmt.replies.map((reply, rIdx) => (
                      <div key={rIdx} className="reply-card">
                        <div className="avatar">{reply.username ? reply.username.charAt(0).toUpperCase() : "?"}</div>
                        <div className="reply-content">
                          <div className="comment-header">
                            <span className="reply-username">{reply.username}</span>
                            <span className="reply-time">{reply.time}</span>
                          </div>
                          <p className="reply-text">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
