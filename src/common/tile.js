import Axios from 'axios';
import async from 'async';

class TileFunctions {
  constructor(config) {
    this.config = config;
  }
  //	Get States
  //--------------------------------------------------------//
  fetchData = async entities => {
    if (!this.config) return;

    if (!Array.isArray(entities)) {
      entities = [entities];
    }

    const token = this.config.longLivedAccessToken;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    let array = [];

    return new Promise((resolve, reject) => {
      async.forEach(
        entities,
        (entity, cb) => {
          Axios.get(`${this.config.homeAssistantAddress}/api/states/${entity}`)
            .then(response => {
              array.push(response.data);
              cb();
            })
            .catch(err => {
              console.log(err);
            });
        },
        err => {
          if (err) reject(err);
          resolve(array);
        }
      );
    });
  };

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };
}

export default TileFunctions;
