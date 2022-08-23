import {Button, Col, Input, Row} from 'antd';
import {CONFIG} from 'configs/index';
import {ALERT_TYPE, API_METHODS} from 'contants';
import {useToasts} from 'contexts/Toast';
import {Api} from 'hooks/useApi';
import useForm from 'hooks/useForm';
import {ITableColumnValue} from 'modules/home/index.d';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
const Edit = () => {
  const message = useToasts();
  const location = useLocation();
  let {id} = useParams();
  const navigate = useNavigate();
  const state = location.state as ITableColumnValue;
  const {firstName, lastName, email, university} = state;
  const {formData, handleInputChange} = useForm({
    firstNameForm: firstName,
    emailForm: email,
    lastNameForm: lastName,
    universityForm: university,
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
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
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
