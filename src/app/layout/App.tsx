import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { useLocation, useRoutes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if(commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app..'/>

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
        {
          path: "/errors",
          element: <TestErrors />
        },
        {
          path: "/server-error",
          element: <ServerError />
        },
        {
          path: "/login",
          element: <LoginForm />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },

  ]);

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Container style={{ marginTop: '7em' }}>
        <Routing key={location.key} />
      </Container>
    </>
  );
}

export default observer(App);
