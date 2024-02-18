import { useState ,useEffect, useRef } from "react";
import axios from 'axios'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel
  } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const ProductPage = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [updateItem, setUpdateItem] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const titleInputRef = useRef();
    const priceInputRef = useRef();
    const categoryInputRef = useRef();

    useEffect(()=>{
        axios.get("https://dummyjson.com/products")
        .then(response => {
            setData(response.data.products);
        }).catch(error => console.log(error));

        axios.get("https://dummyjson.com/products/categories")
        .then(response => {
            setCategories(response.data);
        }).catch(error => console.log(error));
        
    },[]);

    const columns = [
        columnHelper.accessor(row => row.id,  {
          id: 'id',
          header: () => <span>S.No</span>,
        }),
        columnHelper.accessor(row => row.title, {
          id: 'productName',
          cell: info => isEdit == info.row.original.id ? <input ref={titleInputRef} defaultValue={info.getValue} className="px-4 py-2 border border-gray-500/30 focus-within:outline-none w-40 shadow-md"/> : <span>{info.getValue()}</span> ,
          header: () => <span>Product Name</span>,
        }),
        columnHelper.accessor(row => row.category, {
          id: "category",
          header: () => 'Category',
          cell: info => isEdit == info.row.original.id ? 
          <select 
          ref={categoryInputRef}
          className="px-4 py-2 bg-gray-300/20 outline-none"
          defaultValue={info.row.original.category }
          name="category" id="category">
            {categories && categories.length && categories.map((option, index) => {
                return(
                    <option key={index} value={option}>{option}</option>
                )
            })}
            </select>
          : <span>{info.getValue()}</span> ,
        }),
        columnHelper.accessor(row => row.price, {
          id: "price",
          header: () => 'Price',
          cell: info => isEdit == info.row.original.id ? <input ref={priceInputRef} defaultValue={info.getValue} className="px-4 py-2 border border-gray-500/30 focus-within:outline-none w-40 shadow-md"/> : <span>$ {info.getValue()}</span> ,
        }),
        columnHelper.accessor(row => row.id , {
          id: "actions",
          header: () => <span>Actions</span>,
          cell: info => <div>
                <DriveFileRenameOutlineIcon 
                onClick={(e)=>handleEditItem(info)}
                className="mr-4 text-orange-300 cursor-pointer"/>
                <DeleteIcon 
                onClick={(e)=>handleDeleteItem(info)}
                className="text-red-700 cursor-pointer"/>
                {isEdit == info.row.original.id ? <CheckCircleIcon onClick={(e)=>handleSaveInfo(info)} className="text-green-500 cursor-pointer ml-4 animate-bounce hover:animate-none"/> : ''}
            </div>,
        }),
      ]
    
    const handleDeleteItem = (e) => {
        let item_info = e.row.original;
        axios.delete(`https://dummyjson.com/products/${item_info.id}`)
        .then(response =>  console.log("deleted item ", response.data))
        .catch(error => console.log(error));
    }
    const handleEditItem = (e) => {
        let item_info = e.row.original;
        setIsEdit(item_info.id);
        setUpdateItem(item_info);
    }
    const handleSaveInfo = (e) => {
        let item_info = e.row.original;
        setIsEdit(null);
        setUpdateItem(null);
        let updatedData = {
             title: titleInputRef.current.value, 
             price: priceInputRef.current.value,
             category:categoryInputRef.current.value}

         axios.put(`https://dummyjson.com/products/${item_info.id}`, {...updatedData} )
        .then(response => console.log("updated data ", response.data))
        .catch(error => console.log(error));
    }
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
      })

    return(
        <div className="pl-52 mt-8">
            <div className="px-8">
                <h2>Products</h2>
                <table className='text-gray-800 w-full mt-5'>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr className='border-y border-slate-400/40 h-14' key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th className='font-medium' key={header.id}>
                            {header.isPlaceholder
                                ? null
                                :  <div>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                                </div>
                                }
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => {
                            return(
                                <tr className='h-20 border-b border-slate-400/40' key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td className=' text-center capitalize' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                    )
                                )}
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductPage;