import {Typography} from 'antd';
import Edit from 'modules/edit';
import React from 'react';
const {Title} = Typography;
const EditPage = () => {
  return (
    <>
      <Title>Edit Employee</Title>
      <Edit />
    </>
  );
};

export default EditPage;
