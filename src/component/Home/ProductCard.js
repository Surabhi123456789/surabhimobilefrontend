// import React from 'react'
// import StarRating from './StarRating';
// import { Link } from 'react-router-dom';


// const ProductCard = ({product}) => {
//   return (
//     <Link className='productCard' to={`/product/${product._id}`}>
//         <img src={product.images[0].url} alt={product.name} />
//         <p>{product.name}</p>
//          <div>
//          <StarRating 
//           value={product.ratings}  // Your rating value
//           size={window.innerWidth < 600 ? 20 : 25}
//           count={5}
//         />
//             <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
//          </div>
//          <span>{`₹ ${product.price}`}</span>
//     </Link>
//   )
// }

// export default ProductCard;



// import React from 'react'
// import StarRating from './StarRating';
// import { Link } from 'react-router-dom';

// const ProductCard = ({product}) => {
//   // Add safety check - if no product, don't render anything
//   if (!product) return null;

//   return (
//     <Link className='productCard' to={`/product/${product._id}`}>
//         <img 
//           src={product.images?.[0]?.url} // Add optional chaining here
//           alt={product.name} 
//           onError={(e) => {
//             // Fallback if image fails to load
//             e.target.src = 'https://placehold.co/300x300/gray/white?text=No+Image';
//           }}
//         />
//         <p>{product.name}</p>
//         <div>
//           <StarRating 
//             value={product.ratings || 0}  // Add fallback for ratings
//             size={window.innerWidth < 600 ? 20 : 25}
//             count={5}
//           />
//           <span className='productCardSpan'>
//             ({product.numOfReviews || 0} Reviews)
//           </span>
//         </div>
//         <span>{`₹ ${product.price}`}</span>
//     </Link>
//   )
// }

// export default ProductCard;

import React from 'react'
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, style }) => {
  // Add safety check - if no product, don't render anything
  if (!product) return null;

  return (
    <Link 
      className='productCard' 
      to={`/product/${product._id}`}
      style={style}
    >
      <img 
        src={product.images?.[0]?.url} 
        alt={product.name} 
        onError={(e) => {
          // Fallback if image fails to load
          e.target.src = 'https://placehold.co/300x300/f7fafc/667eea?text=No+Image';
        }}
        loading="lazy"
      />
      <p>{product.name}</p>
      <div>
        <StarRating 
          value={product.ratings || 0}
          size={window.innerWidth < 600 ? 20 : 25}
          count={5}
        />
        <span className='productCardSpan'>
          ({product.numOfReviews || 0} Reviews)
        </span>
      </div>
      <span>{`₹ ${product.price?.toLocaleString('en-IN') || product.price}`}</span>
    </Link>
  )
}

export default ProductCard;