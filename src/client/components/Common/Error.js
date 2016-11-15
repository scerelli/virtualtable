import React from 'react'

function Error(props) {
    return <p className="error-message">
        { props.text ? props.text : props.children }
    </p>
}

export default Error
