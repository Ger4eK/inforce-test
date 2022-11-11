import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

import Sort from '../Sort/Sort';
import AddProduct from '../AddProduct/AddProduct';

const Header = () => {
  const location = useLocation();
  const [editModal, setEditModal] = useState(false);
  const addOpenModalHandler = () => {
    setEditModal(true);
  };
  const addCloseModalHandler = () => {
    setEditModal(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.buttons}>
        <Link to='/'>
          <button className='button home'>Home</button>
        </Link>
        {location.pathname === '/' && (
          <button className='button' onClick={addOpenModalHandler}>
            Add product
          </button>
        )}

        <AddProduct active={editModal} onClose={addCloseModalHandler} />
      </div>
      {location.pathname === '/' && <Sort />}
    </div>
  );
};

export default Header;
