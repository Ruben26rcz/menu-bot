import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/HomePage';
import MenusPage from './pages/MenusPage';
import OrdersPage from './pages/OrdersPage';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/menus' element={<MenusPage />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
