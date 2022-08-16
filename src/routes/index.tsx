import Layout from 'pages/layout';
import {lazy} from 'react';
import {useRoutes} from 'react-router-dom';
import WapperRouteComponent from 'routes/config';
import {ROUTES} from 'routes/routes';

const HomePage = lazy(() => import('pages/home'));
const EditPage = lazy(() => import('pages/edit'));
const CreateEmployeePage = lazy(() => import('pages/create'));
const DetailPage = lazy(() => import('pages/detail'));
const NotFoundPage = lazy(() => import('pages/404'));

const element = {
  path: '',
  element: <Layout />,
  children: [
    {
      path: ROUTES.HOME,
      element: <WapperRouteComponent element={<HomePage />} title="Home" />,
    },
    {
      path: ROUTES.EDIT,
      element: <WapperRouteComponent element={<EditPage />} title="Edit" />,
    },
    {
      path: ROUTES.DETAIL,
      element: <WapperRouteComponent element={<DetailPage />} title="Detail" />,
    },
    {
      path: ROUTES.CREATE,
      element: (
        <WapperRouteComponent
          element={<CreateEmployeePage />}
          title="Create Employee"
        />
      ),
    },
    {
      path: ROUTES.NOT_FOUND,
      element: (
        <WapperRouteComponent element={<NotFoundPage />} title="Not Found" />
      ),
    },
  ],
};

const RenderRouter = () => {
  const elements = useRoutes([element]);
  return elements;
};
export default RenderRouter;
