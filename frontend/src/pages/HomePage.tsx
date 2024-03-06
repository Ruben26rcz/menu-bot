import styles from './HomePage.module.css';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { api } from '../_utils/api';
import { Statistic } from 'antd';
import { Menu, PopulatedOrder } from '../../../types/src/index';

const formatter = (value: number | string) => {
  if (typeof value === 'number') {
    return <CountUp end={value} separator=',' />;
  }
};

function HomePage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [orders, setOrders] = useState<PopulatedOrder[]>([]);

  const getMenus = async (): Promise<void> => {
    try {
      const response = await api.get<Menu[]>('/menus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const getOrders = async (): Promise<void> => {
    try {
      const response = await api.get<PopulatedOrder[]>('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getMenus();
    getOrders();
  }, []);
  return (
    <main className={styles.main}>
      <Statistic title='Menus' value={menus.length} formatter={formatter} />
      <div>
        <Statistic title='Orders' value={orders.length} formatter={formatter} />
        <p className={styles.pendingOrders}>🕐 Pending: {orders.filter((order) => !order.completed).length}</p>
      </div>
    </main>
  );
}

export default HomePage;
