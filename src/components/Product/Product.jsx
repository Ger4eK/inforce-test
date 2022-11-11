import axios from 'axios';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleProduct } from '../../store/slices/productsSlice';
import styles from './Product.module.scss';

const Product = ({ id, imageUrl, name, count }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  const addCloseModalHandler = () => {
    setEditModal(false);
  };

  const deleteHandle = () => {
    const deleteProduct = async () => {
      await axios.delete(`http://localhost:3001/products/${id}`);
    };
    deleteProduct();
    dispatch(handleProduct(true));
  };

  return (
    <div className={styles.product}>
      <Link to={`/${id}`}>
        <div className={styles.info}>
          <img src={imageUrl} alt='product' />
          <div>
            <h1>{name}</h1>
            <p>
              <b>Count: </b>
              {count}
            </p>
          </div>
        </div>
      </Link>
      <button onClick={() => setEditModal(true)} className='button delete'>
        Delete
      </button>

      <Modal active={editModal} onClose={addCloseModalHandler}>
        <div className={styles.confirme}>
          <h1>Are you sure you want to delete this product?</h1>

          <div className={styles.actions}>
            <button className='button' onClick={deleteHandle}>
              Так
            </button>
            <img
              src='https://thumbs.dreamstime.com/b/vintage-clipart-man-scratching-his-head-questioning-confused-hi-quality-image-bald-questions-as-retro-great-177951981.jpg'
              alt='confirme img'
            />
            <button
              className='button delete'
              onClick={() => setEditModal(false)}
            >
              Ні
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
