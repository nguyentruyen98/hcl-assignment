import {Button, Col, Input, Row} from 'antd';
import {CONFIG} from 'configs/index';
import {ALERT_TYPE, API_METHODS} from 'contants';
import {useToasts} from 'contexts/Toast';
import {Api} from 'hooks/useApi';
import useForm from 'hooks/useForm';
import {useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';

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
  const message = useToasts();
  let {id} = useParams();
  const navigate = useNavigate();
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
  const handleSubmit = () => {
    try {
      const data = {
        firstName: firstNameForm,
        lastName: lastNameForm,
        university: universityForm,
        email: emailForm,
      };
      Api({
        url: `${CONFIG.API.EMPLOYEE}/users/${id}`,
        method: API_METHODS.PUT,
        data: JSON.stringify(data),
      });
      message('Success', ALERT_TYPE.SUCCESS);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log(err);
      message('Fail', ALERT_TYPE.FAIL);
    } finally {
    }
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
