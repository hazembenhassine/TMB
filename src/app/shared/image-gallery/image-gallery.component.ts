import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `url("https://picsum.photos/id/${n}/900/500")`);

  images: string[];
  currentImageIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public imageRaw: string[],
              public dialogRef: MatDialogRef<ImageGalleryComponent>) { }

  ngOnInit() {
    this.images = this.imageRaw.map((img) => `url("${img}")`);
    if (Array.isArray(this.images) && this.images.length > 0) {
      this.currentImageIndex = 0;
    }
  }

  selectImage(i: number) {
    this.currentImageIndex = i;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1) % this.images.length;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex += this.images.length;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
