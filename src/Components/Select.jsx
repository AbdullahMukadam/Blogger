import React,{useId} from 'react'


const Select = (
  {options,
  label,
  className="",
  ...props
  },ref) => {
    const id= useId()
  return (
    <div className="w-full text-center">
      {label && <label className="text-center text-white">{label}</label>}
    
    <select
    htmlFor={id}
    ref={ref}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    {...props}
    > 
     {options?.map((option)=>(
       <option key={option} value={option}>{option}</option>
       ))}
    </select>
    </div>
    
  )
}

export default React.forwardRef(Select)