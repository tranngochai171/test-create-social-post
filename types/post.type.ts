export type PostValuesType = {
  title: string;
  banner: string;
  venue: string;
  capacity: string;
  price: string;
  date: string;
  time: string;
  isManualApprove: boolean;
  privacy: string;
  tags: string[];
  startAt?: string;
  description: string;
};

export type PostDataType = Omit<PostValuesType, 'date' | 'time'>;
