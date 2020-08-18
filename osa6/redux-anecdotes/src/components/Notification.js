import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: props.notification !== '' ? '' : 'none'
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification.messages }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification