import React from 'react'
import FilterCategory from './Filter/FilterCategory'
import ItemList from './ItemList'
import Footer from '../../components/Footer/Footer'
import ChatComponent from '../../components/Form/ChatBox'


const ProductList = () => {
  return (
    <>
      <FilterCategory>
        <ItemList />
      </FilterCategory>
      {/* <ChatComponent/> */}
      <Footer />
    </>
  );
}

export default ProductList