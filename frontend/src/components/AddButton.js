import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/plus.svg'

const AddButton = () => {
  return (
    <div>
        <Link to="/notes/create/" className='floating-button'>
            <AddIcon />
        </Link>
        
    </div>
  )
}

export default AddButton