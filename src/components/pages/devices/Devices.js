import React, { Component } from 'react'
import { request } from '../../controller/RequestHandler'

import { DeviceCard } from '../../molecules'
import { NavPage } from '../../templates'

export default class Devices extends Component {
    constructor() {
        super()
        this.state = {
            devices: [],
            loading: true
        }
    }

    componentDidMount = () => {
        // get all user devices
        this.getDevices()
    }

    getDevices = () => {
        // get account info from browser local storage
        const account = JSON.parse(localStorage.getItem('account'))
        // set request user id to get all user devices
        const payload = { id: account.userID }
        // request all user devies from backend
        request({ serviceName: 'user', functionName: 'getDevices', payload: payload })
            .then(response => {
                // stop loading and set page devices to fetched devices
                this.setState({ devices: response, loading: false })
            })
            .catch(error => {
                // stop loading and show error
                this.setState({ loading: false, error: error })
            })
    }

    renderDeviceCards = () => {
        return (
            this.state.devices.map(device => {
                if (device.deviceState === 'active') {
                    return (
                        <DeviceCard key={device.id} {...device} />
                    )
                } else {
                    return null
                }
            })
        )
    }

    render() {
        return (
            <NavPage>
                <div className='row justify-content-center'>
                    {
                        this.state.loading ?
                            <div className='loader' />
                            :
                            this.renderDeviceCards()
                    }
                </div>
            </NavPage>
        )
    }
}
