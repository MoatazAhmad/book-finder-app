function BookCard({ book }) {
  console.log(book);
  return (
    <>
      <div className="book-card">
        <div className="book-title">{book.title}</div>
        <div className="book-author">
          {book.authors.map((author, index) => (
            <p key={index}>{author}</p>
          ))}
        </div>
        <div className="book-desc">{book.description}</div>
      </div>
    </>
  );
}
export default BookCard;
