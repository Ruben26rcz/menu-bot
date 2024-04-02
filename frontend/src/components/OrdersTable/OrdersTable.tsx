import { Table, Tag, Button, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { Order } from '../../../../types/src/index';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import styles from './OrdersTable.module.css';

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const getOrders = async (): Promise<void> => {
    try {
      const response = await api.get<Order[]>('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const completeOrders = async (): Promise<void> => {
    try {
      // Prepare an array to store promises for each order update request
      const updatePromises: Promise<any>[] = [];

      // Create a new array to store updated orders
      const updatedOrders: any = orders.map((order) => {
        if (selectedRowKeys.includes(order._id) && !order.completed) {
          // Add the update request to the array
          updatePromises.push(api.patch(`/orders/${order._id}`, { completed: true }));
          // Return the updated order
          return { ...order, completed: true };
        }
        // Return the order without modification
        return order;
      });

      // Update the state with the new array of orders
      setOrders(updatedOrders);
      setSelectedRowKeys([]);

      // Wait for all update requests to complete
      await Promise.all(updatePromises);
      const completeOrders = async (): Promise<void> => {
        try {
          // Prepare an array to store promises for each order update request
          const updatePromises: Promise<any>[] = [];

          // Create a new array to store updated orders
          const updatedOrders: any = orders.map((order) => {
            if (selectedRowKeys.includes(order._id) && !order.completed) {
              // Add the update request to the array
              updatePromises.push(api.patch(`/orders/${order._id}`, { completed: true }));
              // Return the updated order
              return { ...order, completed: true };
            }
            // Return the order without modification
            return order;
          });

          // Update the state with the new array of orders
          setOrders(updatedOrders);

          // Wait for all update requests to complete
          await Promise.all(updatePromises);

          // Reset selectedRowKeys after completing the operation
          setSelectedRowKeys([]);

          // Display success message
          message.success('Orders marked as completed');
        } catch (error) {
          console.error('Error marking orders as completed:', error);
          // Revert changes in case of error
          getOrders();
          message.error('Failed to mark orders as completed');
        }
      };

      // Display success message
      message.success('Orders marked as completed');
    } catch (error) {
      console.error('Error marking orders as completed:', error);
      // Revert changes in case of error
      getOrders();
      message.error('Failed to mark orders as completed');
    }
  };

  const deleteCompletedOrders = async (): Promise<void> => {
    try {
      // Filter out completed orders
      const completedOrderIds = orders.filter((order) => order.completed).map((order) => order._id);

      if (completedOrderIds.length === 0) {
        message.error('No completed orders selected for deletion');
        return;
      }

      // Delete completed orders on the server
      await Promise.all(completedOrderIds.map((id) => api.delete(`/orders/${id}`)));

      // Update the state to remove completed orders from the list
      setOrders((prevOrders) => prevOrders.filter((order) => !completedOrderIds.includes(order._id)));

      // Display success message
      message.success('Completed orders deleted successfully');
    } catch (error) {
      console.error('Error deleting completed orders:', error);
      message.error('Failed to delete completed orders');
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getOrders();
  }, []);

  const hasSelected = selectedRowKeys.length > 0;
  const columns: TableColumnsType<Order> = [
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
      <Table rowKey={(record) => record._id} rowSelection={rowSelection} columns={columns} dataSource={orders} />
      <div>
        <div className={styles.selectedOrders}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : 'Select orders from the table'}
        </div>
        <div className={styles.buttons}>
          <Button
            type='primary'
            onClick={completeOrders}
            disabled={!selectedRowKeys.some((key) => orders.find((order) => order._id === key && !order.completed))}
          >
            Mark as completed
          </Button>
          <Button
            type='primary'
            onClick={deleteCompletedOrders}
            disabled={orders.filter((order) => order.completed).length === 0}
            style={{ marginLeft: 8 }}
            danger
          >
            Delete completed
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
