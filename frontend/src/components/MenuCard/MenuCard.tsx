import { Card } from 'antd';
import { Menu } from '../../../../types/src/index';
import styles from './MenuCard.module.css';

interface Props {
  menu: Menu;
}

const MenuCard: React.FC<Props> = ({ menu }) => (
  <Card size='small' title={menu.name}>
    {menu.plates.map((plate, index) => (
      <div key={index}>
        <h2>{plate.name}</h2>
        <p>{plate.description}</p>
      </div>
    ))}
    <p className={styles.price}>{menu.price} €</p>
  </Card>
);

export default MenuCard;
