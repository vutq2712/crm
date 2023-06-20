import React, { useCallback, useEffect, useRef, useState } from 'react'
//3 TanStack Libraries!!!
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useVirtual } from 'react-virtual'

// import { fetchData, Person, PersonApiResponse } from './makeData'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import RowComponent from './row.component'

const fetchSize = 70

export default function Test() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [socketUrl, setSocketUrl] = useState('wss://ws.bitstamp.net');
  const [bids, setBids] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const prevCountRef = useRef<any>([]);

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  useEffect(() => {
    if (lastMessage !== null && readyState === ReadyState.OPEN) {
      let bidData = Object.values(JSON.parse(lastMessage?.data)?.data?.bids || {})
      let askData = Object.values(JSON.parse(lastMessage?.data)?.data?.asks || {})
      // console.log(typeof bidData, [...Object.values(bidData || {})]);
      // const dataOption = [
      //   ...JSON.parse(lastMessage?.data)?.data?.bids,
      //   ...JSON.parse(lastMessage?.data)?.data?.asks,
      // ] 
      console.log([...bidData, ...askData, ...bidData].length);
      
      setBids([...bidData, ...askData, ...bidData]?.map((item, index) => {
        const itemObj = Object.assign({}, item);
        return {
          id: 'HAG',
          code: index,
          max: index,
          min: itemObj[1],
          CAO:itemObj[1],
          ['%']: itemObj[1],
          TB: itemObj[1],
          KL: itemObj[1],
          total: itemObj[1],
          GIA1: itemObj[1],
          dumua: itemObj[1],
          Khoplenh:itemObj[1],
          KL3: itemObj[1],
          KL2: itemObj[1],
          KL1: itemObj[1],
        }
      }));
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify(apiCall)), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    prevCountRef.current = bids;
  }, [bids])

  useEffect(()=>{
    handleClickSendMessage()
  },[])


  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper = createColumnHelper<any>()
  // const [columns] = React.useState<typeof defaultColumns>(() => [
  //   ...defaultColumns,
  // ])
  const [columnVisibility, setColumnVisibility] = React.useState({})

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'MÃ CK',
        size: 70,
      },
      {
        accessorKey: 'max',
        header: 'TRẦN',
        size: 70,
      },
      {
        accessorKey: 'min',
        header: 'SÀN',
        size: 70,
      },
      {
        accessorKey: 'total',
        header: 'TC',
        size: 70,
      },
      columnHelper.group({
        id: 'DƯ MUA',
        header: () => <span>DƯ MUA</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('GIÁ 3', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
          columnHelper.accessor(row => row.KL3, {
            id: 'KL3',
            cell: info => info.getValue(),
            header: () => <span>KL 3</span>,
            footer: props => props.column.id,
            size: 70,
          }),
          columnHelper.accessor('GIÁ 2', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: 'KL2',
            cell: info => info.getValue(),
            header: () => <span>KL 2</span>,
            footer: props => props.column.id,
            size: 70,
          }),
          columnHelper.accessor('GIÁ 1', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
          columnHelper.accessor(row => row.KL1, {
            id: 'KL1',
            cell: info => info.getValue(),
            header: () => <span>KL 1</span>,
            footer: props => props.column.id,
            size: 70,
          }),
        ],
      }),
      
      columnHelper.group({
        id: 'Khoplenh',
        header: () => <span>KHỚP LỆNH</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('GIÁ', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: '%',
            cell: info => info.getValue(),
            header: () => <span>%</span>,
            footer: props => props.column.id,
            size: 70,
          }),
          columnHelper.accessor('KL', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
        ],
      }),
      columnHelper.group({
        id: 'dumua',
        header: () => <span>DƯ MUA</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('GIÁ 11', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            header: () => <span>GIÁ 1</span>,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: 'KL 11',
            cell: info => info.getValue(),
            header: () => <span>KL 1</span>,
            footer: props => props.column.id,
            size: 70,
          }),
          columnHelper.accessor('GIÁ 22', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            header: () => <span>GIÁ 2</span>,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: 'KL 21',
            cell: info => info.getValue(),
            header: () => <span>KL 2</span>,
            footer: props => props.column.id,
            size: 70,
          }),
          columnHelper.accessor('GIÁ 33', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            header: () => <span>GIÁ 3</span>,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: 'KL 31',
            cell: info => info.getValue(),
            header: () => <span>KL 3</span>,
            footer: props => props.column.id,
            size: 70,
          }),
        ],
      }),
      columnHelper.group({
        id: 'GIA1',
        header: () => <span>GIÁ</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('CAO', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: 'THẤP',
            cell: info => info.getValue(),
            header: () => <span>THẤP</span>,
            footer: props => props.column.id,
            size: 70,
          }),
          columnHelper.accessor('TB', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
        ],
      }),
      {
        accessorKey: 'total_kl',
        header: () => 'TỔNG KL',
        size: 70,
      },
      
      columnHelper.group({
        id: 'NN',
        header: () => <span>NN</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('MUA', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 70
          }),
          columnHelper.accessor(row => row.lastName, {
            id: 'BÁN',
            cell: info => info.getValue(),
            header: () => <span>BÁN</span>,
            footer: props => props.column.id,
            size: 70,
          }),
        ],
      }),
    ],
    []
  )

  // const fetchData = (
  //   start: number,
  //   size: number,
  //   sorting: SortingState,
  //   // data?: any
  // ) => {
  //   const dbData = [...bids]
  //   if (sorting.length) {
  //     const sort = sorting[0] as any
  //     const { id, desc } = sort as { id: keyof any; desc: boolean }
  //     dbData.sort((a, b) => {
  //       if (desc) {
  //         return a[id] < b[id] ? 1 : -1
  //       }
  //       return a[id] > b[id] ? 1 : -1
  //     })
  //   }
  
  //   return {
  //     data: dbData.slice(start, start + size),
  //     meta: {
  //       totalRowCount: dbData.length,
  //     },
  //   }
  // }
  // react-query has an useInfiniteQuery hook just for this situation!
  // const { data, fetchNextPage, isFetching, isLoading } =
  //   useInfiniteQuery<any>(
  //     ['table-data', sorting], //adding sorting state as key causes table to reset and fetch from new beginning upon sort
  //     async ({ pageParam = 0 }) => {
        
  //       const start = pageParam * fetchSize
  //       const fetchedData = fetchData(start, fetchSize, sorting) //pretend api call
  //       return fetchedData
  //     },
  //     {
  //       getNextPageParam: (_lastGroup, groups) => groups.length,
  //       keepPreviousData: true,
  //       refetchOnWindowFocus: false,
  //     }
  //   )

  //we must flatten the array of arrays from the useInfiniteQuery hook
  // const flatData = React.useMemo(
  //   () => data?.pages?.flatMap(page => page.data) ?? [],
  //   [data]
  // )
  // const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0
  // const totalFetched = flatData.length

  const table = useReactTable({
    data: bids,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })
  
  const { rows } = table?.getRowModel()

  // Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 60,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  // if (isLoading) {
  //   return <>Loading...</>
  // }
  return (
    <div className="p-2">
      <div className="h-2" />
      {/* <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div> */}
      <div
        className="container"
        // onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        onScroll={e=>console.log(e.target,'e.target')
        }
        ref={tableContainerRef}
      >
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {      
                  if (header.isPlaceholder) {
                    return <th style={{width: header.getSize(),  textAlign: 'center'}} rowSpan={2}>
                      {(
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.82091 3.09995L4.42927 0.154622C4.19187 -0.0515402 3.80753 -0.0515403 3.57073 0.154622L0.179091 3.09995C-0.203425 3.43213 0.0673714 4 0.608358 4L7.39164 4C7.93263 4 8.20343 3.43213 7.82091 3.09995Z" fill="#ADB3C0"></path></svg>,
                            desc: <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.17909 0.90005L3.57073 3.84538C3.80814 4.05154 4.19247 4.05154 4.42927 3.84538L7.82091 0.900048C8.20343 0.567868 7.93263 -1.38698e-06 7.39164 -1.2924e-06L0.608358 -1.06369e-07C0.0673716 -1.17796e-08 -0.203426 0.56787 0.17909 0.90005Z" fill="#ADB3C0"></path></svg>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  }
                  if (!header.column.parent && header.subHeaders.length === 0) {
                    return null;
                  }
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize(), textAlign: 'center' }}
                      // rowSpan={header.isPlaceholder ? 0 : 2}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.82091 3.09995L4.42927 0.154622C4.19187 -0.0515402 3.80753 -0.0515403 3.57073 0.154622L0.179091 3.09995C-0.203425 3.43213 0.0673714 4 0.608358 4L7.39164 4C7.93263 4 8.20343 3.43213 7.82091 3.09995Z" fill="#ADB3C0"></path></svg>,
                            desc: <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.17909 0.90005L3.57073 3.84538C3.80814 4.05154 4.19247 4.05154 4.42927 3.84538L7.82091 0.900048C8.20343 0.567868 7.93263 -1.38698e-06 7.39164 -1.2924e-06L0.608358 -1.06369e-07C0.0673716 -1.17796e-08 -0.203426 0.56787 0.17909 0.90005Z" fill="#ADB3C0"></path></svg>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <RowComponent row={row} idx={idx} key={idx}/>
            ))}
            {/* {virtualRows.map((virtualRow, idx) => {
              const row = rows[virtualRow.index] as Row<any>
              
              return (
                <RowComponent row={row} idx={idx} key={idx}/>
              )
            })} */}
            {/* {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow, idx) => {
              const row = rows[virtualRow.index] as Row<any>
              
              return (
                <tr key={row.id}  >
                  {row.getVisibleCells().map(cell => {
                    
                    return (
                      <td key={cell.id} className={`${+cell.getValue() > 1 ? 'styleUp' : 'styleDown'}`} style={ {backgroundColor: idx % 2 === 0 ? '#253147' : '#1d2734', color: +cell.getValue() > 1 ? '#00ff47' : '#ff2b2b'}}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
      {/* <div>
        Fetched {flatData.length} of {totalDBRowCount} Rows.
      </div> */}
      {/* <div>
        <button onClick={() => {
          rerender()
          }}>Force Rerender</button>
      </div> */}
    </div>
  )
}
