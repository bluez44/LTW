import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News_List from './Pages/News_List'
import Reading_Comment from './Pages/Reading_Comment';
import NewsDetail from "./Pages/NewsDetail";
function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<News_List />} />
                <Route path="/reading-comment" element={<Reading_Comment />} />
                <Route path="/news/:id" element={<NewsDetail />} />
            </Routes>
        </Router>
    
  )
}
export default App
