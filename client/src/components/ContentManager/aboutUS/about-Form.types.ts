export type FormValues = {
  heading: string;
  subHeading: string;
  imgHero: FileList;

  OurStory: {
    imgOurStory: FileList;
    headingOurStory: string;
    descriptionOurStory: string;
    descriptiontwoOurStory: string;
    missionStatmentCards: {
      imgStatment: FileList;
      headingStatment: string;
      descriptionStatement: string;
    }[];
  };

  OurValue: {
    imgValue: FileList;
    headingValue: string;
    descriptionValue: string;
  }[];
};
