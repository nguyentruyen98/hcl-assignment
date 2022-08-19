import './Spin.scss';

import {Spin as AntSpin} from 'antd';
import React from 'react';
const Spin = () => {
  return (
    <div className="spin">
      <AntSpin />
    </div>
  );
};

export default Spin;
