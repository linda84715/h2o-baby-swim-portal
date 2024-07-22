import { useState } from "react";

// 這段 TypeScript 代碼定義了一個名為 Props 的介面（interface），用於描述傳遞給 React 組件的 props 的結構
// props 是父組件傳遞給子組件的數據
interface Props{
    items: string[]; // ["apple", "banana", "cherry"]。
    heading: string; // "This is a heading"
    onSelectItem: (items:string) => void; //void 表示該函數沒有返回值。
}

function ListGroup({items, heading, onSelectItem }: Props) {
    
    // Hook
    const [selectedIndex, setSelectedIndex] = useState(-1);


   /* 
    items.map((item) => <li>{item}</li>);
    JavaScript 表達式，使用了 map 方法對 items 陣列中的每個元素進行遍歷和處理。
    map 方法將會遍歷 items 陣列中的每個元素map 方法將會遍歷 items 陣列中的每個元素。
    對於每個元素 item，箭頭函數 <li>{item}</li> 會被呼叫，產生一個新的 <li> 元素。
    在 JSX 中，使用 {} 將 JavaScript 變數嵌入到 JSX 中，這樣可以將 item 的值動態地插入到 <li> 元素內，形成最終的 JSX 元素
    */

    //event handler
  
  
    //class is a reserved keyword for js, need change to className
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li 
            className={ 
                selectedIndex === index 
                ? 'list-group-item active'
                :'list-group-item'
            }
            key={item}
            onClick={() => { 
                setSelectedIndex(index);
                onSelectItem(item)}} // 調用 setSelectedIndex(index) 將 selectedIndex 更新為當前項目的索引 index。
            >
            {item}
          </li>
        ))}
        {/* 使用 JavaScript 的 map 方法和 JSX 語法來動態生成並渲染列表項目*/}
      </ul>
    </> //tell react we're using fragement
  );
}

export default ListGroup;
