import Product from '../../components/Product/Product';
import styles from './ProductList.module.scss';

const ProductList = ({ items }) => {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Product key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductList;
