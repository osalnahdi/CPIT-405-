// Helper functions for cookies
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Elements
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");
const commentInput = document.getElementById("comment-input");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const resetBtn = document.getElementById("reset-btn");
const commentsSection = document.getElementById("comments-section");

// Initial Data
let likes = parseInt(getCookie("likes")) || 100;
let dislikes = parseInt(getCookie("dislikes")) || 20;
let comments = JSON.parse(getCookie("comments") || "[]");
let voted = getCookie("voted") || "";

// Display initial state
function render() {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;
  commentsSection.innerHTML = "";
  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment";
    div.textContent = c;
    commentsSection.appendChild(div);
  });
}

// Like button
likeBtn.addEventListener("click", () => {
  if (voted === "like" || voted === "dislike") {
    alert("You already voted!");
    return;
  }
  likes++;
  voted = "like";
  setCookie("likes", likes, 7);
  setCookie("voted", "like", 7);
  render();
});

// Dislike button
dislikeBtn.addEventListener("click", () => {
  if (voted === "like" || voted === "dislike") {
    alert("You already voted!");
    return;
  }
  dislikes++;
  voted = "dislike";
  setCookie("dislikes", dislikes, 7);
  setCookie("voted", "dislike", 7);
  render();
});

// Submit comment
submitBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return alert("Write something first.");
  comments.push(text);
  setCookie("comments", JSON.stringify(comments), 7);
  commentInput.value = "";
  render();
});

// Clear comments
clearBtn.addEventListener("click", () => {
  comments = [];
  setCookie("comments", JSON.stringify(comments), 7);
  render();
});

// Reset all
resetBtn.addEventListener("click", () => {
  likes = 100;
  dislikes = 20;
  comments = [];
  voted = "";
  deleteCookie("likes");
  deleteCookie("dislikes");
  deleteCookie("comments");
  deleteCookie("voted");
  render();
});

render();
