import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Multiselect from 'react-widgets/lib/Multiselect';

import TextInput from '../forms/TextInput';
import Checkbox from '../forms/Checkbox';
import Dropdown from '../forms/Dropdown';
import ColorPicker from '../forms/ColorPicker';
import Axios from 'axios';

class ConfigureModal extends Component {
  state = { ...this.props, entities: null };

  componentDidMount = () => {
    setTimeout(() => {
      Axios.get(`${this.props.config.homeAssistantAddress}/api/states`)
        .then(({ data }) => {
          const entities = [];
          data.map(entity => {
            return entities.push(entity.entity_id);
          });
          this.setState({ entities });
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  };

  componentWillReceiveProps = props => {
    if (props.tile && !props.tile.title) {
      props.tile.title = {
        visible: false
      };
    }

    if (props.tile && !props.tile.icon) {
      props.tile.icon = {
        visible: false,
        id: this.getRandomId()
      };
    }

    if (props.tile && !props.tile.graph) {
      props.tile.graph = {
        visible: false,
        id: this.getRandomId()
      };
    }

    if (props.tile && !props.tile.entities) props.tile.entities = [];

    this.setState({ ...props });
  };

  getRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  handleClose = () => {
    this.props.handleClose();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleClose(this.state);
    this.setState({ ...null });
  };

  updateTile = ({ key, value }) => {
    let tile = this.state.tile;
    _.set(tile, key, value);
    this.setState({ tile });
  };

  onChange = event => {
    // Multi Select
    if (Array.isArray(event)) {
      event = {
        target: {
          value: event,
          id: 'entities'
        }
      };
    }

    let value = event.target.value;
    let key = event.target.id;
    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }
    if (event.target.id === 'entity_id') {
      key = 'entities';
      value = [value];
    }
    this.updateTile({ key, value });
  };

  getModuleNames = () => {
    const { modules } = this.state.config;
    return modules.map(module => {
      return module.name;
    });
  };

  getSchema = type => {
    const { modules } = this.state.config;
    return modules.find(module => {
      return module.name === type;
    });
  };

  generateForm = () => {
    const { tile } = this.state;
    if (tile && tile.type) {
      this.getSchema(tile.type);
      const module = this.getSchema(tile.type);
      let form = [];
      module.schema.forEach(item => {
        switch (item.type) {
          case 'input':
            return form.push(
              <Row>
                <Col xs={12} md={6}>
                  <TextInput
                    {...{
                      id: item.id,
                      label: item.label,
                      text: item.description,
                      placeholder: item.placeholder,
                      value: tile[item.id],
                      onChange: this.onChange
                    }}
                  />
                </Col>
              </Row>
            );
          case 'checkbox':
            return form.push(
              <Row>
                <Col>
                  <Checkbox
                    {...{
                      id: item.id,
                      label: item.label,
                      checked: _.get(tile, item.id, false),
                      onChange: this.onChange
                    }}
                  />
                </Col>
              </Row>
            );
          case 'select':
            return form.push(
              <Row>
                <Col xs={12} md={6}>
                  <Dropdown
                    {...{
                      id: item.id,
                      label: item.label,
                      value: _.get(tile, item.id, ''),
                      onChange: this.onChange,
                      data: item.data
                    }}
                  />
                </Col>
              </Row>
            );
          case 'colorPicker':
            return form.push(
              <Row className='show-grid'>
                <Col xs={12} md={3}>
                  <ColorPicker id={item.id} label={item.label} onChange={this.onChange} color={`#${item.default}`} />
                </Col>
              </Row>
            );
          case 'entity_select':
            return form.push(
              <Row className='show-grid'>
                <Col xs={12} md={12}>
                  <Form.Label>Entities</Form.Label>
                  <Multiselect
                    data={this.state.entities}
                    disabled={(() => {
                      if (tile.entities.length > 0) {
                        const array = _.clone(this.state.entities);
                        array.splice(tile.entities[0]);
                        return array;
                      }
                    })()}
                    onChange={this.onChange}
                    defaultValue={tile.entities}
                  />
                </Col>
              </Row>
            );
          default:
          // throw new Error('Config Error');
        }
      });
      return form;
    }
    return <div />;
  };

  render() {
    const { tile, entities } = this.state;
    if (!entities || entities.length < 1) return null;
    const form = this.generateForm();

    return tile ? (
      <Modal show={this.props.show} onHide={this.handleClose} size='lg' scrollable={true} className='configure-modal'>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Configure Tile</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              // 'max-height': '4000px',
              maxHeight: 'calc(100vh - 210px)',
              overflowY: 'auto'
            }}>
            <Container>
              {tile && (
                // ----------------------------------
                // Title and Type

                <div>
                  <Row className='show-grid'>
                    <Col xs={12} md={6}>
                      <TextInput
                        {...{
                          id: 'title.value',
                          label: 'Title',
                          placeholder: 'Living Room Sensor',
                          value: tile.title.value,
                          onChange: this.onChange
                        }}
                      />
                    </Col>
                    <Col>
                      <Checkbox
                        {...{
                          id: 'title.visible',
                          label: 'Show Title',
                          checked: tile.title.visible,
                          onChange: this.onChange
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Dropdown
                        {...{
                          id: 'type',
                          label: 'Tile Type',
                          value: tile.type,
                          onChange: this.onChange,
                          data: this.getModuleNames()
                        }}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <br />
                      <Form.Text>See examples at: https://...</Form.Text>
                    </Col>
                  </Row>
                  <hr className='modal-body--separator' />
                </div>
              )}
              {form}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <input type='submit' value='Submit' color='primary' className='btn btn-primary' />
            <Button variant='secondary' onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    config: state.config
  };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(ConfigureModal);
