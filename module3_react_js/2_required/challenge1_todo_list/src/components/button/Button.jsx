import React from 'react'
import './styles.css';

export const Button = props => {
  console.log("Entra")
  return (
    <>
      <button disabled={props.description ? "" : "disabled"} onClick={props.action}>{props.name}</button>
    </>
  )
}
