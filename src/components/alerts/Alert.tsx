import { type } from 'os'
import React from 'react'

type AlertProps = {
    title: string,
    message: string
}

export default function Alert(props: AlertProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 mb-2 rounded relative" role="alert">
        <strong className="font-bold">{props.title}</strong>
        <span className="block sm:inline">{props.message}</span>
    </div>
  )
}
