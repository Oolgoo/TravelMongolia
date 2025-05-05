import React, { useState, useEffect } from 'react';

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  // Strapi-аас тухайн блогийн сэтгэгдлийг татна
  useEffect(() => {
    fetch(`http://localhost:1337/api/comments?filters[blog][$eq]=${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        // Strapi v4: data.data гэсэн талбарт сэтгэгдлийн массив байна
        // Хэрэв data.data байхгүй бол шууд data-г ашиглана
        const fetchedComments = data.data || data;
        setComments(fetchedComments);
      })
      .catch((error) => {
        console.error('Сэтгэгдэл татахад алдаа гарлаа:', error);
      });
  }, [blogId]);

  // Шинэ сэтгэгдэл илгээх функц
  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      username,
      text,
      blog: blogId,
    };

    fetch('http://localhost:1337/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Strapi-д өгөгдлийг { data: {...} } хэлбэрээр илгээнэ
      body: JSON.stringify({ data: newComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        const createdComment = data.data || data;
        setComments((prevComments) => [...prevComments, createdComment]);
        setUsername('');
        setText('');
      })
      .catch((error) => {
        console.error('Сэтгэгдэл илгээхэд алдаа гарлаа:', error);
      });
  };

  return (
    <div className="mt-8">
      {/* Сэтгэгдэл илгээх хэсэг */}
      <h2 className="text-2xl font-bold mb-4">Сэтгэгдэл үлдээх</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Таны нэр"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <textarea
          placeholder="Сэтгэгдлээ бичнэ үү"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full mb-4"
          rows={4}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Илгээх
        </button>
      </form>

      {/* Сэтгэгдлийг харуулах хэсэг */}
      <h3 className="text-xl font-semibold mb-2">
        Нийт сэтгэгдэл ({comments.length}):
      </h3>
      {comments.length === 0 ? (
        <p>Одоогоор сэтгэгдэл байхгүй байна.</p>
      ) : (
        comments.map((comment) => {
          // Хэрэв Strapi v4 ашиглаж байгаа бол comment.attributes дахь талбаруудаас уншина,
          // өөр тохиолдолд comment объектоос шууд уншина.
          const commentData = comment.attributes || comment;
          return (
            <div key={comment.id} className="border-b border-gray-300 mb-4 pb-2">
              <p className="font-bold">{commentData.username}</p>
              <p>{commentData.text}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentSection;
