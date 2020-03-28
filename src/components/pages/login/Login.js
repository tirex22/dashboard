import React, { Component } from 'react'
import { Button } from '../../atoms'
import { request } from '../../controller/RequestHandler'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            error: ' ',
            loading: false
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    login = () => {
        this.setState({ loading: true })

        const payload = { username: this.state.username, password: this.state.password }

        request({ serviceName: 'user', functionName: 'login', payload: payload })
            .then(response => {
                if (response.error) {
                    this.setState({ loading: false, error: response.error })
                } else {
                    this.setState({ error: '' })
                    localStorage.setItem('account', JSON.stringify(response))
                    window.location.href = '/devices'
                }
            })

            .catch(error => {
                console.log(error)
                this.setState({ loading: false, error: error })
            })
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.login()
        }
    }

    render() {
        return (
            <div onKeyDown={this._handleKeyDown} className='page'>
                <div className='row' style={{ marginTop: '7%' }} >
                    <div className='card neumorphic col-sm-12 col-lg-4 offset-lg-4'>

                        <h1 className='logo'>WULTON</h1>

                        <label>Username</label>
                        <input
                            type='text'
                            disabled={this.state.loading}
                            placeholder='username'
                            value={this.state.username}
                            onChange={this.onUsernameChange} />

                        <label>Password</label>
                        <input
                            type='password'
                            disabled={this.state.loading}
                            placeholder='password'
                            value={this.state.password}
                            onChange={this.onPasswordChange} />

                        <p className='error'>{this.state.error}</p>

                        <Button
                            style={styles.submitButton}
                            text='Log In'
                            loading={this.state.loading}
                            onClick={this.login} />

                    </div>
                </div>
            </div>
        )
    }
}

const styles = {

    logoContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },

    logo: {
        width: '30%',
    }

}
