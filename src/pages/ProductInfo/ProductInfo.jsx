import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../../components/Comments/Comments';
import EditProduct from '../../components/EditProduct/EditProduct';
import styles from './ProductInfo.module.scss';

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [editModal, setEditModal] = useState(false);

  const addOpenModalHandler = () => {
    setEditModal(true);
  };
  const addCloseModalHandler = () => {
    setEditModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      setProduct(response.data);
    };
    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className={styles.loading}>
        <h3>Завантаження...</h3>
      </div>
    );
  }

  return (
    <div className={styles.productInfo}>
      <div className={styles.product}>
        <img src={product.imageUrl} alt='product' />
        <div className={styles.info}>
          <div className={styles.header}>
            <h1>{product.name}</h1>
            <button onClick={addOpenModalHandler} className='button edit'>
              Edit
            </button>
            <EditProduct
              product={product}
              active={editModal}
              onClose={addCloseModalHandler}
            />
          </div>
          <p className={styles.count}>
            <b>Count:</b> {product.count}
          </p>
          <div className={styles.size}>
            <b>Size:</b>
            <p>width: {product.size.width} cm.</p>
            <p>height: {product.size.height} cm.</p>
          </div>
          <p>
            <b>Weight: </b>
            {product.weight} g.
          </p>
        </div>
      </div>
      <Comments product={product} />
    </div>
  );
};

export default ProductInfo;
