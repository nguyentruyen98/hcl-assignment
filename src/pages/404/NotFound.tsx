import {Button} from 'antd';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'routes/routes';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <div>
      <p>NotFound</p>
      <Button onClick={handleGoBack}>Back to Homepage</Button>
    </div>
  );
};

export default NotFound;
