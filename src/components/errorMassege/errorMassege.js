import { Alert } from 'antd';
import React from 'react';

const ErrorMassege = () => (
  <>
    <Alert
      message="Error"
      description="Ошибка запроса"
      type="error"
      style={{ width: '90%', margin: '100px auto' }}
      showIcon
    />
  </>
);

export default ErrorMassege;
