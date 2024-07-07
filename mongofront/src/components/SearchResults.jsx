import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchResults() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const title = query.get('title');

  useEffect(() => {
    fetch(`http://localhost:5001/api/posts/search?title=${title}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, [title]);

  return (
    <div>
      <h1>Search Results</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <img src={post.cover} alt={post.title} width="200" />
        </div>
      ))}
    </div>
  );
}
