import axios from 'axios';
import config from '../config';
import pick from 'lodash/pick';
import shortid from 'shortid';
import moment from 'moment';

class YoutubeDownloader {
  constructor() {
    this.apiKey = config.providers.youtube.apiKey;
    this.idRegex = /([A-Za-z0-9_\-]{11})/;
    this.apiURL = '';
    this.embed = '';
    this.id = null;
  }

  createData() {
    if (!this.id) {
      throw new Error('First parse url for id');
    }

    this.apiURL = `https://www.googleapis.com/youtube/v3/videos?id=${this.id}&key=${this.apiKey}&part=snippet,contentDetails,statistics,status`;
    this.embed = `<iframe id="ytplayer" type="text/html" width="640" height="390"
      src="http://www.youtube.com/embed/${this.id}?autoplay=0" frameborder="0"/>`;
  }

  formatData(data) {
    if (!data || !data.items || !data.items[0]) {
      return null;
    }
    const fetched = pick(data.items[0], [
      'snippet.title',
      'snippet.description',
      'snippet.thumbnails.high.url',
      'statistics.viewCount',
      'statistics.likeCount',
    ]);

    const desc = (fetched.snippet.description.length < 200)
      ? fetched.snippet.description
      : `${fetched.snippet.description.substring(0, 197)}...`;

    return {
      shortid: shortid.generate(),
      title: fetched.snippet.title,
      description: desc,
      thumbnail: fetched.snippet.thumbnails.high.url,
      likes: parseInt(fetched.statistics.likeCount, 10),
      views: parseInt(fetched.statistics.viewCount, 10),
      favorite: false,
      date: moment().format(config.config.dateFormat),
      embed: this.embed,
    };
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

  download(input) {
    const valid = this.parse(input);
    if (!valid) {
      return null;
    }
    return axios.get(this.apiURL)
      .then(data => this.formatData(data.data));
  }
}

export default YoutubeDownloader;
