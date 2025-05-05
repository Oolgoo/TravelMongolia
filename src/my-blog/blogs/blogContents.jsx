import CommentSection from '@/Comments';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogContents = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/blogs?populate=coverImage')
      .then(response => response.json())
      .then(data => {
        // Assuming data.data is an array of blog objects
        const foundBlog = data.data.find(blogItem => blogItem.id.toString() === id);
        setBlog(foundBlog);
      })
      .catch(error => console.error('Error fetching blogs: ', error));
  }, [id]);

  if (!blog) {
    return <div className="p-8">Loading...</div>;
  }

  // Directly accessing properties as you mentioned you don't have nested data attributes
  const { blogTitle, blogDesc, coverImage, blogContent } = blog;

  // Helper function to render rich text content (paragraphs)
  const renderContent = (content) => {
    if (!content) return null;
    return content.map((item, index) => {
      if (item.type === 'paragraph') {
        return (
          <p key={index}>
            {item.children.map(child => child.text).join('')}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto px-4 text-black">
        {coverImage && coverImage.url && (
          <img
            className="h-96 w-full object-cover mb-8"
            src={`http://localhost:1337${coverImage.url}`}
            alt={blogTitle || 'Blog Image'}
          />
        )}
        <h1 className="font-bold text-4xl mb-4">{blogTitle}</h1>
        <p className="text-gray-600 mb-4">{blogDesc}</p>
        <div className="text-gray-800 text-base">
          {renderContent(blogContent)}
        </div>
        <CommentSection blogId={blog.id} />
      </div>
    </div>
  );
};

export default BlogContents;
