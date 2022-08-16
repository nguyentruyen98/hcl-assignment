import {Button, Col, Input, Row} from 'antd';
import useForm from 'hooks/useForm';
import {ITableColumnValue} from 'modules/home/index.d';
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {ROUTES} from 'routes/routes';

interface ILocationState {
  state: ITableColumnValue;
}

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ITableColumnValue;
  const {employee_age, employee_name, employee_salary, id: employee_id} = state;
  const {formData, handleInputChange} = useForm({
    id: employee_id,
    name: employee_name,
    age: employee_age,
    salary: employee_salary,
  });
  const {name, age, salary, id} = formData as {
    name: string;
    age: string;
    salary: string;
    id: number;
  };
  const handleSubmit = () => {};
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Row gutter={[12, 12]} justify="end">
      <Col span={4}>
        <Input
          placeholder="Typpe name..."
          name="id"
          value={id}
          onChange={handleInputChange}
          disabled={true}
        />
      </Col>
      <Col span={20}>
        <Input
          placeholder="Typpe name..."
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </Col>
      <Col span={12}>
        <Input
          placeholder="Typpe age..."
          name="age"
          value={age}
          onChange={handleInputChange}
        />
      </Col>
      <Col span={12}>
        <Input
          placeholder="Typpe salary..."
          name="salary"
          value={salary}
          onChange={handleInputChange}
        />
      </Col>
      <Col>
        <Button onClick={handleGoBack}>Back</Button>
      </Col>
      <Col>
        <Button type="primary" onClick={handleSubmit}>
          Change
        </Button>
      </Col>
    </Row>
  );
};

export default Edit;
