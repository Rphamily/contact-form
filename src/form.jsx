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

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Username must be alphanumeric with no symbols.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log(formData);

    // Simulate sending form
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
            color={errors.username ? 'danger' : formData.username ? 'success' : undefined}
            value={formData.username}
            onChange={handleChange}
          />
          <Icon align="left" size="small">
            <i className="fas fa-user" />
          </Icon>
          <Icon align="right" size="small">
            <i className={`fas ${errors.username ? 'fa-exclamation-triangle' : 'fa-check'}`} />
          </Icon>
        </Form.Control>
        <Form.Help color={errors.username ? 'danger' : 'success'}>
          {errors.username || 'Username looks good!'}
        </Form.Help>
      </Form.Field>

      <Form.Field>
        <Form.Label>Email</Form.Label>
        <Form.Control>
          <Form.Input
            name="email"
            type="email"
            color={errors.email ? 'danger' : formData.email ? 'success' : undefined}
            value={formData.email}
            onChange={handleChange}
          />
          <Icon align="left" size="small">
            <i className="fas fa-envelope" />
          </Icon>
          <Icon align="right" size="small">
            <i className={`fas ${errors.email ? 'fa-exclamation-triangle' : 'fa-check'}`} />
          </Icon>
        </Form.Control>
        <Form.Help color={errors.email ? 'danger' : 'success'}>
          {errors.email || 'Email looks good!'}
        </Form.Help>
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
          <Button color="link" colorVariant="light" type="reset" onClick={() => setFormData({
            username: '',
            email: '',
            subject: '',
            message: ''
          })}>
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
}
