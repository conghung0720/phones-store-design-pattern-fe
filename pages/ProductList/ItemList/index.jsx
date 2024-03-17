import { Link, useParams } from "react-router-dom"
import { useGetListPhonesQuery } from "../../../api/api"
import { formattedPrice } from "../../../utils/formatedPrice"
import SuggestSearch from "../../../components/Search/SuggestSearch"
import { useEffect, useState } from "react"


  export default function ItemList() {
    const {data: isData, isSuccess, isLoading} = useGetListPhonesQuery()
    const [keyword, setKeyword] = useState("");
    const [dataFilter, setDataFilter] = useState([]);
    const { brand } = useParams();
    
    useEffect(() => {
      isSuccess && setDataFilter(isData?.map(val => val))
    }, [isData, isSuccess, isLoading])


    //Keyword change data
    useEffect(() => {
      const filterData
       = isData?.map(val => val)?.filter(el => el.name.toLowerCase().includes(keyword.toLowerCase()));
      setDataFilter(filterData)
    }, [keyword])

    console.log(keyword);
    
    return (
      <div className="bg-white">
        <SuggestSearch setKeyword={setKeyword} keyword={keyword}/>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sản phẩm</h2>
          {!keyword ? <h2></h2> : <h2>Bạn đang tìm "{keyword}"</h2>}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isSuccess && dataFilter?.filter(val => {
              if(val.brand === brand) return val;
              if(!brand) return val;
            }).map((product) => (
              
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/detail/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.attributes.filter(value => value.quantity > 0)[0]?.color || "Màu đỏ"}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formattedPrice(product.attributes.filter(value => value.quantity > 0)[0]?.price) || 0}</p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    )
  }
  