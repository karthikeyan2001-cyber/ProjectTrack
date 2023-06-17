import React from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VerticallyCenteredModal from './VerticallyCenteredModal';
const LandingPage = () => {
  const navigate=useNavigate();
  const handleClick = () => {
    console.log('Button clicked!');
  navigate("/admin/proj");
    // <VerticallyCenteredModal/>
    
  };

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
};


//   return (
//     <div>
//       <h1>Welcome to the Admin Portal Page</h1>
      
//     </div>
//   );
// };

export default LandingPage;
