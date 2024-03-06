import { Link } from 'react-router-dom';
import { HomeOutlined, ReadOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import Logo from '../../../public/icon.svg';
import styles from './sidebar.module.css';

const items: MenuProps['items'] = [
  {
    key: 'home',
    label: <Link to='/'>Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: 'menus',
    label: <Link to='/menus'>Menus</Link>,
    icon: <ReadOutlined />,
  },
  {
    key: 'orders',
    label: <Link to='/orders'>Orders</Link>,
    icon: <ShoppingOutlined />,
  },
];

const Sidebar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <img className={styles.logo} src={Logo} alt='MenuBot logo' />
        <span className={styles.sidebarTitle}>MenuBot</span>
      </div>
      <Menu defaultSelectedKeys={['home']} mode='inline' items={items} />
    </header>
  );
};

export default Sidebar;
