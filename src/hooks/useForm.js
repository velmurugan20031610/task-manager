import { useState } from "react";


export default function useForm(initialValues, validate) {
const [values, setValues] = useState(initialValues);
const [errors, setErrors] = useState({});


const handleChange = (e) => {
const { name, value } = e.target;
setValues((v) => ({ ...v, [name]: value }));
};


const handleSubmit = (onValid) => (e) => {
e.preventDefault();
const err = validate(values);
setErrors(err);
if (Object.keys(err).length === 0) onValid(values);
};


return { values, errors, handleChange, handleSubmit, setValues };
}