import { LabelImportant } from '@mui/icons-material'
import React from 'react'

const InputComponent = ({label, type, name, defaultValue, state}) => {
  return (
    <div>
        <div className="mb-4 flex flex-col gap-1">
          <label className="text-sm" htmlFor="email">
            {label}
          </label>
          <input
            type={type}
            className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2"
            name={name}
            id={name}
            required
            defaultValue={defaultValue}
            onChange={(e) => setEmail(e.target.value)}
            min="3"
            autoComplete="off"
            // onChange={handleChange}
          />
        </div>
    </div>
  )
}

export default InputComponent