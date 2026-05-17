export interface ImagePair {
  id: number;
  image1Url: string;
  image2Url: string;
  number: string;
  caption: string;
  displayOrder: number;
}

export interface ImagePairRequest {
  image1Url: string;
  image2Url: string;
  number: string;
  caption: string;
  displayOrder: number;
}
