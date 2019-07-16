import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class Tile extends Component {
  state = { clicked: false };

  deleteTile = () => {
    const action = {
      type: 'DELETE_TILE',
      tile: this.props.tile,
      page: this.props.page
    };
    this.props.dispatch(action);
  };

  confgureTile = () => {
    const { tile, page } = this.props;
    this.refs.overlay.hide();
    this.props.openModal({ tile, page });
  };

  render() {
    var editor = null;

    if (this.props.editMode) {
      editor = (
        <OverlayTrigger
          ref='overlay'
          trigger='click'
          placement='right'
          rootClose={true}
          overlay={
            <Popover id='popover-basic'>
              <ButtonGroup vertical aria-label='Basic example'>
                <Button variant='secondary' onClick={this.confgureTile}>
                  Configure
                </Button>
                <Button variant='secondary' onClick={this.deleteTile}>
                  Delete
                </Button>
              </ButtonGroup>
            </Popover>
          }>
          <Button variant='link' className='navbar-toggler toggler-example dots' />
        </OverlayTrigger>
      );
    }

    const Container = this.getComponent();

    return (
      <div
        className={this.props.className}
        style={this.props.style}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onTouchEnd={this.props.onTouchEnd}
        onTouchStart={this.props.onTouchStart}
        children={this.props.children}>
        {this.props.tile.type === 'Media Player' ? null : this.props.children}
        {editor}
        {Container ? <Container tile={this.props.tile} /> : null}
      </div>
    );
  }

  getComponent() {
    // debugger;
    if (this.props.config) {
      if (!this.props.tile.type) return null;
      const tiles = this.props.config.modules;
      const type = this.props.tile.type;

      const tile = tiles.find(tile => {
        return tile.name === type;
      });

      if (!tile) return;

      if (this.props.imports && this.props.imports[tile.file]) {
        return this.props.imports[tile.file];
      }

      const Temp = Loadable({
        loader: () => import(`../../modules/${tile.file}`),
        loading() {
          return <div>Loading...</div>;
        }
      });

      const action = {
        type: 'SAVE_IMPORTED_FILE',
        import: Temp,
        name: tile.file
      };
      this.props.dispatch(action);

      return Temp;
    }
  }
}

const mapStateToProps = state => {
  return {
    config: state.config,
    entities: state.entities,
    editMode: state.editMode,
    imports: state.imports
  };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(Tile);
