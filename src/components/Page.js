import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tiles/Tile';
import ConfigureModal from './modals/ConfigureModal';
import GridLayout from 'react-grid-layout';

class Page extends Component {
  state = {
    showModal: false,
    tile: null,
    page: null,
    colours: {
      primary: '#EEF85B',
      secondary: '#09E5C3',
      background: '#202020'
    }
  };

  handleClose = result => {
    if (result) {
      const action = {
        type: 'UPDATE_TILE',
        tile: result.tile,
        page: result.page
      };

      this.props.dispatch(action);
    }
    this.setState({ showModal: false, tile: null, page: null });
  };

  openModal = ({ tile, page, callback }) => {
    this.setState({ showModal: true, tile, page });
  };

  onLayoutChange = layout => {
    const action = {
      type: 'SAVE_LAYOUT',
      layout,
      page: this.props.page
    };

    this.props.dispatch(action);
  };

  onDragStart = () => {
    // This disables default scrolls on touch screens when resizing or moving boxes
    document.ontouchmove = function(e) {
      e.preventDefault();
    };
  };

  onDragStop = () => {
    // This reactivates default scrolling behavior on touch screens after resizing or moving boxes
    document.ontouchmove = function() {
      return true;
    };
  };

  render() {
    const tiles = this.props.page.tiles;

    if (!tiles) return null;

    return (
      <div>
        <div>
          <GridLayout
            className='layout'
            width={1024}
            cols={6}
            margin={[4, 4]}
            onLayoutChange={this.onLayoutChange}
            onDragStart={this.onDragStart}
            onDragStop={this.onDragStop}
            onResizeStart={this.onDragStart}
            onResizeStop={this.onDragStop}
            rowHeight={170}>
            {tiles.map(tile => {
              return (
                <Tile
                  data-grid={{ i: tile.i, x: tile.x, y: tile.y, h: tile.h, w: tile.w }}
                  className='dragable-tile'
                  key={tile.i}
                  tile={tile}
                  page={this.props.page}
                  openModal={this.openModal}
                  // onDragStart={this.onDragStart}
                  // onDragStop={this.onDragStop}
                  // onResizeStart={this.onDragStart}
                  // onResizeStop={this.onDragStop}
                  // onMouseDown={this.onDragStart}
                  // onMouseUp={this.onDragStop}
                  // onTouchEnd={this.onDragStop}
                  // onTouchStart={this.onDragStart}
                />
              );
            })}
          </GridLayout>
          <ConfigureModal
            show={this.state.showModal}
            handleClose={this.handleClose}
            tile={this.state.tile}
            page={this.state.page}
          />
        </div>
        <div>
          <svg
            // style={'width=0''width:0;height:0;position:absolute;'}
            aria-hidden='true'
            focusable='false'>
            <linearGradient id='gradient' y1='0' y2='1'>
              <stop stopColor={this.state.colours.primary} offset='0' />
              <stop stopColor={this.state.colours.secondary} offset='1' />
            </linearGradient>
            <linearGradient id='gradientFill' gradientTransform='rotate(90)'>
              <stop stopColor={this.state.colours.secondary} offset='0' />
              <stop stopColor={this.state.colours.background} offset='0.9' />
            </linearGradient>
          </svg>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { pages: state.pages, editMode: state.editMode };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(Page);
