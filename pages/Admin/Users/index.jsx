import React from 'react'
import { ActionProfile } from './ActionProfile'
import { useGetListUserQuery } from '../../../api/api'
// import { Search } from '../../../components/Icons/Search'


export const UserList = () => {
    const {data: isData, isSuccess} = useGetListUserQuery()

  return (
    <div class=" h-screen text-white  ">
    <div class="w-full text-sm text-left  dark:text-black bg-center  mt-8 ">
        {/* <div class="grid grid-cols-4 ">
          {
            LIST_NUMBER.map(value=>{return(
            <div class="text-center p-8 border-r-2 border-gray-900 ">
                <h2 class="text-xl font-medium ">{value.title}</h2>
                <h3 class="  font-semibold text-4xl  "> {value.number}</h3>
            </div>
            )})
          }

        </div> */}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 ">
    {/* <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 ">
        
        <label for="table-search" class="sr-only mt-3">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-center">
                <Search/>
            </div>
            <input type="text" id="table-search-users" class="inline-block  p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div> */}
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Thông tin
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    Vai trò
                </th> */}
                <th scope="col" class="px-6 py-3">
                    Trạng thái
                </th>
                <th scope="col" class="px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
        {
                isSuccess && isData.map(item=>{ return( 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {/* <img class="w-10 h-10 rounded-full" src={item.img} alt="Jese image"/> */}
                    <ActionProfile userId={item._id} avatar={item.avatar}/>
                    <div class="pl-3">
                        <div class="text-base font-semibold">{item.userName}</div>
                        <div class="font-normal text-gray-500">{item.email}</div>
                    </div>  
                </th>
                {/* <td class="px-6 py-4">
                  {item.role}
                </td> */}
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>Còn hoạt động
                    </div>
                </td>
                {/* <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td> */}
            </tr>
            )})
          }
            </tbody>
    </table>
</div>
    </div>
</div>
  )
}