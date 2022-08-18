import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<IndexLayout />} />
        <Route path="notes/:id" element={<NoteLayout />} />

      </Routes>
    </Router>
  );
}

function IndexLayout() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <NotesListPage />
      </div>
    </div>
  );
}

function NoteLayout() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <NotePage />
      </div>
    </div>
  );
}

export default App;
