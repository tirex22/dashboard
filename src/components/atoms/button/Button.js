import React from 'react'
import './Button.css'

export default function Button(props) {
    return (
        <button className='button' style={props.style} onClick={() => props.onClick ? props.onClick() : null}>
            {
                props.loading ?
                    <div className="loader" />
                    :
                    props.text
            }
        </button>
    )
}
