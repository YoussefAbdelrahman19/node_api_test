(function() {
  'use strict';

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      await fetchPosts();
      document.getElementById("postForm").addEventListener("submit", handlePostSubmit);
      document.getElementById('editPostForm').addEventListener('submit', handleEditPostSubmit);
    } catch (error) {
      console.error("Initialization Error:", error);
    }
  }

  async function fetchPosts() {
    try {
      const response = await fetch("/api/posts");
      const responseObject = await response.json();
      if (!Array.isArray(responseObject.data)) {
        throw new Error(`Expected an array of posts, but received: ${typeof responseObject.data}`);
      }
      displayPosts(responseObject.data);
    } catch (error) {
      console.error("Fetch Posts Error:", error);
    }
  }

  function displayPosts(posts) {
    const postsContainer = document.getElementById("posts");
    const fragment = document.createDocumentFragment();
    posts.forEach(post => {
      fragment.appendChild(createPostElement(post));
    });
    postsContainer.innerHTML = '';
    postsContainer.appendChild(fragment);
  }

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "card mb-4 shadow-sm";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = post.title;
    const headline = document.createElement("h6");
    headline.className = "card-subtitle mb-2 text-muted";
    headline.textContent = post.headline;
    const createdAt = document.createElement("p");
    createdAt.className = "card-text small";
    createdAt.textContent = post.created_at ? `Posted on: ${new Date(post.created_at).toLocaleDateString()}` : "Date not available";
    const body = document.createElement("p");
    body.className = "card-text";
    body.textContent = post.body;
    const tags = document.createElement("p");
    tags.className = "card-text";
    tags.textContent = Array.isArray(post.tags) ? `Tags: ${post.tags.join(", ")}` : "Tags: None";
    const commentsLabel = document.createElement("h6");
    commentsLabel.className = "mt-4 mb-2";
    commentsLabel.textContent = "Comments:";
    const commentsContainer = createCommentsElement(post.comments);
    commentsContainer.className += " mb-3";
    const editButton = createButton("Edit", "btn btn-secondary btn-sm m-1", () => editPost(post.id));
    const deleteButton = createButton("Delete", "btn btn-danger btn-sm m-1", () => deletePost(post.id));
    cardBody.appendChild(title);
    cardBody.appendChild(headline);
    cardBody.appendChild(createdAt);
    cardBody.appendChild(body);
    cardBody.appendChild(tags);
    cardBody.appendChild(commentsLabel);
    cardBody.appendChild(commentsContainer);
    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);
    postDiv.appendChild(cardBody);
    return postDiv;
  }

  function createCommentsElement(comments) {
    const commentsList = document.createElement("ul");
    commentsList.className = "list-group list-group-flush";
    comments.forEach(comment => {
      const commentItem = document.createElement("li");
      commentItem.className = "list-group-item";
      const commentText = document.createElement("p");
      commentText.textContent = comment.body;
      const commentAuthor = document.createElement("footer");
      commentAuthor.className = "blockquote-footer";
      commentAuthor.textContent = comment.author;
      commentItem.appendChild(commentText);
      commentItem.appendChild(commentAuthor);
      commentsList.appendChild(commentItem);
    });
    return commentsList;
  }

  function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;
    button.onclick = onClick;
    return button;
  }

  async function handlePostSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const headline = document.getElementById("headline").value;
    const body = document.getElementById("body").value;
    const tags = document.getElementById("tags").value.split(',').map(tag => tag.trim());
    const currentDate = new Date().toISOString().split('T')[0];
    const postData = { title, headline, body, tags, created_at: currentDate };
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log("Success:", data);
      fetchPosts();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleEditPostSubmit(event) {
    event.preventDefault();
    const postId = document.getElementById('editPostId').value;
    const updatedTitle = document.getElementById('editTitle').value;
    const updatedBody = document.getElementById('editBody').value;
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle, body: updatedBody }),
      });
      const data = await response.json();
      console.log("Post updated:", data);
      $('#editPostModal').modal('hide');
      fetchPosts();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function editPost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const post = await response.json();
      document.getElementById('editPostId').value = postId;
      document.getElementById('editTitle').value = post.title || '';
      document.getElementById('editBody').value = post.body || '';
      $('#editPostModal').modal('show');
    } catch (error) {
      console.error("Edit Post Error:", error);
    }
  }

  async function deletePost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      const data = await response.json();
      console.log("Post deleted:", data);
      fetchPosts();
    } catch (error) {
      console.error("Delete Post Error:", error);
    }
  }
})();
