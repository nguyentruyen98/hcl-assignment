import {Button, Col, Descriptions, Row} from 'antd';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants';
import useApi from 'hooks/useApi';
import {ITableColumnValue} from 'modules/home/index.d';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
const DetailEmployee = () => {
  let {id} = useParams();
  const navigate = useNavigate();

  const {data} = useApi({
    url: `${CONFIG.API.EMPLOYEE}/employee/${id}`,
    method: API_METHODS.GET,
    loadInitialState: true,
  });
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };
  if (data?.data) {
    const {
      employee_age,
      employee_name,
      employee_salary,
      id: employee_id,
    }: ITableColumnValue = data?.data;
    return (
      <>
        <Descriptions title="" bordered column={2}>
          <Descriptions.Item label="Id">{employee_id}</Descriptions.Item>
          <Descriptions.Item label="Employee name">
            {employee_name}
          </Descriptions.Item>
          <Descriptions.Item label="Employee age">
            {employee_age}
          </Descriptions.Item>
          <Descriptions.Item label="Employee salary">
            {employee_salary}
          </Descriptions.Item>
        </Descriptions>
        <Row justify="end" className="mt-10">
          <Col>
            <Button onClick={handleGoBack}>Back</Button>
          </Col>
        </Row>
      </>
    );
  }
  return <>Loading</>;
};

export default DetailEmployee;
