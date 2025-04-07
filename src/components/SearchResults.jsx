import BookCard from "./BookCard.jsx";
import { useMemo } from "react";
function SearchResults({ books }) {
  const renderedBooks = useMemo(() => {
    return books.map((book, index) => <BookCard key={index} book={book} />);
  }, [books]);
  return (
    <>
      <div className="book-list">{renderedBooks}</div>
    </>
  );
}
export default SearchResults;
