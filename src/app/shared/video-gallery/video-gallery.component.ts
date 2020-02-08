import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  videos: SafeResourceUrl[];
  thumbnails: string[];
  currentVideoIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public videoRaw: string[],
              private dialogRef: MatDialogRef<VideoGalleryComponent>,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videos = this.videoRaw.map((vid) => this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${vid}`));
    this.thumbnails = this.videoRaw.map((vid) => `url("http://i3.ytimg.com/vi/${vid}/maxresdefault.jpg")`);
    if (Array.isArray(this.videos) && this.videos.length > 0) {
      this.currentVideoIndex = 0;
    }
  }

  selectVideo(i: number) {
    this.currentVideoIndex = i;
  }

  nextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
  }

  previousVideo() {
    this.currentVideoIndex = (this.currentVideoIndex - 1) % this.videos.length;
    if (this.currentVideoIndex < 0) {
      this.currentVideoIndex += this.videos.length;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
