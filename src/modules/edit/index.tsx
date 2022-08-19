import {Button, Col, Input, Row} from 'antd';
import Spin from 'components/spin/Spin';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants';
import {Api} from 'hooks/useApi';
import useForm from 'hooks/useForm';
import {ITableColumnValue} from 'modules/home/index.d';
import {useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
import {error, success} from 'utils/message';

const Edit = () => {
  const location = useLocation();
  let {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      success();
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log(err);
      error();
    } finally {
      setLoading(false);
    }
  };
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <>
      {loading && <Spin />}
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
