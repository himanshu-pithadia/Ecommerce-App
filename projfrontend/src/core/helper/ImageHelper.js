import React from 'react'

const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : "";
  return (
    <div className='rounded boarder border-success p-2'>
      <img src={imageurl}
        style={{maxHeight:"100%", maxWidth:"100%"}}
        className='mb-3 rounded'
      />
    </div>
  )
}

export default ImageHelper;