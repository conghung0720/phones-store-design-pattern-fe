import React, { useState } from 'react';
import {
  useAddVoucherMutation,
  useDeleteVoucherMutation,
  useGetAllVoucherQuery,
  useUpdateVoucherMutation,
  useUseVoucherMutation,
} from '../../../api/api';
import { formattedPrice } from '../../../utils/formatedPrice';

const VoucherManager = () => {
  const [vouchers, setVouchers] = useState([]);
  const { data: listVoucher, isLoading } = useGetAllVoucherQuery();
  const [createNewVoucher] = useAddVoucherMutation()
  const [updateVoucher] = useUpdateVoucherMutation();
  const [deletedVoucher] = useDeleteVoucherMutation()
  const [newVoucher, setNewVoucher] = useState({
    maxPriceSale: '', // Thay đổi tên thuộc tính
    quantity: '',
    nameVoucher: '', // Thay đổi tên thuộc tính
    description: '',
    codeVoucher: '', // Thay đổi tên thuộc tính
    priceSale: '', // Thay đổi tên thuộc tính
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const openAddDialog = () => {
    setIsAdding(true);
    setIsEditing(false);
    setNewVoucher({
      maxPriceSale: '',
      quantity: '',
      nameVoucher: '',
      description: '',
      codeVoucher: '',
      priceSale: '',
    });
  };

  const openEditDialog = (index) => {
    setIsEditing(true);
    setIsAdding(true);
    setEditingIndex(index);
    setNewVoucher(vouchers[index]);
  };

  const closeAddDialog = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingIndex(null);
    setNewVoucher({
      maxPriceSale: '',
      quantity: '',
      nameVoucher: '',
      description: '',
      codeVoucher: '',
      priceSale: '',
    });
  };

  const addVoucher = async () => {
    // Ràng buộc số lượng ít nhất 1 và giảm giá ít nhất 1%, tối đa 100%
    if (
      newVoucher.quantity >= 1 &&
      newVoucher.priceSale >= 1 &&
      newVoucher.priceSale <= 100
    ) {
      if (isEditing) {
        const updatedVouchers = [...vouchers];
        updatedVouchers[editingIndex] = newVoucher;
        setVouchers(updatedVouchers);
      } else {
        console.log(newVoucher);
        await createNewVoucher(newVoucher)
        setVouchers([...vouchers, newVoucher]);
      }
      closeAddDialog();
    } else {
      alert('Vui lòng nhập số lượng ít nhất 1 và giảm giá từ 1 đến 100%');
    }
  };

  const deleteVoucher = async (index) => {
    const updatedVouchers = [...vouchers];
    await deletedVoucher({ voucherId: index })
    updatedVouchers.splice(index, 1);
    setVouchers(updatedVouchers);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Quản lý Voucher</h1>

      <button
        onClick={openAddDialog}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Thêm Voucher
      </button>

      {/* Add/Edit Voucher Dialog */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-md rounded p-8 w-96">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              {isEditing ? 'Sửa Voucher' : 'Thêm Voucher'}
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tên Voucher
              </label>
              <input
                type="text"
                value={newVoucher.nameVoucher}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, nameVoucher: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mô tả
              </label>
              <input
                type="text"
                value={newVoucher.description}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    description: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mã Voucher
              </label>
              <input
                type="text"
                value={newVoucher.codeVoucher}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, codeVoucher: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Giảm giá (%)
              </label>
              <input
                type="number"
                value={newVoucher.priceSale}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    priceSale: e.target.value,
                  })
                }
                min="1"
                max="100"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Số lượng
              </label>
              <input
                type="number"
                value={newVoucher.quantity}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, quantity: e.target.value })
                }
                min="1"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Giá tối đa được giảm
              </label>
              <input
                type="text"
                value={newVoucher.maxPriceSale}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    maxPriceSale: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={addVoucher}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? 'Lưu' : 'Thêm'}
              </button>
              <button
                onClick={closeAddDialog}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b p-2">Tên Voucher</th>
              <th className="border-b p-2">Mô tả</th>
              <th className="border-b p-2">Mã Voucher</th>
              <th className="border-b p-2">Giảm giá (%)</th>
              <th className="border-b p-2">Số lượng</th>
              <th className="border-b p-2">Giá tối đa được giảm</th>
              <th className="border-b p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listVoucher?.length > 0 &&
              listVoucher.map((voucher, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{voucher.nameVoucher}</td>
                  <td className="border-b p-2">{voucher.description}</td>
                  <td className="border-b p-2">{voucher.codeVoucher}</td>
                  <td className="border-b p-2">{voucher.priceSale}%</td>
                  <td className="border-b p-2">{voucher.quantity}</td>
                  <td className="border-b p-2">
                    {formattedPrice(voucher.maxPriceSale)}
                  </td>
                  <td className="border-b p-2">
                    {/* <button
                      onClick={() => openEditDialog(index)}
                      className="text-blue-500 hover:underline"
                    >
                      Sửa
                    </button> */}
                    <button
                      onClick={() => deleteVoucher(voucher._id)}
                      className="text-red-500 ml-2 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherManager;
