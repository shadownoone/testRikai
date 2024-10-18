import './App.css';
import BlogPost from './Components/BlogPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './Components/BlogPost/Details';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogPost />} />
                <Route path="/post/:id" element={<Details />} /> {/* Detail page */}
            </Routes>
        </Router>
    );
}

export default App;
