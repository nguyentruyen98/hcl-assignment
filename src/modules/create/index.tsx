import {Button, Col, Input, Row} from 'antd';
import Spin from 'components/spin/Spin';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants/index';
import {Api} from 'hooks/useApi';
import useForm from 'hooks/useForm';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';
import {error, success} from 'utils/message';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await Api({
        url: `${CONFIG.API.EMPLOYEE}/users/add`,
        method: API_METHODS.POST,
        data: JSON.stringify(formData),
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
      {' '}
      {loading && <Spin />}
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