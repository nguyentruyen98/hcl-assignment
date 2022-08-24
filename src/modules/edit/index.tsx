import {Button, Col, Input, Row} from 'antd';
import useForm from 'hooks/useForm';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
import {
  useLazyGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from 'stores/api/employeeSlice';

interface IEditProps {
  employeeInfo: {
    firstName: string;
    lastName: string;
    email: string;
    university: string;
  };
  handleGoBack: () => void;
}

const Edit = ({employeeInfo, handleGoBack}: IEditProps) => {
  const [updateEmployee, {}] = useUpdateEmployeeMutation();
  let {id = 0} = useParams();
  const navigate = useNavigate();
  const [getEmployee] = useLazyGetEmployeeQuery();

  const {formData, handleInputChange} = useForm({
    firstNameForm: employeeInfo.firstName,
    emailForm: employeeInfo.email,
    lastNameForm: employeeInfo.lastName,
    universityForm: employeeInfo.university,
  });
  const {firstNameForm, lastNameForm, universityForm, emailForm} = formData as {
    firstNameForm: string;
    lastNameForm: string;
    universityForm: string;
    emailForm: string;
  };
  const handleSubmit = async () => {
    await updateEmployee({
      firstName: firstNameForm,
      lastName: lastNameForm,
      email: emailForm,
      university: universityForm,
      id: +id,
    });
    navigate(ROUTES.HOME);
    await getEmployee();
  };

  return (
    <>
      <Row gutter={[12, 12]} justify="end">
        <Col span={12}>
          <Input
            placeholder="Type first name"
            name="firstNameForm"
            value={firstNameForm}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Type last name"
            name="lastNameForm"
            value={lastNameForm}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Type email"
            name="emailForm"
            value={emailForm}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Type university"
            name="universityForm"
            value={universityForm}
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
    </>
  );
};

export default Edit;
