import {Button, Col, Row, Typography} from 'antd';
import Home from 'modules/home';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';

const {Title} = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const handleCreateEmployee = () => {
    navigate(ROUTES.CREATE);
  };
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title>Employee List</Title>
        </Col>
        <Col>
          <Button onClick={handleCreateEmployee}>Add Employee</Button>
        </Col>
      </Row>
      <Home />
    </div>
  );
};

export default HomePage;
