import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/24/solid";
import { useCancelOrderDetailMutation, useDeliveringOrderDetailMutation, useGetAllOrderQuery, useGetOrderHistoryUserQuery, useGettingItemOrderDetailMutation } from "../../../api/api";
import axios from "axios";
import { PROCESS_STATUS } from "../../../constants";
import { convertDate } from "../../../utils/convertDate";
import * as XLSX from "xlsx";
import Select from "react-select";
import { Link } from "react-router-dom";

const OrderStatusOptions = Object.keys(PROCESS_STATUS).map((key) => ({
  value: PROCESS_STATUS[key].CODE,
  label: PROCESS_STATUS[key].DISPLAY,
}));

const OrderStatus = (status) => {
  let colorClass = "";
  let text = "";
  switch (status) {
    case PROCESS_STATUS.COMPLETED.CODE:
      colorClass = "bg-blue-500";
      text = PROCESS_STATUS.COMPLETED.DISPLAY;
      break;
    case PROCESS_STATUS.DELIVERING.CODE:
      colorClass = "bg-green-500";
      text = PROCESS_STATUS.DELIVERING.DISPLAY;
      break;
    case PROCESS_STATUS.IN_PROGRESS.CODE:
      colorClass = "bg-yellow-500";
      text = PROCESS_STATUS.IN_PROGRESS.DISPLAY;
      break;
    case PROCESS_STATUS.GETTING_ITEM.CODE:
      colorClass = "bg-orange-500";
      text = PROCESS_STATUS.GETTING_ITEM.DISPLAY;
      break;
    case PROCESS_STATUS.CANCELED.CODE:
      colorClass = "bg-red-500";
      text = PROCESS_STATUS.CANCELED.DISPLAY;
      break;
    default:
      colorClass = "bg-gray-500";
      text = "Lỗi";
      break;
  }

  return (
    <div
      className={`${colorClass} text-white text-[16px] py-1 px-2 rounded-lg inline-block`}
    >
      {text}
    </div>
  );
};

function ProcessOrder() {
  const [activeTab, setActiveTab] = useState(PROCESS_STATUS.COMPLETED.CODE);
  const [isDataOrder, setIsDataOrder] = useState([]);
  const [dataExports, setDataExports] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data: dataOrder, isSuccess } = useGetAllOrderQuery();
  const [cancelOrder] = useCancelOrderDetailMutation();
  const [delivering] = useDeliveringOrderDetailMutation();
  const [gettingItem] = useGettingItemOrderDetailMutation();

  const handleDelivery = async (id, userId) => {
    await delivering({ _id: id, userId });
  };

  const handleCancel = async (id, userId) => {
    await cancelOrder({ _id: id, userId });
  };

  const handleAccept = async (id, userId) => {
    await gettingItem({ _id: id, userId });
  };

  function formatDateToISO(date) {
    return date.toISOString();
  }

  const exportToExcel = () => {
    const selectedOptionValue = selectedOption?.value;

    const filteredData = isDataOrder.filter((item) => {
    

      const itemDate = new Date(item["Ngày nhận"]);
      const startDateObject = new Date(startDate);
      const endDateObject = new Date(endDate);
      
      const startDateISO = formatDateToISO(startDateObject);
      const endDateISO = formatDateToISO(endDateObject);

      return item.createAt >= startDateISO && item.createAt <= endDateISO;
    });
    if(!filteredData) alert('Không tìm thấy đơn nào, vui lòng chọn lại ngày');


    const totalOrderCount = filteredData.length;
    const totalOrderPrice = filteredData.reduce((total, item) => total + parseFloat(item.total_price), 0);

    // console.log(filteredData);
    const worksheet = XLSX.utils.json_to_sheet([...filteredData.map(value => {
      return {
        "Mã sản phẩm": value._id,
        "Giá": value.total_price,
        "Email": value.email,
        "Ngày tạo": convertDate(value.createAt)
      }
    }), {
      "Mã sản phẩm": "Tổng giá:",
      "Giá": totalOrderPrice,
      "Email": "Số lượng đơn hàng:",
      "Ngày tạo": totalOrderCount
    }]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachDonHang");

    const today = new Date();
    const excelFileName = `DanhSachDonHang_${today.toISOString()}.xlsx`;

    XLSX.writeFile(workbook, excelFileName);
  };

  useEffect(() => {
    setIsDataOrder(dataOrder);
    const dataUpdate = dataOrder
      ?.map((value) => {
        if (value.status === "Đã nhận") {
          return {
            "Ngày nhận": value.updateAt,
            "Tổng giá": value.fullPrice.toFixed(3),
          };
        } else return null;
      })
      .filter((value) => value !== null);

    setDataExports(dataUpdate);
  }, [dataOrder]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-800">Dashboard</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search invoice"
            className="w-40 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Tiến trình sản phẩm</h1>
        <div className="mt-4 flex items-center space-x-4">
          <Select
            options={OrderStatusOptions}
            value={selectedOption}
            onChange={(selected) => setSelectedOption(selected)}
            placeholder="Chọn trạng thái"
          />
          <div className="flex items-center">
            <label className="mr-2">Từ ngày:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Đến ngày:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Xuất Excel
          </button>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("Tất cả")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Tất cả"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.COMPLETED.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.COMPLETED.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.COMPLETED.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.DELIVERING.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.DELIVERING.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.DELIVERING.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.GETTING_ITEM.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.GETTING_ITEM.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.GETTING_ITEM.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.IN_PROGRESS.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.IN_PROGRESS.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.IN_PROGRESS.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.CANCELED.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.CANCELED.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.CANCELED.DISPLAY}
          </button>
        </div>
        <table className="mt-4 w-full bg-white shadow-sm rounded-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Số thứ tự
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tên khách
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Ngày đặt
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tổng giá
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Trạng thái
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              dataOrder?.length > 0 &&
              [...dataOrder]
                .filter((order) => {
                  if (activeTab === "Tất cả") return true;
                  if (activeTab === order.status) return true;
                  return false;
                })
                .reverse()
                .map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {dataOrder.length - index}
                    </td>
                    <a href={'/orderid/' + order._id} target="_blank">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600 ">
                      {order.full_name}
                    </td>
                    </a>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {convertDate(order.createAt)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {order.total_price?.toFixed(3)} VND
                    </td>
                    <td>{OrderStatus(order.status)}</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      {order?.status === PROCESS_STATUS.IN_PROGRESS.CODE && (
                        <>
                          <button
                            onClick={() => handleAccept(order._id, order.userId)}
                            className="px-2 py-1 mr-3 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                          >
                            Chấp nhận
                          </button>
                          <button
                            onClick={() => handleCancel(order._id, order.userId)}
                            className="px-2 py-1 bg-red-600 rounded-md text-white hover-bg-rose-500"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                      {order?.status === PROCESS_STATUS.GETTING_ITEM.CODE && (
                        <>
                          <button
                            onClick={() => handleDelivery(order._id, order.userId)}
                            className="px-2 py-1 mr-3 bg-yellow-200 rounded-md text-gray-600 hover:bg-yellow-300"
                          >
                            Giao hàng
                          </button>
                          <button
                            onClick={() => handleCancel(order._id, order.userId)}
                            className="px-2 py-1 bg-red-600 rounded-md text-white hover-bg-rose-500"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <span className="text-sm font-medium text-gray-800">
            Page 1 of 10
          </span>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover-bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProcessOrder;
