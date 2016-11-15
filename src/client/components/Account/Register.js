import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Error from '../Common/Error'

@observer(['account'])
class Register extends React.Component {

    @observable form = {
        username: 'test',
        password: 'test',
        errorMsg: null
    }

    handleChange = (key) => ({
        value: this.form[key],
        onChange: e => this.form[key] = e.target.value
    })

    handleSubmit = (e) => {
        e.preventDefault()
        this.handleRegister()
    }

    handleRegister() {
        const { account } = this.props

        account.register(this.form)
            .then(() => {
                account.login(this.form).then(() => {
                    setTimeout(() => window.location.href = '/', 500)
                })
            })
            .catch(error => this.form.errorMsg = error)
    }

    render() {
        return <main>
            <h1>register</h1>
            <form className="account" onSubmit={this.handleSubmit}>
                <label>
                    Username
                    <input type="text" {...this.handleChange("username")} required="required"/>
                </label>

                <label>
                    Password
                    <input type="password" {...this.handleChange("password")} required="required"/>
                </label>

                {this.form.errorMsg && <Error text={this.form.errorMsg}/>}

                <button>Register</button>
            </form>
        </main>
    }
}

export default Register
