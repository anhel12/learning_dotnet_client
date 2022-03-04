import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { useLocation, useRoutes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {

  const location = useLocation();

  const Routing = () => useRoutes([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/",
      element: <NavBar />,
      children: [
        { 
          path: "createActivity", 
          element: <ActivityForm /> 
        },
        { 
          path: "manage/:id", 
          element: <ActivityForm /> 
        },
        {
          path: "activities",
          element: <ActivityDashboard />,
        },
        { 
          path: "activities/:id", 
          element: <ActivityDetails /> 
        },
        { 
          path: "activities/:id", 
          element: <ActivityDetails /> 
        },
      ]
    },
    
  ]);
  
  return (
    <>
      <Container style={{marginTop: '7em'}}>
        <Routing key={location.key} />
      </Container>
    </>
  );
}

export default observer(App);
