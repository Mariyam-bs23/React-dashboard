import {useState, useEffect , useReducer} from 'react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import axios from 'axios'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor(row => row.id,  {
    id: 'id',
    // cell: (props) => {
    //     return props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row)+1;
    //   },
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
  columnHelper.accessor(row => row.rating.count, {
    id: "count",
    header: () => 'Stock',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor(row => row.rating.rate, {
    id: "rate",
    header: () => 'Rate',
    cell: info => info.renderValue(),
  }),
]

const BasicTable = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products")
    .then(response => {
        setData(response.data);
    }).catch(error => console.log(error));
  },[])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table className='text-gray-800'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr className='border-y border-slate-400/40 h-14' key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className='font-medium' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row, i) => {
             if(row.original.rating.rate > 4){
                return(
                    <tr className='h-20 border-b border-slate-400/40' key={row.id}>
                    {row.getVisibleCells().map(cell =>(
                          <td className='min-w-40 text-center' key={cell.id}>
                            {cell.id.includes("id") ? i+1 : flexRender(cell.column.columnDef.cell, cell.getContext())}
                            {console.log("cell" ,cell.id.includes("id"))}
                        </td>
                      ))}
                  </tr>
                );
             }
            })}
        </tbody>
      </table>
    </div>
  )
}

export default BasicTable;