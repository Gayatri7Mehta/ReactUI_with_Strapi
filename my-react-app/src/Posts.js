import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:1337/api/posts')
      .then(response => {
        // Extract the 'data' array from the response
        const postsData = response.data.data;
        console.log(postsData); // Log the data to ensure the structure is correct
        setPosts(postsData);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Strapi Data</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.attributes.Title} - {post.attributes.Published ? 'Published' : 'Not Published'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
