import { MenuEntity } from '../entities/menu';

const getMenus = async (req: any, res: any) => {
  try {
    const allMenus = await MenuEntity.find();
    res.status(200).json(allMenus);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'There are no menus',
    });
  }
};

export { getMenus };
