import React, { useState } from 'react';
import { useGetAllVoucherQuery } from '../../../api/api';
import { formattedPrice } from '../../../utils/formatedPrice';
import Header from '../../../components/Header/Header';

const VoucherList = () => {
  const { data: voucherList, isLoading } = useGetAllVoucherQuery();
  const [copiedVoucher, setCopiedVoucher] = useState(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleCopyVoucher = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(code);
    setTimeout(() => {
      setCopiedVoucher(null);
    }, 3000);
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-8 p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Danh sách Voucher</h1>

      {voucherList && voucherList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voucherList.map((voucher, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-cyan-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="relative pb-2/3">
                <img
                  src="https://via.placeholder.com/500x300"
                  alt={voucher.nameVoucher}
                  className="absolute w-full h-full object-cover"
                  />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-indigo-800">{voucher.nameVoucher}</h2>
                <p className="text-gray-800 mb-2">{voucher.description}</p>
                <p className="text-gray-600 mb-2">Mã Voucher: {voucher.codeVoucher}</p>
                <p className="text-green-600 mb-2">Giảm giá: {voucher.priceSale}%</p>
                <p className="text-gray-800 mb-2">Số lượng còn lại: {voucher.quantity}</p>
                <p className="text-indigo-800 font-bold">
                  Giá tối đa được giảm: {formattedPrice(voucher.maxPriceSale)}
                </p>
                <button
                  onClick={() => handleCopyVoucher(voucher.codeVoucher)}
                  className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-900"
                >
                  {copiedVoucher === voucher.codeVoucher ? 'Đã sao chép' : 'Sao chép mã'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có voucher nào khả dụng.</p>
      )}
    </div>
        </>
  );
};

export default VoucherList;
