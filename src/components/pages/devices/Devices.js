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

                const devices = response.reduce((acc, device) => {
                    return ({ ...acc, [device.id]: device })
                }, {})

                // stop loading and set page devices to fetched devices
                this.setState({ devices: devices, loading: false })

                setTimeout(() => {
                    this.getLastReadings()
                }, 0)

            })
            .catch(error => {
                // stop loading and show error
                this.setState({ loading: false, error: error })
            })
    }

    getLastReadings = () => {
        // get all device ids
        const deviceIds = Object.keys(this.state.devices)
        // set request device ids to get all devies last readings
        const payload = { id: deviceIds }
        // request all last readings  from backend
        request({
            serviceName: 'device',
            functionName: 'getLastReadings',
            payload: payload,
        })
            .then(response => {
                let devices = this.state.devices
                response.map(reading => {
                    if (devices[reading.deviceId]) {
                        devices[reading.deviceId].lastReading = reading
                    }
                })
                this.setState({ device: devices })
            })
            .catch(error => {
                // stop loading and show error
                this.setState({ loading: false, error: error })
            })
    }

    renderDeviceCards = () => {
        return (
            Object.keys(this.state.devices).map(deviceId => {
                const device = this.state.devices[deviceId]
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
