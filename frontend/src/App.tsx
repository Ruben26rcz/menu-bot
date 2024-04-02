import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import MenusPage from './pages/MenusPage';
import OrdersPage from './pages/OrdersPage';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/menus' element={<MenusPage />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
