import './index.scss';

import Spin from 'components/spin/Spin';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <div className="container">
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
