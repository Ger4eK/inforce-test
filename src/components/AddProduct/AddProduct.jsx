import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleProduct } from '../../store/slices/productsSlice';
import Modal from '../Modal/Modal';

import styles from './AddProduct.module.scss';

const AddProduct = ({ active, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [count, setCount] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    const productBody = {
      id: Math.floor(Math.random() * 100000000),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      imageUrl,
      count: Number(count),
      size: {
        width,
        height,
      },
      weight,
      comments: [],
    };
    const addProduct = async () => {
      const response = await axios.post('http://localhost:3001/products', {
        ...productBody,
      });
    };
    addProduct();
    setName('');
    setImageUrl('');
    setCount('');
    setHeight('');
    setWidth('');
    setWeight('');
    dispatch(handleProduct(true));
    onClose();
  };

  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.addProduct}>
        <h1>+ Add Product</h1>
        <form onSubmit={submitHandler}>
          <div>
            <h2>Name:</h2>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type='text'
              className={styles.name}
              placeholder='Product name'
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div>
            <h2>Image Url:</h2>
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              type='text'
              className={styles.imageUrl}
              placeholder='Enter Image URL...'
              required
            />
          </div>
          <div>
            <h2>Count:</h2>
            <input
              value={count}
              onChange={(event) => setCount(event.target.value)}
              type='number'
              placeholder='Product count'
              required
              min={0}
            />
          </div>
          <div>
            <h2>Size:</h2>
            <div className={styles.sizes}>
              <div>
                <span>height:</span>
                <input
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  type='number'
                  placeholder='Enter height...'
                  required
                  min={0}
                />
              </div>
              <div>
                <span>width:</span>
                <input
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  type='number'
                  placeholder='Enter width...'
                  required
                  min={0}
                />
              </div>
            </div>
          </div>
          <div>
            <h2>Weight:</h2>
            <input
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              type='text'
              placeholder='Product weight'
              required
              min={0}
            />
          </div>
          <div className={styles.buttons}>
            <button type='submit' className='button'>
              Create
            </button>
            <button className='button delete' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProduct;
