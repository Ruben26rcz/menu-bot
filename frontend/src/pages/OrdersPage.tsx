import OrdersTable from '../components/OrdersTable/OrdersTable';
import styles from './OrdersPage.module.css';

function OrdersPage() {
  return (
    <main className={styles.main}>
      <OrdersTable />
    </main>
  );
}

export default OrdersPage;
