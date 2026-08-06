import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostItemPage from './pages/PostItemPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post" element={<PostItemPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
