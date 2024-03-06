import { Table, Tag, Button, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { PopulatedOrder } from '../../../../types/src/index';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import styles from './OrdersTable.module.css';

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<PopulatedOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const getOrders = async (): Promise<void> => {
    try {
      const response = await api.get<PopulatedOrder[]>('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const markAsCompleted = async (ids: string[]): Promise<void> => {
    try {
      // Optimistically update UI
      setOrders((prevOrders) =>
        prevOrders.map((order) => (ids.includes(order.id) ? { ...order, completed: true } : order))
      );
      // Make API call to mark orders as completed
      await Promise.all(ids.map((id) => api.patch(`/orders/${id}`, { completed: true })));
      message.success('Orders marked as completed');
    } catch (error) {
      // Revert changes in case of error
      message.error('Error marking orders as completed');
      getOrders();
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteCompletedOrders = async (): Promise<void> => {
    const completedOrderIds = selectedRowKeys.filter((key) =>
      orders.find((order) => order.id === key && order.completed)
    );
    if (completedOrderIds.length === 0) {
      message.error('No completed orders selected for deletion');
      return;
    }

    try {
      await Promise.all(completedOrderIds.map((id) => api.delete(`/orders/${id}`)));
      const remainingOrders = orders.filter((order) => !completedOrderIds.includes(order.id));
      setOrders(remainingOrders);
      message.success('Completed orders deleted successfully');
    } catch (error) {
      console.error('Error deleting completed orders:', error);
      message.error('Failed to delete completed orders');
    }
  };

  const start = async () => {
    setLoading(true);
    await markAsCompleted(selectedRowKeys as string[]);
    setSelectedRowKeys([]);
    setLoading(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const hasCompletedSelected = selectedRowKeys.some((key) => orders.find((order) => order.id === key)?.completed);

  const columns: TableColumnsType<PopulatedOrder> = [
    {
      title: 'User',
      dataIndex: ['chatUser', 'name'],
    },
    {
      title: 'Menu',
      dataIndex: ['menu', 'name'],
    },
    {
      title: 'Price €',
      dataIndex: ['menu', 'price'],
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      render: (completed: boolean) =>
        completed ? <Tag color='green'>Completed</Tag> : <Tag color='blue'>Pending</Tag>,
    },
  ];

  return (
    <>
      <Table rowKey='id' rowSelection={rowSelection} columns={columns} dataSource={orders} />
      <div>
        <div className={styles.selectedOrders}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : 'Select orders from the table'}
        </div>
        <div className={styles.buttons}>
          <Button type='primary' onClick={start} disabled={!hasSelected} loading={loading}>
            Mark as completed
          </Button>
          <Button
            type='primary'
            onClick={deleteCompletedOrders}
            disabled={!hasCompletedSelected}
            style={{ marginLeft: 8 }}
          >
            Delete completed
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
