import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import CartItems from "./CartItems";
import { store } from "../../store";
import { incremented } from "../../store/redux/userSlice";
import { useRegisterMutation, useGetCartQuery, useGetCartUserQuery, useUseVoucherMutation, useNewCartMutation } from "../../api/api";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../utils/formatedPrice";
import ErrorTeamplate from "../../components/ErrorTemplate/ErrorTemplate";


const Cart = () => {
  const [changeQuantity, setChangeQuantity] = useState();
  const [loadingCartItem, setLoadingCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [nameVoucher, setNameVoucher] = useState('')
  const [voucher, setVoucher] = useState({ codeVoucher: undefined,
     priceSale: undefined, maxPriceSale: undefined, description: undefined })

  const {userInfo} = store.getState().reducer;

  const [newCart] = useNewCartMutation();
  
  const {data: isData, isSuccess, isLoading} = useGetCartUserQuery()
  const [applyVoucher] = useUseVoucherMutation();

  const handleCheckout = async () => {
    if(voucher.maxPriceSale) await newCart({ userId: userInfo._id, product: {}, 
      priceSale: voucher.maxPriceSale, percentSale: voucher.priceSale })
    
  }

  const handleAddVoucher = (e) => {
    setNameVoucher(e.target.value)
  }

  const handleApplyVoucher = async (e) => {
    e.preventDefault();
    await applyVoucher({ voucherName: nameVoucher })
    .then(res => {
      if(res.data) return setVoucher(res.data)
    })
  }
  

  const priceProduct = () => {
    let price;
    console.log(voucher);
    if(voucher.priceSale) {
      price = (voucher.priceSale / 100) * isData.total_price_cart > voucher.maxPriceSale
       ? isData.total_price_cart - voucher.maxPriceSale : isData.total_price_cart - 
       (voucher.priceSale / 100) * isData.total_price_cart
    }

    return formattedPrice(price || isData.total_price_cart)
  }

  return (
    <>
      <Header />
      {isData?.items_cart.length > 0 ? 
     <div className=" py-[5%] flex justify-between px-[3%]">
        <div className="block">
        {/* <h1 className="text-[30px] font-bold">Giỏ hàng</h1> */}
        </div>
        <div className="w-[60%] py-10">
          {isData ? isData.items_cart.map((value, index) =>
           <CartItems 
           key={index} 
           productId={value.productId} 
           attrId={value.id} handleChangeValue={() => setChangeQuantity} 
           quantity={value.quantity} name={value.name} 
           color={value.color} 
           price={value.price} image={value.image} />) 
          : <div></div>}
        </div>

        <div className="w-[30%] h-[390px] bg-slate-50 rounded-lg p-5">
          <div className="">
            <div className="text-[22px] mb-3">Hóa đơn</div>
            <ul className="divide-y divide-solid text-slate-500">
              <li className="py-2 flex justify-between">
                <span>Tổng giá</span>
                <span className="text-black">{isData && priceProduct()}</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Tiền ship</span>
                <span className="text-black">25.000 VND</span></li>
                <li className="py-2 flex justify-between">
                <span>Tiền thuế</span>
                <span className="text-black">25.000 VND</span></li>
                {
                  // console.log(voucher)
                  voucher.maxPriceSale && <>
                <li className="py-2 flex justify-between">
                  <span className= 'text-red-600' >Giá được giảm (voucher)</span>
                  <span className="text-black">{formattedPrice(voucher.maxPriceSale)} VND</span> 
                </li>

                  </>
                }
                {/* <span className= 'text-red-600' >Giá được giảm (voucher)</span> */}
                {/* <span className="text-black">25.000 VND</span> */}
                {/* <li className="py-2 flex justify-between"> */}
                {
                  // console.log(voucher)
                  voucher.maxPriceSale && <>
                   <li className="py-2 flex justify-between">
                  <span className= 'text-red-600' >Phần trăm giảm giá</span>
                  <span className="text-black">{voucher.priceSale}%</span> 
                   </li>

                  </>
                }
                {/* <span className= 'text-red-600' >Giá được giảm (voucher)</span> */}
                {/* <span className="text-black">25.000 VND</span> */}
                {/* </li> */}
                

                <li className="py-2 flex justify-between">
                <span className="text-black font-semibold text-[20px]">Tổng giá</span>
                <span className="text-black text-[20px]">{isData && isData?.total_price_cart + 25000 + 25000 - (voucher.maxPriceSale ? voucher?.maxPriceSale : 0) > 0 ?
                 formattedPrice(isData?.total_price_cart + 25000 + 25000 - (voucher.maxPriceSale ? voucher?.maxPriceSale : 0)) : formattedPrice(0)}</span></li>    
                
              <form className="my-5">   
                  <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Nhập mã giảm giá vào đây</label>
                  <div class="relative">
                      <input value={nameVoucher} onChange={handleAddVoucher} type="search" id="search" 
                      class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mã giảm giá vào đây" required/>
                      <button onClick={handleApplyVoucher} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Áp dụng</button>
                  </div>
              </form>

                <Link to="/checkout">
                  <button
                    onClick={handleCheckout}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Thanh toán
                  </button>
                  </Link>     
            </ul>
          </div>
        </div>
      </div> 
      : <ErrorTeamplate link={"/productlist"} title={"Giỏ hàng trống"} description="Hiện tại giỏ hàng của bạn đang trống!" button_1="Xem sản phẩm" button_2="f"></ErrorTeamplate>}
    </>
  );
};

export default Cart;
