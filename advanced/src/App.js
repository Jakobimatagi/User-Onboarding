// import logo from './logo.svg';
import './App.css';
import Form from './Components/Form'
import * as yup from 'yup'
import axios from 'axios'
import {useState, useEffect} from 'react'
import schema from './Components/Schema'
const initialValues ={
  // text inputs

  username: '',
  email: '',
  password: '',

// checkbox
  terms: false,
}

const initialValueErrors = {
  username: '',
  email: '',
  password: '',
}

const initialMembers = [];
const initialDisabled = true;




function App() {
  // states
  const [members, setMemebers] =useState(initialMembers);
  const [formValues, setFormValues] =useState(initialValues);
  const [formErrors, setFormErrors] =useState(initialValueErrors);
  const [disabled, setDisabled] =useState(initialDisabled);

  const getMembers = () => {
    axios
  .get('https://reqres.in/api/users')
  .then((res)=>{
    setMemebers(res.data)
  })
  .catch(err =>{
    console.log(err)
  })
}

  const postNewMemeber = newMember => {
    axios
    .post('https://reqres.in/api/users', newMember)
    .then((res)=>{
      setMemebers([res.data, ...members]);
      setFormValues(initialValues)
    })
    .catch(err=> console.log(err))
  }

  const inputChange = (name, value) =>{
    yup
    .reach(schema, name)
    .validate(value)
    .then(()=>{
      setFormErrors({
      ...formErrors,[name]: ''})
    })
    .catch((err=>{
      setFormErrors({
        ...formErrors,[name]: err.errors[0]
      })
    }))
    
    setFormValues({
    ...formValues, [name]: value
  })

  }
  const formSubmit = () => {
    const newMember = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['terms'].filter(
        term => formValues[term]
      )
    };
    postNewMemeber(newMember)
  }


  useEffect(() => {
    getMembers()
  }, [])

  useEffect(() =>{
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  
  return (
    <div className="App">
      <h1>New User</h1>

      <Form values={formValues} change={inputChange} submit={formSubmit} disabled={disabled} errors={formErrors}/>


    {
      members.map(member =>{
        return(
          <member key={member.id} details={member} />
        )
      })
    }
    
    </div>



    
  );


}

export default App;
