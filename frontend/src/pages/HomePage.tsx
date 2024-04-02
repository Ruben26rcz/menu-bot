import styles from './HomePage.module.css';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { api } from '../_utils/api';
import { Statistic } from 'antd';
import { Menu, Order } from '../../../types/src/index';

const formatter = (value: number | string) => {
  if (typeof value === 'number') {
    return <CountUp end={value} separator=',' />;
  }
};

function HomePage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const pendingOrders = orders.filter((order) => !order.completed).length;

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
      const response = await api.get<Order[]>('/orders');
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
      <section className={`wrapper ${styles.section}`}>
        <Statistic className={styles.menus} title='Menus' value={menus.length} formatter={formatter} prefix={'🍽️'} />
        <div className={styles.orders}>
          <Statistic
            className={styles.totalOrders}
            title='Total Orders'
            value={orders.length}
            formatter={formatter}
            prefix={'📦'}
          />
          <div className={styles.ordersDetail}>
            <Statistic
              className={pendingOrders > 0 ? styles.pendingOrders : styles.completedOrders}
              title='Pending Orders'
              value={pendingOrders}
              formatter={formatter}
              prefix={'🕐'}
            />
            <Statistic
              className={styles.completedOrders}
              title='Completed Orders'
              value={orders.filter((order) => order.completed).length}
              formatter={formatter}
              prefix={'✅'}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
