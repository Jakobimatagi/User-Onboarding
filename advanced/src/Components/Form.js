import React from 'react'

export default function memberForm(props){

    const{
        values,
        submit,
        change,
        disabled,
        errors
    } = props
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    const onChange = evt => {
        const {name, value, type, checked} = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }
    
    
    return(
        <form onSubmit={onSubmit}>
            <button disabled={disabled}>Submit</button>

            <div>
                <div>{errors.password}</div>
                <div>{errors.email}</div>
            </div>
            <label>Username
                <input 
                    value={values.username}
                    onChange={onChange}
                    name='username'
                    type='text'
                />
            </label>

            <label>Email
                <input
                 value={values.email}
                 onChange={onChange}
                 name='email'
                 type='text'
                />
            </label>
            
            <label>Password
                <input 
                value={values.password}
                onChange={onChange}
                name='password'
                type='text'
                />
            </label>

            <label>Terms and Conditions
                <input 
                type='checkbox'
                name='terms'
                value='check'
                checked={values.terms}
                onChange={onChange}
                />
            </label>

        
    
        </form>
    )
}


