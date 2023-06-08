import React, { useEffect, useRef } from 'react'

export interface ColumnProps {
  title?: string,
  dataIndex?: string,
  headerGroup?: string,
  children?: {
    title: string,
    dataIndex: string
  }[]
}

interface DataTableProps {
  rowData?: any,
  columnConfig?: ColumnProps[],
}

function DataTable(props: DataTableProps) {
  const {rowData, columnConfig} = props;
  const itemsRef = useRef([]);
  const itemsRefChild = useRef([]);

  console.log(itemsRef?.current,'arr')
  useEffect(()=>{
    if (itemsRef.current.length > 0) {
      
      console.log(itemsRef.current.reduce((cur,acc)=> {
        return itemsRef[cur]
        
      },0),'itemsRef');
    }
    
  },[itemsRef])

  return (
    <div className='data-table'>
      <table border={1} cellPadding={3} cellSpacing={0}>
        <thead>
          <tr>
            {columnConfig.map((item, idx) => {
              if (item.headerGroup) {
                return (
                  <th style={{width: 100}} colSpan={item.children?.length}>
                    <div>
                      <div>{item.headerGroup}</div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        {item.children.map((em,im)=>(
                          <b>{em.title}</b>    
                        ))}
                      </div>
                    </div>
                  </th>
                )
              }
              return (
                <th>{item.title}</th>    
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rowData && rowData.map((row, idx) => (
            <tr key={idx}>
              {columnConfig.map((item, i) => {
                if (item.headerGroup) {
                  return (
                    <>
                      {item.children.map((em,im)=>(
                        <td ref={el => {
                          if (itemsRef.current[item.dataIndex]) {
                            let itemsRefChilds;
                            itemsRefChilds[im] = el
                            // itemsRefChild.current[im] = el;
                            itemsRef.current[item.dataIndex] = itemsRefChilds
                          }
                        } }>{row[em.dataIndex]}</td>    
                      ))}
                    </>
                  )
                }
                return (
                  <td ref={el => itemsRef.current[item.dataIndex] = el} >{row[item.dataIndex]}</td>    
                )
              })}
            </tr>
          ))}
              {/* {rowData && rowData.map((message, idx) => (
                <tr key={idx}>
                  <td className={(prevCountRef.current && +message.KLM > prevCountRef.current[idx].KLM) ?
                      'styleUp' : 'styleDown'}>
                    {message.KLM}
                  </td>
                  <td className={(prevCountRef.current && +message.KLB > prevCountRef.current[idx].KLB) ?
                      'styleUp' : 'styleDown'}>
                    {message.KLB}
                  </td>
                </tr>
              ))} */}
              {/* {asks && asks.map((message, idx) => (
                <tr key={idx}>
                  {message.map((msg,id)=>(
                    <td key={id} style={((id === 0 && +msg > 25600) || (id === 1 && +msg > 1)) ? {
                      backgroundColor: '#0bdf39',
                      color:'white'
                    } : {
                      backgroundColor: '#e74c3c',
                      color: 'white'
                    }}>{msg}</td> 
                  ))}
                </tr>
              ))} */}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable