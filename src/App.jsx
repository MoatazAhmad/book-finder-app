import { useReducer } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import useFetchBooks from "./hooks/useFetchBooks";

const initialState = {
  query: "",
  books: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_BOOKS":
      return { ...state, books: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { books, loading, error } = useFetchBooks(state.query);

  const recieveData = (data) => {
    dispatch({ type: "SET_QUERY", payload: data });
  };

  return (
    <>
      <Container>
        <Header onData={recieveData} />
        <SearchResults books={books} />
      </Container>
    </>
  );
}

export default App;
