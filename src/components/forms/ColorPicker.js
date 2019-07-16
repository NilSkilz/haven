import React, { Component } from 'react';
import reactCSS from 'reactcss';
import Form from 'react-bootstrap/Form';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  state = { color: this.props.color, displayColorPicker: false };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    this.props.onChange({
      target: {
        id: this.props.id,
        value: this.state.color
      }
    });
  };

  handleChange = color => {
    this.setState({ color: color.hex });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '46px',
          height: '34px',
          borderRadius: '10px',
          background: `${this.state.color}`
        }
      }
    });
    const { id, label } = this.props;
    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <div>
          <div onClick={this.handleClick} className={'swatch'}>
            <div style={styles.color} />
          </div>
          {this.state.displayColorPicker ? (
            <div className={'popover'}>
              <div className={'cover'} onClick={this.handleClose} />
              <SketchPicker color={this.state.color} onChange={this.handleChange} />
            </div>
          ) : null}
        </div>
      </Form.Group>
    );
  }
}

export default ColorPicker;
