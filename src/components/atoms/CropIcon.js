import React from 'react'

export default function CropIcon(props) {
    return (
        <img src={`http://twtegypt.com/icons/${props.crop.toLowerCase()}.png`} alt='' style={{ borderRadius: 15, height: 35, width: 35 }} />
    )
}
