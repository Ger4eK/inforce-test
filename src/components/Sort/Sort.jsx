import React, { useEffect, useRef, useState } from 'react';
import styles from './Sort.module.scss';
import sortArrow from '../../assets/sort-arrow.png';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/slices/filterSlice';

const sortList = [
  { name: 'алфавітом (ASC)', sortProperty: 'name,count&_order=asc,desc' },
  { name: 'алфавітом (DESC)', sortProperty: 'name,count&_order=desc,desc' },
  { name: 'кількістю (ASC)', sortProperty: 'count&_order=asc' },
  { name: 'кількістю (DESC)', sortProperty: 'count&_order=desc' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { sortType } = useSelector((state) => state.filters);
  const [isVisible, setIsVisible] = useState(false);
  const sortRef = useRef(null);

  const onClickListItem = (obj) => {
    dispatch(setSortType(obj));
    setIsVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <img src={sortArrow} alt='arrow' />
        <b>Сортувати за: </b>
        <span
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {sortType.name}
        </span>
      </div>
      {isVisible && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => {
                  onClickListItem(obj);
                }}
                className={
                  sortType.sortProperty === obj.sortProperty ? 'active' : ''
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
