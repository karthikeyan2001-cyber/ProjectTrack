import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { collection, getDocs,doc,getDoc, query, where} from 'firebase/firestore';
import { auth, firestore} from './firebase';
// import firebase from 'firebase/compat/app';
// import app from './firebase';
// import firebase from 'firebase/app';
import 'firebase/firestore';


const LandingPage = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Retrieve user's email after successful login
    const userEmail = auth.currentUser;

    // Perform the query to fetch projects based on user's email
    const fetchProjects = async () => {
      const adminsQuery = query(collection(firestore, 'admins'));

      try {
        const adminsSnapshot = await getDocs(adminsQuery);

        const projectsPromises = adminsSnapshot.docs.map(async (adminDoc) => {
          const projectsQuery = query(collection(adminDoc.ref, 'projects'), where('users_email', '==', userEmail.email));
          const projectsSnapshot = await getDocs(projectsQuery);

          return projectsSnapshot.docs.map((projectDoc) => projectDoc.data());
        });

        const projectsData = await Promise.all(projectsPromises);
        const userProjects = projectsData.flat();
        setProjects(userProjects);
      } catch (error) {
        console.log('Error fetching projects:', error);
      }

  
    };
    const checkAdminLoginStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const adminSnapshot = await getDoc(doc(firestore, 'admins', user.uid));
        setIsAdminLoggedIn(adminSnapshot.exists());
      }else {
        navigate('/user/login'); 
      }
    };

    fetchProjects();
    checkAdminLoginStatus();
  }, [navigate,setIsAdminLoggedIn]);

//   const fetchAssignedProjects = async () => {
//     try {
//       const user = auth.currentUser;
//       const assignedProjectsQuery = query(collection(firestore, `admins/${user}/projects`), where('assignedUserEmail', '==', user.email));
//       const querySnapshot = await getDocs(assignedProjectsQuery);
//       const assignedProjectsData = querySnapshot.docs.map((doc) => doc.data());
//       setAssignedProjects(assignedProjectsData);
//     } catch (error) {
//       console.error('Error fetching assigned projects:', error);
//     }
//   };

  return (
    <div>
      <h1>Welcome to the User Portal Page</h1>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            {/* <p>Start Date: {project.startDate}</p>
            <p>End Date: {project.endDate}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;













// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs , query , where } from 'firebase/firestore';
// import {auth ,  firestore } from './firebase';





// const LandingPage = () => {


//   return (
//     <div>
//       <h1>Welcome to the User Portal Page</h1>

//     </div>
//   );
// };

// export default LandingPage;

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { auth, firestore } from './firebase';

// const LandingPage = () => {
//   const [assignedProjects, setAssignedProjects] = useState([]);

//   useEffect(() => {
//     fetchAssignedProjects();
//   }, []);

//   const fetchAssignedProjects = async () => {
//     try {
//       const user = auth.currentUser;
//       const assignedProjectsQuery = query(collection(firestore, 'admins'), where('/admins/OSn2SE7uzjSI53YxHR6nR6ib0nV2/projects/users_email', '==', user.email));
//       const querySnapshot = await getDocs(assignedProjectsQuery);
//       const assignedProjectsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setAssignedProjects(assignedProjectsData);
//     } catch (error) {
//       console.error('Error fetching assigned projects:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to the User Portal Page</h1>
//       <div>
//         {assignedProjects.map((project) => (
//           <div key={project.id} className="card">
//             <h3>{project.name}</h3>
//             <p>{project.description}</p>
//             <p>Start Date: {project.startDate}</p>
//             <p>End Date: {project.endDate}</p>
//             <p>Status: {project.status}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
