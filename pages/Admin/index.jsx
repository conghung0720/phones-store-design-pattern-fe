import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AddProduct from './Products/AddProduct'
import ProductList from './Products/ProductList'
import ProcessOrder from './OrderDetail/ProcessOrder'
import { UserList } from './Users'
import Brands from './Brands'
import VoucherManager from './Vouchers'


const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(3);

  const handleMenuItemClick = (value) => {
    setSelectedMenuItem(value);
  };

  return (
    <>
      <main className='flex'>
        <Sidebar selectedMenuItem={selectedMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <div className='ml-[20em] w-[80%]'>
          {/* Hiển thị nội dung tương ứng với mục được chọn */}
          {selectedMenuItem === 1 && <UserList />}
          {selectedMenuItem === 2 && <ProcessOrder />}
          {selectedMenuItem === 3 && <ProductList />}
          {selectedMenuItem === 4 && <Brands/>}
          {selectedMenuItem === 5 && <VoucherManager/>}
          {/* Thêm các trang hoặc nội dung khác ở đây */}
        </div>
      </main>
    </>
  );
};


export default Admin