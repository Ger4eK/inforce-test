import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import ProductInfo from './pages/ProductInfo/ProductInfo';
import ProductList from './pages/ProductList/ProductList';
import { fetchProducts, handleProduct } from './store/slices/productsSlice';

function App() {
  const dispatch = useDispatch();
  const { items, productStatus } = useSelector((state) => state.products);
  const { sortType } = useSelector((state) => state.filters);

  const getProducts = async () => {
    const byAlphabet = sortType.sortProperty;

    dispatch(fetchProducts({ byAlphabet }));
  };

  useEffect(() => {
    getProducts();
    dispatch(handleProduct(false));
  }, [sortType, productStatus]);

  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<ProductList items={items} />} />
          <Route path='/:id' element={<ProductInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
