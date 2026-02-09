// Import React and the useState hook for managing component state
import React, { useState } from 'react'

// Import Bootstrap components for styling the form
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Login component receives props from parent (login function, history)
const Login = props => {

  // State to store the entered username
  const [name, setName] = useState("")

  // State to store the entered user ID
  const [id, setId] = useState("")

  // Handler for username input changes
  const onChangeName = e => {
    const name = e.target.value
    setName(name)
  }

  // Handler for ID input changes
  const onChangeId = e => {
    const id = e.target.value
    setId(id)
  }

  // Login function triggered when the Submit button is clicked
  const login = () => {
    // Call the login function passed in via props
    // Sends the user name and ID to the parent component
    props.login({ name: name, id: id })

    // Redirect the user to the home page after login
    props.history.push('/')
  }

  return (
    <div>
      {/* Login form */}
      <Form>

        {/* Username input field */}
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>

        {/* User ID input field */}
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter id"
            value={id}
            onChange={onChangeId}
          />
        </Form.Group>

        {/* Submit button triggers login */}
        <Button variant="primary" onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

// Export component for use in other parts of the app
export default Login
