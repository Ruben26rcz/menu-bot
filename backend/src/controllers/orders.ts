import { Order } from '@hackathon/types';
import { OrderEntity } from '../entities/order';
import { chatBot } from '../index';

const getOrders = async (req, res) => {
  try {
    const allOrders = await OrderEntity.find().populate('chatUser', 'name').populate({
      path: 'menu',
      select: 'name price',
    });
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'There are no orders',
    });
  }
};

const patchOrder = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const orderUpdated = await OrderEntity.findByIdAndUpdate<Order>(id, body, { new: true }).populate('chatUser');

    chatBot.telegram.sendMessage(
      orderUpdated.chatUser.chatId,
      `Your order ${orderUpdated._id} has been updated to ${orderUpdated.completed ? '✅ Completed' : '⏱️ Pending'}`
    );
    return res.status(200).json(orderUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await OrderEntity.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { getOrders, patchOrder, deleteOrder };
