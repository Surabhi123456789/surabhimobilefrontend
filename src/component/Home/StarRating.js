// import React from 'react';

// const StarRating = ({ value, count = 5, size = 25 }) => {
//   const getStarFill = (position) => {
//     const decimal = value - Math.floor(value);
//     if (position <= Math.floor(value)) return 100;
//     if (position === Math.ceil(value)) return decimal * 100;
//     return 0;
//   };

//   // Calculate responsive size based on viewport
//   const getResponsiveSize = () => {
//     return window.innerWidth < 600 ? '1.5vmax' : '1.8vmax';
//   };

//   return (
//     <div style={{ 
//       display: 'flex', 
//       flexDirection: 'row', 
//       gap: '0.2vmax',
//       alignItems: 'center'
//     }}>
//       {[...Array(count)].map((_, index) => (
//         <div 
//           key={index} 
//           style={{ 
//             position: 'relative',
//             width: getResponsiveSize(), 
//             height: getResponsiveSize(),
//             display: 'inline-block'
//           }}
//         >
//           {/* Background star (gray) */}
//           <svg
//             fill="rgba(20,20,20,0.1)"
//             viewBox="0 0 24 24"
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               left: 0,
//               top: 0
//             }}
//           >
//             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//           </svg>
//           {/* Filled star (tomato color) */}
//           <svg
//             fill="tomato"
//             viewBox="0 0 24 24"
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               left: 0,
//               top: 0,
//               clipPath: `inset(0 ${100 - getStarFill(index + 1)}% 0 0)`
//             }}
//           >
//             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//           </svg>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StarRating;


import React, { useState } from 'react';

const StarRating = ({ value, count = 5, size = 25, onChange, editable = false }) => {
  const [currentRating, setCurrentRating] = useState(value);
  const [hoverRating, setHoverRating] = useState(0);

  const getStarFill = (position) => {
    const ratingToUse = editable ? 
      (hoverRating || currentRating) : 
      value;

    const decimal = ratingToUse - Math.floor(ratingToUse);
    if (position <= Math.floor(ratingToUse)) return 100;
    if (position === Math.ceil(ratingToUse)) return decimal * 100;
    return 0;
  };

  const handleStarClick = (selectedRating) => {
    if (editable) {
      setCurrentRating(selectedRating);
      if (onChange) onChange(selectedRating);
    }
  };

  const getResponsiveSize = () => {
    return window.innerWidth < 600 ? '1.5vmax' : '1.8vmax';
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      gap: '0.2vmax',
      alignItems: 'center'
    }}>
      {[...Array(count)].map((_, index) => (
        <div 
          key={index} 
          style={{ 
            position: 'relative',
            width: getResponsiveSize(), 
            height: getResponsiveSize(),
            display: 'inline-block',
            cursor: editable ? 'pointer' : 'default'
          }}
          onClick={() => handleStarClick(index + 1)}
          onMouseEnter={() => editable && setHoverRating(index + 1)}
          onMouseLeave={() => editable && setHoverRating(0)}
        >
          <svg
            fill="rgba(20,20,20,0.1)"
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0
            }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <svg
            fill="tomato"
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              clipPath: `inset(0 ${100 - getStarFill(index + 1)}% 0 0)`
            }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default StarRating;