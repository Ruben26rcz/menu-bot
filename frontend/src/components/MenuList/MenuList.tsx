import MenuCard from '../MenuCard/MenuCard';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import { Menu } from '../../../../types/src/index';
import styles from './MenuList.module.css';

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const getMenus = async (): Promise<void> => {
    try {
      const response = await api.get<Menu[]>('/menus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className={styles.menuList}>
      {menus.length > 0 ? menus.map((menu) => <MenuCard key={menu._id} menu={menu} />) : <p>No menus available</p>}
    </div>
  );
};

export default MenuList;
