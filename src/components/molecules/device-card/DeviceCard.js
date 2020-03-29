import React from 'react'
import './DeviceCard.css'

import { CropIcon } from '../../atoms'

export default (props) => {
    return (
        <div className='device-card-container col-lg-3 col-md-6 col-s-1'>
            <div className='device-card neumorphic'>
                <div className='device-header'>
                    <p className='last-active'>Last Active: <span className='good'>2 hours ago</span></p>
                </div>

                <div className='device-info-container'>
                    <div className='device-info'>
                        <p className='site-name'>{props.sitename}</p>
                        <p className='device-id'>{props.device_id}</p>
                        <p className='crop-name'>{props.crop} - {props.variety}</p>

                    </div>
                    <div className='crop-icon'>
                        <CropIcon crop={props.crop} />
                    </div>
                </div>
                <div className='crop-info'>

                </div>
            </div>
        </div>
    )
}
