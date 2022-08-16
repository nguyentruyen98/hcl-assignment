import {Button, Col, Input, Row} from 'antd';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants/index';
import {Api} from 'hooks/useApi';
import useForm from 'hooks/useForm';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';

const CreateEmployee = () => {
  const navigate = useNavigate();

  const {formData, handleInputChange} = useForm({
    name: '',
    age: '',
    salary: '',
  });
  const {name, age, salary} = formData as {
    name: string;
    age: string;
    salary: string;
  };
  const handleSubmit = async () => {
    try {
      await Api({
        url: `${CONFIG.API.EMPLOYEE}/create`,
        method: API_METHODS.POST,
        data: formData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Row gutter={[12, 12]} justify="end">
      <Col span={24}>
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
      </Col>{' '}
      <Col>
        <Button type="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Col>
    </Row>
  );
};

export default CreateEmployee;
