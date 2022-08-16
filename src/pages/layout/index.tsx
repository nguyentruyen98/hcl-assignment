import './index.scss';

import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <div className="container">
        <Suspense fallback={<>Loading</>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
