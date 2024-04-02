import OrdersTable from '../components/OrdersTable/OrdersTable';
import styles from './OrdersPage.module.css';

function OrdersPage() {
  return (
    <main className={`wrapper ${styles.main}`}>
      <OrdersTable />
    </main>
  );
}

export default OrdersPage;
