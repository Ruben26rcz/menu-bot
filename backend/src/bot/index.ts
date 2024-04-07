import { Context, Telegraf } from 'telegraf';
import { ChatUser, Menu, Plate } from '@hackathon/types';
import { ChatUserEntity } from '../entities/chatUser';
import { OrderEntity } from '../entities/order';
import { MenuEntity } from '../entities/menu';

const Menus = require('../entities/menu');

export interface MyContext extends Context {
  chatUser?: ChatUser;
}

const createChatUser = async (chatId: number, name: string) => {
  const chatUser = new ChatUserEntity({ chatId, name });
  return chatUser.save();
};

const createOrder = async (menu: string, chatUser: string) => {
  const order = new OrderEntity({ menu, chatUser, completed: false });
  return order.save();
};

const findChatUser = async (chatId: number) => {
  return ChatUserEntity.findOne<ChatUser>({ chatId });
};
const plateToString = (plate: Plate) => {
  return `· ${plate.name}: _${plate.description}_`;
};

const menuToString = (menu: Menu) => {
  return `*${menu.name}* \n${menu.plates.map(plateToString).join('\n')} \n*${menu.price}€*`;
};

const configureBot = () => {
  const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);
  bot.use(async (ctx, next) => {
    const chat = await ctx.getChat();
    let chatUser = await findChatUser(chat.id);
    if (!chatUser) {
      chatUser = await createChatUser(chat.id, [chat.first_name, chat.last_name].join(' '));
    }
    ctx.chatUser = chatUser;
    return next();
  });

  bot.telegram.setMyCommands([
    {
      command: 'help',
      description: 'Show the list of commands',
    },
    {
      command: 'menu',
      description: 'List of menus available to order',
    },
    {
      command: 'order',
      description: 'Check the status of your order',
    },
  ]);

  bot.start(async (ctx) => {
    await ctx.replyWithMarkdown(
      'Welcome to MenuBot! Type /menu to see the menus available to order and /order to check your orders.'
    );
  });

  bot.command('help', async (ctx) => {
    await ctx.replyWithMarkdown(
      `*MenuBot Commands:*
/help - Show the list of commands
/menu - List of menus available to order
/order - Check the status of your order`
    );
  });
  bot.command('menu', async (ctx) => {
    const menus = await MenuEntity.find<Menu>();
    // Explicit usage
    await ctx.replyWithMarkdown(
      `*Here are the menus:*\n
${menus.map(menuToString).join('\n\n')}`,
      {
        reply_markup: {
          inline_keyboard: [
            /* Inline buttons. N# side-by-side */
            menus.map((menu: any) => ({ text: menu.name, callback_data: `${menu._id}` })),
          ],
        },
      }
    );
  });

  bot.on('callback_query', async (ctx) => {
    const menu = ctx.callbackQuery.data;
    const order = await createOrder(menu, ctx.chatUser._id);
    ctx.replyWithMarkdown(`Your order is on the way! OrderId: *${order._id}*`);
  });

  bot.command('order', async (ctx) => {
    const orderByUser = await OrderEntity.find({ chatUser: ctx.chatUser._id });
    // Explicit usage
    await ctx.replyWithMarkdown(
      `*This is the status of your orders:*\n${orderByUser
        .map((order: any) => `${order._id} - Completed: ${order.completed}`)
        .join('\n')}`
    );
  });

  return bot;
};

export default configureBot;
