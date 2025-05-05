import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    // Fetch all blogs (including coverImage)
    fetch('http://localhost:1337/api/blogs?populate=coverImage')
      .then((response) => response.json())
      .then((data) => {
        // data.data might vary depending on your Strapi version/structure
        setBlogData(data.data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  // A small helper to render content
  const renderContent = (content) => {
    if (!content) return null;

    return content.map((item, index) => {
      if (item.type === 'paragraph') {
        return (
          <p key={index}>cv 
            {item.children.map((child) => child.text).join('')}
          </p>
        );
      }
      // Handle other item types (headings, images, etc.) if needed
      return null;
    });
  };

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4 text-black">
          {blogData.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <div className="bg-white rounded-xl overflow-hidden drop-shadow-md">
                {blog.coverImage && blog.coverImage.url && (
                  <img
                    className="h-56 w-full object-cover"
                    src={`http://localhost:1337${blog.coverImage.url}`}
                    alt={blog.blogTitle || 'Blog Image'}
                  />
                )}
                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-2">{blog.blogTitle}</h3>
                  <p className="text-gray-600 mb-4">{blog.blogDesc}</p>
                  {/* <div className="text-gray-800 text-base">
                    {renderContent(blog.blogContent)}
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
