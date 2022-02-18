import React from 'react'

const ImgCart = ({image, images, setImages, setImage}) => {
  return (
    <div className="img-cart">
        <div className="img-cart-block">
            <img src={image.url} className="img-cart__image" onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src="https://dev14.panama.kz" + image.url;
            }}></img>
            <p>{image.name}</p>
        </div>
        <svg onClick={()=>{images ? setImages(images.filter(img => img !== image)) : setImage(null); }} 
          className="img-cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5H17.441C17.01 5 16.629 4.72602 16.492 4.31702L16.176 3.36694C15.903 2.54994 15.14 2 14.279 2H9.71997C8.85797 2 8.095 2.55004 7.823 3.36804L7.50702 4.31604C7.37102 4.72504 6.98898 5 6.55798 5H3C2.448 5 2 5.447 2 6C2 6.553 2.448 7 3 7H4.065L4.81598 18.266C4.95498 20.36 6.70801 22 8.80701 22H15.194C17.293 22 19.046 20.359 19.185 18.266L19.936 7H21C21.552 7 22 6.553 22 6C22 5.447 21.552 5 21 5ZM9.72101 4L14.28 3.99902L14.596 4.94897C14.602 4.96697 14.611 4.982 14.618 5H9.38397C9.38997 4.982 9.40001 4.966 9.40601 4.948L9.72101 4ZM17.189 18.1331C17.119 19.1801 16.243 20 15.193 20H8.80603C7.75703 20 6.88 19.1801 6.81 18.1331L6.06897 7H6.55902C6.66602 7 6.77098 6.98598 6.87598 6.97498C6.91898 6.98098 6.95598 7 7.00098 7H17.001C17.045 7 17.083 6.97998 17.126 6.97498C17.231 6.98598 17.335 7 17.443 7H17.933L17.189 18.1331ZM15 11V16C15 16.553 14.552 17 14 17C13.448 17 13 16.553 13 16V11C13 10.447 13.448 10 14 10C14.552 10 15 10.447 15 11ZM11 11V16C11 16.553 10.552 17 10 17C9.448 17 9 16.553 9 16V11C9 10.447 9.448 10 10 10C10.552 10 11 10.447 11 11Z" fill="#A3A3A3"/>
        </svg>
    </div>
  )
}

export default ImgCart