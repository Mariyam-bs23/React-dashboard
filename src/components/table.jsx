import {useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import axios from 'axios'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor(row => row.id,  {
    id: 'id',
    header: () => <span>S.No</span>,
  }),
  columnHelper.accessor(row => row.title, {
    id: 'productName',
    cell: info => <span>{info.getValue()}</span>,
    header: () => <span>Product Name</span>,
  }),
  columnHelper.accessor(row => row.category, {
    id: "category",
    header: () => 'Category',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor(row => row.stock, {
    id: "count",
    header: () => 'Stock',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor(row => row.rating, {
    id: "rate",
    header: (info) => <span 
    className='cursor-pointer'
     onClick= {info.column.getToggleSortingHandler()}
     >Rate{
     {
      asc: <FilterListIcon className='rotate-180 ml-2'/>,
      desc: <FilterListIcon className='ml-2'/>,
    }[info.column.getIsSorted()] ?? <SortIcon className='ml-2'/>}
     </span>
  }),
]

const BasicTable = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get("https://dummyjson.com/products")
    .then(response => {
        setData(response.data.products);
    }).catch(error => console.log(error));
  },[])

  const table = useReactTable({
    data,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
          pageSize: 5,
      },
  },
  })

  return (
    <div className="p-2">
      <table className='text-gray-800 w-full'>
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
                    {row.getVisibleCells().map(cell =>(
                          <td className='min-w-40 text-center capitalize' key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                  </tr>
                );
            })}
        </tbody>
      </table>

      <div className="flex items-center justify-end mt-5 gap-2">
        <button
          className="rounded-md p-1 text-medium bg-gray-600 text-white cursor-pointer"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <SkipPreviousIcon/>
        </button>
        <button
          className="rounded-md p-1 text-medium bg-gray-600 text-white cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowRightIcon className='rotate-180'/>
        </button>
        <button
          className="rounded-md p-1 text-medium bg-gray-600 text-white cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRightIcon/>
        </button>
        <button
          className="rounded-md p-1 text-medium bg-gray-600 text-white cursor-pointer"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <SkipPreviousIcon  className='rotate-180'/>
        </button>
        <span className="flex items-center gap-1 ml-3">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <label>Show : </label>
        <select
          value={table.getState().pagination.pageSize}
          className='bg-white px-4 py-2 outline-none border border-slate-400/40'
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[5 ,10, 15 , 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
               {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default BasicTable;