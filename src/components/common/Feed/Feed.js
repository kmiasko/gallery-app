import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import io from 'socket.io-client';
import { getFeed, addFeedItem } from '../../../actions/FeedActions';
import './Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.newVideo = this.newVideo.bind(this);
  }

  componentDidMount() {
    this.props.getFeed()
      .then(() => {
        this.socket = io('localhost:8080');
        this.socket.on('new:video', this.newVideo);
      })
      .catch(err => console.error(err));
  }

  newVideo(video) {
    this.props.addFeedItem(video);
  }

  render() {
    return (
      <div className='Feed'>
        <h2>Last added videos</h2>
        { this.props.feed.map((item, i) =>
          <Card key={i} style={{
            flex: '0 1 18%',
            margin: '0.2em',
          }}>
            <CardMedia>
              <img src={item.thumbnail} />
            </CardMedia>
          </Card>
        )}
      </div>
    );
  }
}

Feed.defaultProps = {
  feed: [],
};

Feed.propTypes = {
  feed: PropTypes.array,
};

const mapStateToProps = state => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  getFeed,
  addFeedItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

