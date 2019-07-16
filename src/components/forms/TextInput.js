import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class TextInput extends Component {
  render() {
    const { id, label, placeholder, value, onChange, text } = this.props;
    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        {text ? (
          <div>
            <Form.Text>{text}</Form.Text>
            <br />
          </div>
        ) : null}
        <Form.Control type="input" placeholder={placeholder} value={value} onChange={onChange} />
      </Form.Group>
    );
  }
}
export default TextInput;
