import React, {ChangeEvent,useState} from 'react';

const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return {formData, handleInputChange};
};
export default useForm;
