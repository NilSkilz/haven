import React, { Component } from 'react';
import { connect } from 'react-redux';
import Websocket from 'react-websocket';
import { Router, Switch, Route } from 'react-router-dom';
import Page from './components/Page';
import './App.css';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

class App extends Component {
  state = { haven: null, views: [], menuOpen: false };

  //	Constructor
  //--------------------------------------------------------//
  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
      isLoading: false,
      hasLoaded: false,
      hasErrored: false,
      ws: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }

  //	Sockets
  //--------------------------------------------------------//
  wsData = data => {
    const res = JSON.parse(data);
    switch (res.type) {
      case 'auth_required':
        this.wsAuth();
        break;
      case 'auth_ok':
        this.wsSubscribe();
        break;
      case 'event':
        this.props.dispatch({ type: 'UPDATE_ENTITY', entity: res.event.data });
        break;
      default:
        this.setState({ ws: res });
        break;
    }
  };

  wsAuth = () => {
    this.wsSend({
      type: 'auth',
      access_token: this.state.haven && this.state.haven.longLivedAccessToken
    });
  };

  wsSubscribe = () => {
    this.wsSend({
      id: 1,
      type: 'subscribe_events'
    });
  };

  wsSend = message => {
    this.ws.sendMessage(JSON.stringify(message));
  };

  //	Load JSON Config File
  //--------------------------------------------------------//
  loadData = () => {
    console.log('fetching...');
    fetch('./haven.json')
      .then(response => response.text())
      .then(json => {
        const config = JSON.parse(json);
        console.log(config);

        const action = {
          type: 'UPDATE_CONFIG',
          config
        };

        this.props.dispatch(action);
        this.setState({ haven: config.haven });

        //  Set Redux Store Config
        //--------------------------------------------------------//
        // this.props.dispatch(setConfig(config));
      })
      .catch(error => {
        console.error(error);
        alert('Error loading config file');
      });
  };

  addTile = () => {
    const action = {
      type: 'ADD_TILE',
      pageID: this.props.pages[0].id
    };
    this.props.dispatch(action);
    this.setState({ pages: this.props.pages });
  };

  toggleEditMode = () => {
    this.props.dispatch({ type: 'TOGGLE_EDIT_MODE' });
  };

  openMenu = event => {
    event.preventDefault();
    this.setState({ menuOpen: true });
  };

  menuStateChange = state => {
    if (!state.isOpen) this.setState({ menuOpen: false });
  };

  //	Render
  //--------------------------------------------------------//
  render() {
    var editor = null;

    if (this.props.editMode) {
      editor = (
        <div id='navbar-editor' className='align-middle'>
          <Button id='navbar-add-tile' variant='outline-success' onClick={this.addTile}>
            Add Tile
          </Button>
          <Button variant='outline-success' onClick={this.toggleEditMode} className='ml-2'>
            Done
          </Button>
        </div>
      );
    } else {
      editor = (
        <Button variant='link' id='navbar-toggler' className=' m-0 align-middle' onClick={this.toggleEditMode} />
      );
    }

    return (
      <div>
        {/* <Menu
          left
          isOpen={this.state.menuOpen}
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          onStateChange={this.menuStateChange}>
          <a id='home' className='menu-item' href='/'>
            Home
          </a>
          <a id='about' className='menu-item' href='/about'>
            About
          </a>
          <a id='contact' className='menu-item' href='/contact'>
            Contact
          </a>
          <a onClick={this.showSettings} className='menu-item--small' href=''>
            Settings
          </a>
        </Menu> */}
        <main id={'page-wrap'}>
          <div className='App'>
            <Navbar
              id='navbar'
              bg='light'
              expand='lg'
              className='navbar navbar-dark w-100 d-flex justify-content-between'>
              {/* <div className='col-4' id='navbar-left'>
                <Button id='navbar-menu' variant='outline-success' onClick={this.openMenu} />
              </div> */}
              {/* <div id='navbar-center' className='col-4'> */}
              {/* <p className='navbar-text' id='header'> */}
              <div />
              <div>
                <p className='navbar-text' id='header'>
                  haven
                </p>
              </div>
              <div>{editor}</div>
              {/* </div> */}
              {/* <div className='col-4' id='navbar-right'> */}
              {/* {editor} */}
              {/* </div> */}
            </Navbar>
            <section>
              <Router history={this.props.history}>
                <Route
                  render={({ location }) => {
                    return (
                      <Route
                        location={location}
                        render={() => (
                          <Switch>
                            {this.props.pages &&
                              this.props.pages.map(page => {
                                return (
                                  <Route
                                    location={window.location}
                                    key={page.name}
                                    // exact
                                    path={page.path}
                                    view={page}
                                    render={props => {
                                      return <Page key={page.id} page={page} />;
                                    }}
                                  />
                                );
                              })}
                          </Switch>
                        )}
                      />
                    );
                  }}
                />
              </Router>
            </section>
            {this.state.haven ? (
              <Websocket
                url={`${this.state.haven.homeAssistantAddress.replace('https', 'wss')}/api/websocket/`}
                onMessage={this.wsData}
                reconnect={true}
                debug={true}
                ref={Websocket => {
                  this.ws = Websocket;
                }}
              />
            ) : null}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { pages: state.pages, editMode: state.editMode };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(App);
