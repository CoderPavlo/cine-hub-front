import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MainPage from './pages/MainPage';

export const role: 'admin' | 'user' = 'user'; //for demo

function App() {

  return (
    <Router>
      <div style={{ minHeight: '100hv', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} /> {/*Main page*/}
          <Route path="/login" element={<div />} />  {/*Add components for login instead div*/}
          <Route path="/register" element={<div />} /> {/*Add components for register instead div*/}
          {role === 'user' && <>

            <Route path="/home" element={<div />} /> {/*Home page for user*/}
            <Route path="/schedule" element={<div />} /> {/*Session schedule page for user*/}
            <Route path="/movie/:id" element={<div />} /> {/*Movie details page*/}
            <Route path="/session/:id" element={<div />} /> {/*Session detsils page for user*/}
            <Route path="/booking/:id" element={<div />} /> {/*Booking page for user*/}
            <Route path="/profile" element={<div />} /> {/*Profile page*/}
          </>
          }
          {role === 'admin' && <>
            <Route path="/admin-panel" element={<div />} /> {/*Admin panel page for admin*/}
            <Route path="/statistics" element={<div />} /> {/*Statistics page for admin*/}
            <Route path="/settings" element={<div />} /> {/*Settings page for admin*/}
          </>}
          <Route path="*" element={<Navigate to='/'/>} /> {/*Redirect to main page*/}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
