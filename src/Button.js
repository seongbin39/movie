import React from 'react'
import './Button.css'

function Button({ children, size, color, width, handleClick}){ 
        return <button onClick={handleClick} className={`Button ${size} ${color} ${width}`}>{children}</button> 
    } 


Button.defaultProps = {
    size: 'medium',
    color: 'tomato',
}

export default Button;
