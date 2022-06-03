import React from 'react'

const ListItem: React.FC<{ text: Array<string>; key?: any }> = (text, key) => {
  return <div key={key}>{[<h4>{text}</h4>]}</div>
}
export default ListItem
