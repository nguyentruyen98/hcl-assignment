import {Button, Col, Input, Row} from 'antd';
import useForm from 'hooks/useForm';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';
import {
  useCreateEmployeeMutation,
  useLazyGetEmployeeQuery,
} from 'stores/api/employeeSlice';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [createEmployee, {}] = useCreateEmployeeMutation();
  const [getEmployee] = useLazyGetEmployeeQuery();
  const {formData, handleInputChange} = useForm({
    firstName: '',
    lastName: '',
    age: null,
  });
  const {firstName, lastName, age} = formData as {
    firstName: string;
    lastName: string;
    age: number;
  };
  const handleSubmit = async () => {
    await createEmployee({firstName, lastName, age});
    handleGoBack();
    await getEmployee();
  };
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <Row gutter={[12, 12]} justify="end">
        <Col span={24}>
          <Input
            placeholder="Type first name"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Type last name"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Type age"
            name="age"
            value={age}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Button onClick={handleGoBack}>Back</Button>
        </Col>{' '}
        <Col>
          <Button type="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateEmployee;
