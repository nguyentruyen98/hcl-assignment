import {Typography} from 'antd';
import DetailEmployee from 'modules/detail';
import React from 'react';
const {Title} = Typography;
const DetailPage = () => {
  return (
    <div>
      <Title>Detail Employee</Title>
      <DetailEmployee />
    </div>
  );
};

export default DetailPage;
