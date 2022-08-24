import {Button, Col, Descriptions, Row} from 'antd';
import Spin from 'components/spin';
import Edit from 'modules/edit';
import {ITableColumnValue} from 'modules/home/index.d';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
import {useGetEmployeeDetailQuery} from 'stores/api/employeeSlice';

const DetailEmployee = () => {
  let {id = 0} = useParams();
  const {data} = useGetEmployeeDetailQuery(+id);

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
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
        {isEdit ? (
          <Edit
            employeeInfo={{email, firstName, lastName, university}}
            handleGoBack={handleEdit}
          />
        ) : (
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
            <Row justify="end" className="mt-10" gutter={[10, 0]}>
              <Col>
                <Button onClick={handleGoBack}>Back</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={handleEdit}>
                  Edit employee
                </Button>
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
  return <Spin />;
};

export default DetailEmployee;
