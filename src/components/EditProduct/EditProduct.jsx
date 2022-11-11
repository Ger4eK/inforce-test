import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from '../AddProduct/AddProduct.module.scss';
import axios from 'axios';

const EditProduct = ({ active, onClose, product }) => {
  const [name, setName] = useState(product.name);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [count, setCount] = useState(product.count);
  const [height, setHeight] = useState(product.size.height);
  const [width, setWidth] = useState(product.size.width);
  const [weight, setWeight] = useState(product.weight);

  const submitHandle = (event) => {
    event.preventDefault();

    const editBody = {
      id: product.id,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      imageUrl,
      count: Number(count),
      size: {
        width,
        height,
      },
      weight,
    };

    const editProduct = async () => {
      const response = await axios.patch(
        `http://localhost:3001/products/${product.id}`,
        {
          ...product,
          ...editBody,
        }
      );
    };
    editProduct();
    window.location.reload();
  };

  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.addProduct}>
        <h1>Edit Product</h1>
        <form onSubmit={submitHandle}>
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
            <button type='submit' className='button edit'>
              Edit
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

export default EditProduct;
