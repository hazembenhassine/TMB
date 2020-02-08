export interface Media {
  press_kit: File;
  photos: File[];
  videos: File[];
}

export interface File {
  type: string;
  url: string;
}
