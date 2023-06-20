import { flexRender } from '@tanstack/react-table'
import React from 'react'

function RowComponent(props) {
  const {row, idx} = props
  return (
    <tr>
      {row.getVisibleCells().map(cell => (
        <td key={cell.id} className={`${cell.getValue() && +cell.getValue() > 1 ? 'styleUp' : (+cell.getValue() > 0) ? 'styleDown' : ''}`} style={ {backgroundColor: idx % 2 === 0 ? '#253147' : '#1d2734', color: +cell.getValue() > 1 ? '#00ff47' : '#ff2b2b', fontSize: `${cell.getValue()}`.length > 5 ? 11 : 12}}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}

export default RowComponent