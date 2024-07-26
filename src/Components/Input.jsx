import React,{useId} from 'react'

function Input({
    placeholder,
    type,
    label,
    className="",
    ...props
},ref) {
    const id = useId();
  return (
    <div className='flex flex-col gap-1 w-full text-center'>
        {label && <label htmlFor={id} className='text-sm font-medium text-white'>{label}</label>}
        <input type={type} id={id} placeholder={placeholder} className={`px-3 py-2 mt-1 w-full rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`} {...props} ref={ref}/>
    </div>
  )
}

export default React.forwardRef(Input)