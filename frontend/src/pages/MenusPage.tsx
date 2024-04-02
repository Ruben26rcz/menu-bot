import MenuList from '../components/MenuList/MenuList';
import styles from './MenusPage.module.css';

function MenusPage() {
  return (
    <main className={`wrapper ${styles.main}`}>
      <MenuList />
    </main>
  );
}

export default MenusPage;
