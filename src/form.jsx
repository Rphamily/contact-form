import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import { Form, Icon, Button, Notification } from 'react-bulma-components';

export function SubscriberForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false
  });

  const [submitted, setSubmitted] = useState(false);

  const isValidUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Final validation check
    if (!isValidUsername(formData.username) || !isValidEmail(formData.email)) {
      setTouched({ username: true, email: true }); // show messages if skipped
      return;
    }

    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Notification color="success" style={{ marginTop: '1rem' }}>
        <strong>Thank you!</strong> We’ll get back to you in a few days.
      </Notification>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.Control>
          <Form.Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            color={
              touched.username
                ? isValidUsername(formData.username) ? 'success' : 'danger'
                : undefined
            }
          />
          <Icon align="left" size="small">
            <i className="fas fa-user" />
          </Icon>
          <Icon align="right" size="small">
            <i className={`fas ${
              touched.username
                ? isValidUsername(formData.username)
                  ? 'fa-check'
                  : 'fa-exclamation-triangle'
                : ''
            }`} />
          </Icon>
        </Form.Control>
        {touched.username && formData.username && (
          <Form.Help color={isValidUsername(formData.username) ? 'success' : 'danger'}>
            {isValidUsername(formData.username)
              ? 'Username looks good!'
              : 'Username must be alphanumeric with no symbols.'}
          </Form.Help>
        )}
      </Form.Field>

      <Form.Field>
        <Form.Label>Email</Form.Label>
        <Form.Control>
          <Form.Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            color={
              touched.email
                ? isValidEmail(formData.email) ? 'success' : 'danger'
                : undefined
            }
          />
          <Icon align="left" size="small">
            <i className="fas fa-envelope" />
          </Icon>
          <Icon align="right" size="small">
            <i className={`fas ${
              touched.email
                ? isValidEmail(formData.email)
                  ? 'fa-check'
                  : 'fa-exclamation-triangle'
                : ''
            }`} />
          </Icon>
        </Form.Control>
        {touched.email && formData.email && (
          <Form.Help color={isValidEmail(formData.email) ? 'success' : 'danger'}>
            {isValidEmail(formData.email)
              ? 'Email looks good!'
              : 'Please enter a valid email address.'}
          </Form.Help>
        )}
      </Form.Field>

      <Form.Field>
        <Form.Label>Subject</Form.Label>
        <Form.Control>
          <Form.Select name="subject" value={formData.subject} onChange={handleChange}>
            <option value="">Select a subject</option>
            <option value="general">General help</option>
            <option value="food">Help with food</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Message</Form.Label>
        <Form.Control>
          <Form.Textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field kind="group">
        <Form.Control>
          <Button color="link" type="submit">Submit</Button>
        </Form.Control>
        <Form.Control>
          <Button color="link" colorVariant="light" type="reset" onClick={() => {
            setFormData({ username: '', email: '', subject: '', message: '' });
            setTouched({ username: false, email: false });
          }}>
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
}
