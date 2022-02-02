export type IFile = {
  _id: string;
  length: number;
  chunkSize: number;
  filename: string;
  metadata: {
    mimetype: string;
  };
};
