import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sign from "./pages/Sign";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div>
      <Router>
        <div className="navbar bg-black flex justify-center gap-4">
         <Link to='/'> <a className="btn btn-ghost normal-case text-xl">Sign In</a></Link>
         <Link to='/home'> <a className="btn btn-ghost normal-case text-xl">Home</a></Link>
        </div>
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
