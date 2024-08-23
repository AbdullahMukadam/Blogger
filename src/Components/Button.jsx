import React from 'react'

function Button({
    children,
    type="submit",
    className="",
    ...props
}) {
    // Common Btn
  return (
    <button type={type} className={`px-3 py-2 rounded-md bg-blue-500 text-black ${className}`} {...props}>{children}</button>
  )
}

export default Button
