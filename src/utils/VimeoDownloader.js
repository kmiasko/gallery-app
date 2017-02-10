import axios from 'axios';
import config from '../config';
import moment from 'moment';
import shortid from 'shortid';

class VimeoDownloader {
  constructor() {
    this.clientID = config.providers.vimeo.clientID;
    this.clientSecret = config.providers.vimeo.clientSecret;
    this.secret = btoa(`${this.clientID}:${this.clientSecret}`);
    this.authorizationUrl = 'https://api.vimeo.com/oauth/authorize/client';
    this.authHeader = `basic ${this.secret}`;
    this.idRegex = /([0-9]{3,})/;
    this.embed = '';
    this.apiURL = '';
  }

  createData() {
    if (!this.id) {
      throw new Error('First parse url for id');
    }
    this.embed = `<iframe src="https://player.vimeo.com/video/${this.id}" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
    this.apiURL = `https://api.vimeo.com/videos/${this.id}`;
  }

  parse(input) {
    let id;
    if (!input) {
      return null;
    }

    try {
      id = input.match(this.idRegex)[0];
    } catch (e) {
      return null;
    }

    this.id = id;
    this.createData();
    return true;
  }

  authorize() {
    return axios.post(this.authorizationUrl,
      { grant_type: "client_credentials" },
      { headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.authHeader,
        },
      },
    );
  }

  formatData(data) {
    if (!data) {
      return null;
    }
    const desc = (data.description.length < 200)
      ? data.description :
      `${data.description.substring(0, 197)}...`;

    return {
      shortid: shortid.generate(),
      title: data.name,
      date: moment().format(config.config.dateFormat),
      description: desc,
      favorite: false,
      views: parseInt(data.stats.plays, 10),
      likes: parseInt(data.metadata.connections.likes.total, 10),
      thumbnail: data.pictures.sizes[3].link,
      embed: this.embed,
    };
  }

  download(input) {
    const valid = this.parse(input);
    if (!valid) {
      return null;
    }

    return this.authorize()
      .then(data => data.data.access_token)
      .then(token => axios.get(this.apiURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }))
      .then(data => this.formatData(data.data));
  }
}

export default VimeoDownloader;

