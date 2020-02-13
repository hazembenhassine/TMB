import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  @Output() opened = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog,
              private api: TbmService) { }

  ngOnInit() {
    this.api.getMedia().then((value) => {
      this.rawMedia = value;
    }).catch(() => {
      console.error('Error while loading media');
    }).then(() => {
      this.imageList = this.rawMedia.photos.map((n) => {
        if (n && n.url) {
          return n.url;
        }
      }).filter(url => url !== undefined);
      this.videoList = this.rawMedia.videos.map((n) => {
        if (n && n.url) {
          return this.parseYoutubeLink(n.url);
        }
      }).filter(url => url !== undefined);
      if (this.rawMedia.press_kit && this.rawMedia.press_kit.url) {
        this.pressKit = this.rawMedia.press_kit.url;
      }
    });
  }

  parseYoutubeLink(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : 'dQw4w9WgXcQ';
  }

  openImageGallery() {
    const dialogRef = this.dialog.open(ImageGalleryComponent, {
      panelClass: 'custom-mat-dialog',
      data: this.imageList
    });

    this.opened.emit(true);
    dialogRef.afterClosed().subscribe(() => {
      this.opened.emit(false);
    });
  }

  openVideoGallery() {
    const dialogRef = this.dialog.open(VideoGalleryComponent, {
      panelClass: 'custom-mat-dialog',
      data: this.videoList
    });

    this.opened.emit(true);
    dialogRef.afterClosed().subscribe(() => {
      this.opened.emit(false);
    });
  }

  openPressKit() {
    if (this.pressKit) {
      window.open(this.pressKit);
    }
  }

}
