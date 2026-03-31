export type FormValues = {
  heading: string;
  description: string;
  link: string;

  generalQuiz: {
    service: string;
    description: string;
  }[];

  bookACall: {
    heading: string;
    description: string;
    img: FileList;
  };
};
