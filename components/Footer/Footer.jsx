import React from 'react'
import Github from '../Icons/Github'
import  {Facebook}  from '../Icons/Facebook'
import { Discord}  from '../Icons/Discord'
import  {Twitter}  from '../Icons/Twitter'

const Footer=()=>{

  const List_FIRST = [
    {
      url: "https://flowbite.com/",
      title: "Thông tin"
    },
    {
      url: "#",
      title: "Giới thiệu"
    },
    {
      url: "#",
      title: "Phương thức thanh toán"
    },
    {
      url: "#",
      title: "Bảo hành và sửa chữa"
    },
    {
      url:"#",
      title: "Đánh giá chất lượng và khiếu nại"
    },
    {
      url: "#",
      title: "Tuyển dụng "
    }
  ]
  const LIST_SECOND =[
    {
      url: "#",
      title: "Thu cũ đổi mới"
    },
    {
      url: "#",
      title: "Giao hàng"
    }
    ,
    {
      url: "#",
      title: "Bảo hành "
    },
    {
      url: "#",
      title: "Giải quyết khiếu nại"
    },
    {
      url: "#",
      title: "Bảo mật thông tin"
    }
  ]

  //Hùng tạo xong cái list đầu tiên của footer r bh hùng làm cho xem nè ==ok


  return (
    //Header
    //hmm nhung maf haf hoi cais cho may cai anh tuwj chuyenr ddongj s nos kh chayj dc as 

    //mấy cái lặp đi lặp lại mà chỉ thay đổi có chút xíu như chữ á thì cho vào 1 mảng nha ==hùng làm thử đi hà xme okok
    <>
    <footer className="bg-gray-900 dark:bg-gray-900">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                BHHD
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
            <div className="mb-4 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase text-white">
                Thông tin và chính sách
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {LIST_SECOND.map((value, index) => (
                  <li key={index}>
                    <a href={value.url} className="hover:underline">
                      {value.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase text-white">
                Chính sách
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {List_FIRST.map((value, index) => (
                  <li key={index}>
                    <a href={value.url} className="hover:underline">
                      {value.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase text-white">
                Địa chỉ liên hệ
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:underline">
                    Đặt hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Hệ thống cửa hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* ... (your existing social media icons code) */}
          </div>
        </div>
      </div>
    </footer>
  </>
       
  )

}
export default Footer