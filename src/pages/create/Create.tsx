import {Typography} from 'antd';
import CreateEmployee from 'modules/create';
import React from 'react';
const {Title} = Typography;

const CreateEmployeePage = () => {
  return (
    <>
      <Title>Create Employee</Title>
      <CreateEmployee />
    </>
  );
};

export default CreateEmployeePage;
