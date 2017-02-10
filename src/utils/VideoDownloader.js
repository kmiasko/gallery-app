import YoutubeDownloader from './YoutubeDownloader';
import VimeoDownloader from './VimeoDownloader';

class VideoDownloader {
  constructor() {
    this.downloaders = [];
  }

  addDownloader(downloader) {
    this.downloaders.push(downloader);
  }

  download(movie) {
    const promises = this.downloaders.map(downloader => downloader.download(movie));
    return Promise.all(promises);
  }
}

const Downloader = new VideoDownloader();
Downloader.addDownloader(new YoutubeDownloader());
Downloader.addDownloader(new VimeoDownloader());

export default Downloader;
