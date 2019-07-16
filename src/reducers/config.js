import moment from 'moment';
import _ from 'lodash';

const DEFAULT_SETTINGS = {
  config: null,
  entities: {},
  pages: [],
  layouts: [],
  tiles: [],
  editMode: false
};

const DEFAULT_TILE = {
  x: 0,
  y: 0,
  w: 1,
  h: 1
};

function getState() {
  let thisState = JSON.parse(localStorage.getItem('config'));
  if (!thisState) {
    thisState = DEFAULT_SETTINGS;
  }

  if (thisState.pages.length === 0) {
    thisState.pages = [
      {
        id: 0,
        name: 'Dashboard',
        tiles: [{ i: '1', x: 0, y: 0, w: 1, h: 1 }],
        counter: 2
      }
    ];
  }

  return thisState;
}

const rootReducer = (state = getState(), action) => {
  if (action.type === 'UPDATE_CONFIG') {
    const config = action.config.haven;
    return { ...state, config };
  }

  if (action.type === 'UPDATE_ENTITY') {
    const entities = _.clone(state.entities);
    const entity = action.entity;
    entities[entity.entity_id] = entity.new_state;
    return { ...state, entities };
  }

  if (action.type === 'GET_STATE') {
    return { ...state };
  }

  if (action.type === 'SAVE_LAYOUT') {
    const page = action.page;
    const newLayout = action.layout;

    const pages = _.cloneDeep(state.pages);

    const currentPage = pages.find(p => p.id === page.id);
    currentPage.tiles.map(tile => {
      if (tile) {
        const newTile = newLayout.find(t => t.i === tile.i.toString());
        tile.x = newTile.x;
        tile.y = newTile.y;
        tile.w = newTile.w;
        tile.h = newTile.h;
      }
      return null;
    });

    saveState(state);
    return { ...state, pages };
  }

  if (action.type === 'TOGGLE_EDIT_MODE') {
    saveState(state);
    return {
      ...state,
      editMode: !state.editMode,
      timestamp: moment().format()
    };
  }

  if (action.type === 'SET_ENTITY') {
    var obj = state.entities;
    if (!obj) {
      obj = {};
    }
    obj[action.entity.entity_id] = action.entity;
    saveState(state);
    return { ...state, entities: obj };
  }

  if (action.type === 'SET_PAGES') {
    saveState(state);
    return { ...state, pages: action.pages, timestamp: moment().format() };
  }

  if (action.type === 'ADD_TILE') {
    const pages = _.cloneDeep(state.pages);
    const page = pages.find(page => page.id === action.pageID);
    page.tiles.push({ ...DEFAULT_TILE, i: page.counter.toString() });
    page.counter++;

    const returnVal = { ...state, pages };
    saveState(returnVal);
    return { ...state, pages };
  }

  if (action.type === 'UPDATE_TILE') {
    const pages = _.cloneDeep(state.pages);
    const page = pages.find(page => page.id === action.page.id);
    const tile = page.tiles.find(tile => tile.i === action.tile.i);
    page.tiles.splice(page.tiles.indexOf(tile), 1, action.tile);

    const returnVal = { ...state, pages };
    saveState(returnVal);
    return { ...state, pages };
  }

  if (action.type === 'DELETE_TILE') {
    const pages = _.cloneDeep(state.pages);
    const page = pages.find(page => page.id === action.page.id);
    const tile = page.tiles.find(tile => tile.i === action.tile.i);

    if (tile) {
      page.tiles.splice(page.tiles.indexOf(tile), 1);

      const returnVal = { ...state, pages };
      saveState(returnVal);
      return { ...state, pages };
    }
  }

  if (action.type === 'SAVE_IMPORTED_FILE') {
    if (!state.imports) state.imports = {};
    const imports = state.imports;
    state.imports[action.name] = action.import;
    return { ...state, imports };
  }
  // saveState(state);
  return state;
};

export default rootReducer;

function saveState(state) {
  localStorage.setItem('config', JSON.stringify(state));
}
