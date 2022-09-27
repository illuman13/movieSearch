import { Alert } from 'antd';
import React from 'react';

const ErrorOffline = () => (
  <>
    <Alert
      message="Error"
      description="Отсутсвует подключение к интернету"
      type="error"
      style={{ width: '90%', margin: '100px auto' }}
      showIcon
    />
  </>
);

export default ErrorOffline;
