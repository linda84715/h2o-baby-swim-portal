
interface Props {
    children: string
    onClick: () => void;
}

const Button = ({ children, onClick } : Props) => {
    return (
        <button className='btn btn-primary' onClick={onClick}>{children}</button>
    ) // 這意味著當 <button> 元素被點擊時，React 會調用 onClick 函數
}

export default Button