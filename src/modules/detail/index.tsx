import {Button, Col, Descriptions, Row} from 'antd';
import Spin from 'components/spin';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants';
import useApi from 'hooks/useApi';
import {ITableColumnValue} from 'modules/home/index.d';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
const DetailEmployee = () => {
  let {id} = useParams();
  const navigate = useNavigate();

  const {data} = useApi({
    url: `${CONFIG.API.EMPLOYEE}/users/${id}`,
    method: API_METHODS.GET,
    loadInitialState: true,
  });
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  if (data) {
    const {
      id: employee_id,
      firstName,
      lastName,
      email,
      phone,
      university,
      address,
      company,
    }: ITableColumnValue = data;
    return (
      <>
        <Descriptions title="" bordered column={3}>
          <Descriptions.Item label="Id">{employee_id}</Descriptions.Item>
          <Descriptions.Item label="Employee name">
            {`${firstName} ${lastName}`}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
          <Descriptions.Item label="University" span={2}>
            {university}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={3}>
            {`${address.address} ${address.city}`}
          </Descriptions.Item>
          <Descriptions.Item label="Company" span={3}>
            {`${company.address.address} ${company.address.city}`}
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
  return <Spin />;
};

export default DetailEmployee;
