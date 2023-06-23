import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs , query , where } from 'firebase/firestore';
import {auth ,  firestore } from './firebase';

const LandingPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);
const user = auth.currentUser.uid;
  const fetchProjects = async () => {
   
    try {
      // const adminsCollection = collection(firestore, 'admins');
      const adminsCollection = collection(firestore, `admins/${user}/projects`);
      const adminProjectsQuery = query(adminsCollection, where('ID', '==', user));
      // console.log(user);
      const querySnapshot = await getDocs(adminProjectsQuery);
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      setProjects(projectData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleClick = () => {
    console.log('Button clicked!');
    navigate('/admin/proj');
  };

  return (
    <div>
      <h1>Welcome to the Admin Portal Page</h1>
      <button onClick={handleClick}>Click me!</button>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="card">
            <h3>NAME : {project.name}</h3>
            <p>DESCRIPTION : {project.description}</p>
            {/* <p>Start Date: {project.startDate}</p>
            <p>End Date: {project.endDate}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;





// import React from 'react';
// import { Link} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import VerticallyCenteredModal from './VerticallyCenteredModal';
// const LandingPage = () => {
//   const navigate=useNavigate();
//   const handleClick = () => {
//     console.log('Button clicked!');
//   navigate("/admin/proj");
//     // <VerticallyCenteredModal/>
    
//   };

//   return (
//     <button onClick={handleClick}>
//       Click me!
//     </button>


//   );
// };
// export default LandingPage;
