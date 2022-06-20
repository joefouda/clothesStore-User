import './App.css';
import 'antd/dist/antd.css'
import Nav from './shared/Nav/Nav';
import HomePage from './pages/Home';
import FilterPage from './pages/Filter'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/filter' element={<FilterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
