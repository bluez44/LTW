// frontend/app/api.jsx
const BASE_URL = "http://localhost/backend/app"; // 👉 đổi 'your-backend-folder' thành đúng folder backend của bạn nhé

// --- Comment APIs ---

export async function getCommentsByProduct(productId) {
  const response = await fetch(`${BASE_URL}/comments/getByPost.php?product_id=${productId}`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
}

export async function createComment(productId, content, token) {
  const response = await fetch(`${BASE_URL}/comments/create.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // cần token của user
    },
    body: JSON.stringify({ product_id: productId, content }),
  });
  if (!response.ok) throw new Error('Failed to create comment');
  return response.json();
}

export async function deleteComment(commentId, token) {
  const response = await fetch(`${BASE_URL}/comments/delete.php?id=${commentId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`, // cần token admin
    },
  });
  if (!response.ok) throw new Error('Failed to delete comment');
  return response.json();
}

// --- News APIs ---

export async function getAllNews() {
  const response = await fetch(`${BASE_URL}/news/getAll.php`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

export async function getNewsById(newsId) {
  const response = await fetch(`${BASE_URL}/news/getOne.php?id=${newsId}`);
  if (!response.ok) throw new Error('Failed to fetch news detail');
  return response.json();
}

export async function createNews(id, title, content, token) {
  const response = await fetch(`${BASE_URL}/news/create.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // cần token admin
    },
    body: JSON.stringify({ id, title, content }),
  });
  if (!response.ok) throw new Error('Failed to create news');
  return response.json();
}

export async function updateNews(id, title, content, token) {
  const response = await fetch(`${BASE_URL}/news/update.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // cần token admin
    },
    body: JSON.stringify({ id, title, content }),
  });
  if (!response.ok) throw new Error('Failed to update news');
  return response.json();
}

export async function deleteNews(newsId, token) {
  const response = await fetch(`${BASE_URL}/news/delete.php?id=${newsId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`, // cần token admin
    },
  });
  if (!response.ok) throw new Error('Failed to delete news');
  return response.json();
}