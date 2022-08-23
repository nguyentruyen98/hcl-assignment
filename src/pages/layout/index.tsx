import './index.scss';

import Spin from 'components/spin/Spin';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'stores';

const Layout = () => {
  const applicationState = useSelector(state => state.application);
  return (
    <div className="layout">
      <div className="container">
        <Suspense fallback={<Spin />}>
          {applicationState.loading && <Spin />}
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
