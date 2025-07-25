import { Routes, Route } from 'react-router';
import App from '@components/app/App';
import About from '@components/about/About';
import NotFound from '@components/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
