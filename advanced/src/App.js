// import logo from './logo.svg';
import "./App.css";
import Form from "./Components/Form";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import schema from "./Components/Schema";
const initialValues = {
  // text inputs

  username: "",
  email: "",
  password: "",

  // checkbox
  terms: false,
};

const initialValueErrors = {
  username: "",
  email: "",
  password: "",
};

const initialMembers = [];
const initialDisabled = true;

function App() {
  // states
  const [members, setMemebers] = useState(initialMembers);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValueErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [memberList, setList] = useState([]);

  const getMembers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewMemeber = (newMember) => {
    axios
      .post("https://reqres.in/api/users", newMember)
      .then((res) => {
        setMemebers([...members, res.data]);
        setFormValues(initialValues);
      })
      .catch((err) => console.log(err));
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const formSubmit = () => {
    const newMember = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ["terms"].filter((term) => formValues[term]),
    };
    postNewMemeber(newMember);
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <h1>New User</h1>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
       <div>
        {members.map((use) => {
          return (
            <div key={use.id}>
              <h2>{use.username}</h2>
              <h3>{use.email}</h3>
              
            </div>
           
          );
        
        })}
      </div>

      <div>
        {memberList.map((use) => {
          return (
            <div key={use.id}>
              <h2>{use.first_name}</h2>
              <h3>{use.email}</h3>
              
            </div>
           
          );
        
        })}
      </div>
    </div>
  );
}

export default App;
