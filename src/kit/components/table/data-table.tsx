import React, { useEffect, useRef } from 'react'
import * as _ from 'lodash';

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
  isGroupHeader?: boolean,
  prevCountRef?: any,
}

function DataTable(props: DataTableProps) {
  const {rowData, columnConfig, prevCountRef} = props;
  const itemsRef = useRef([]);

  console.log(itemsRef.current);
  useEffect(()=>{
    
    if (itemsRef.current.length > 0) {
      console.log(itemsRef.current.reduce((cur,acc)=> {
        return itemsRef[cur]
        
      },0),'itemsRef');
    }
    
  },[])

  const getLocations = (local) => {  
    const location = { ...local }; // copy
    delete location.children;
  
    if (!local.children || !local.children.length) {
      return location; // return copied
    }
  
    // return copied, but pass original to flatMapDeep
    return [
      location, 
      _.flatMapDeep(local.children, getLocations)
    ];
  }

  const getColumns = (columns) => {
    var columnsChilds : any[] = columns.map((m,i) => {
      if (m.children && m.children.length) {
        let children = [ ...m.children.map(item=>{
          return {
            ...item,
            parent: m.dataIndex
          }
        })];
        return children
      }
      return m;
    })
    return columnsChilds    
  };
  
  useEffect(()=>{
    console.log(getColumns(columnConfig).flat());
    
  },[])
  

  return (
    <div className='data-table'>
      <table border={1} cellPadding={3} cellSpacing={0}>
        <thead>
          <tr>
            {columnConfig.map((item, idx) => {
              if (item.headerGroup) {
                return (
                  <th key={idx} colSpan={item.children?.length}>
                    <div>
                      <div className='header-group'>{item.headerGroup}</div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        {item.children.map((em,im)=>(
                          <div className={`header-child ${im !== item.children.length - 1 ? 'border-right' : ''}`} style={{width: `${100/(item.children.length)}%`}}  key={im}>{em.title}</div>    
                        ))}
                      </div>
                    </div>
                  </th>
                )
              }
              return (
                <th key={idx} rowSpan={2} style={{width: itemsRef.current[item.dataIndex]?.offsetWidth}}>{item.title}</th>    
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rowData && rowData.map((row, idx) => (
            <tr key={idx} className='row-height'>
              {getColumns(columnConfig).flat().map((item, i) => {                
                return (
                  <td key={i} ref={el => 
                    {setTimeout(()=>{
                      itemsRef.current[item.dataIndex] = el
                    },200)}
                    }  className={(prevCountRef && +row[item.dataIndex] > prevCountRef[idx][item.dataIndex]) ?
                    'styleUp' : 'styleDown'}>{row[item.dataIndex]}</td>    
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