import { useEffect, useState } from "react";

function useFetchBooks(query) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      return;
    }

    let isCancelled = false;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!isCancelled) {
          if (data.items) {
            const books = data.items.map((item) => {
              const {
                title = "No Title",
                authors = ["Unknown"],
                description = "No Description",
              } = item.volumeInfo || {};
              return { title, authors, description };
            });
            setBooks(books);
          } else {
            setBooks([]);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Error fetching books");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isCancelled = true; // Cancel the fetch if query changes or component unmounts
    };
  }, [query]);

  return { books, loading, error };
}

export default useFetchBooks;
