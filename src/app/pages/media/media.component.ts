import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {ImageGalleryComponent} from '../../shared/image-gallery/image-gallery.component';
import {TbmService} from '../../services/tbm.service';
import {Media} from '../../models/media';
import {VideoGalleryComponent} from '../../shared/video-gallery/video-gallery.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  rawMedia: Media;
  imageList: string[];
  videoList: string[];
  pressKit: string;

  constructor(private dialog: MatDialog,
              private api: TbmService) { }

  ngOnInit() {
    this.api.getMedia().then((value) => {
      this.rawMedia = value;
    }).catch(() => {
      console.error('Error while loading media');
    }).then(() => {
      this.imageList = this.rawMedia.photos.map((n) => n.url);
      this.videoList = this.rawMedia.videos.map((n) => this.parseYoutubeLink(n.url));
      this.pressKit = this.rawMedia.press_kit.url;
    });
  }

  parseYoutubeLink(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : 'dQw4w9WgXcQ';
  }

  openImageGallery() {
    this.dialog.open(ImageGalleryComponent, {
      panelClass: 'custom-mat-dialog',
      data: this.imageList
    });
  }

  openVideoGallery() {
    this.dialog.open(VideoGalleryComponent, {
      panelClass: 'custom-mat-dialog',
      data: this.videoList
    });
  }

  openPressKit() {
    window.open(this.pressKit);
  }

}
