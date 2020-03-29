import React from 'react'
import './NavPage.css'

import { NavBar } from '../../molecules/'

export default (props) => {
    return (
        <div className='nav-page'>
            <NavBar />
            {props.children}
        </div>
    )
}
