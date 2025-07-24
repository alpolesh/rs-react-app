import { Routes, Route } from 'react-router';
import App from '@components/app/App';
import About from '@components/about/About';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
