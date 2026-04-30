import type { Field } from "multer";

// All image field names the home form can upload.
// Array card images use indexed names (e.g. heroCardImg_0) so each card's
// image is unambiguously matched on the backend regardless of upload gaps.
export const homeImageFields: Field[] = [
  { name: "bgImage", maxCount: 1 },
  { name: "ukFlag", maxCount: 1 },
  // Hero card images (3 cards)
  { name: "heroCardImg_0", maxCount: 1 },
  { name: "heroCardImg_1", maxCount: 1 },
  { name: "heroCardImg_2", maxCount: 1 },
  // Why Outsource section images
  { name: "imgWhyOutsoutcing", maxCount: 1 },
  { name: "imgtwoWhyOutsoutcing", maxCount: 1 },
  { name: "whyOutSourceAccounting", maxCount: 1 },
  // Why Outsource card images (3 cards)
  { name: "whyCardImage_0", maxCount: 1 },
  { name: "whyCardImage_1", maxCount: 1 },
  { name: "whyCardImage_2", maxCount: 1 },
  // Service card images (6 cards)
  { name: "imgServiceCard_0", maxCount: 1 },
  { name: "imgServiceCard_1", maxCount: 1 },
  { name: "imgServiceCard_2", maxCount: 1 },
  { name: "imgServiceCard_3", maxCount: 1 },
  { name: "imgServiceCard_4", maxCount: 1 },
  { name: "imgServiceCard_5", maxCount: 1 },
  // How We Work step icons (3 steps)
  { name: "howWeWorkIcon_0", maxCount: 1 },
  { name: "howWeWorkIcon_1", maxCount: 1 },
  { name: "howWeWorkIcon_2", maxCount: 1 },
  // How We Work connector lines
  { name: "lineOne", maxCount: 1 },
  { name: "lineTwo", maxCount: 1 },
  // Testimonial card images (3 cards)
  { name: "testimonialBgImg_0", maxCount: 1 },
  { name: "testimonialBgImg_1", maxCount: 1 },
  { name: "testimonialBgImg_2", maxCount: 1 },
  { name: "testimonialPersonImg_0", maxCount: 1 },
  { name: "testimonialPersonImg_1", maxCount: 1 },
  { name: "testimonialPersonImg_2", maxCount: 1 },
  // Join Us
  { name: "joinUsBgImage", maxCount: 1 },
];

export const aboutUsImageFields: Field[] = [
  // Hero
  { name: "imgHero", maxCount: 1 },
  // Our Story
  { name: "imgOurStory", maxCount: 1 },
  // Mission Statement Cards (up to 10)
  { name: "imgStatment_0", maxCount: 1 },
  { name: "imgStatment_1", maxCount: 1 },
  { name: "imgStatment_2", maxCount: 1 },
  { name: "imgStatment_3", maxCount: 1 },
  { name: "imgStatment_4", maxCount: 1 },
  { name: "imgStatment_5", maxCount: 1 },
  { name: "imgStatment_6", maxCount: 1 },
  { name: "imgStatment_7", maxCount: 1 },
  { name: "imgStatment_8", maxCount: 1 },
  { name: "imgStatment_9", maxCount: 1 },
  // Our Value Cards (up to 10)
  { name: "imgValue_0", maxCount: 1 },
  { name: "imgValue_1", maxCount: 1 },
  { name: "imgValue_2", maxCount: 1 },
  { name: "imgValue_3", maxCount: 1 },
  { name: "imgValue_4", maxCount: 1 },
  { name: "imgValue_5", maxCount: 1 },
  { name: "imgValue_6", maxCount: 1 },
  { name: "imgValue_7", maxCount: 1 },
  { name: "imgValue_8", maxCount: 1 },
  { name: "imgValue_9", maxCount: 1 },
];

export const contactUsImageFields: Field[] = [
  { name: "img", maxCount: 1 },
  // Get In Touch card images (up to 10)
  { name: "getInTouchImg_0", maxCount: 1 },
  { name: "getInTouchImg_1", maxCount: 1 },
  { name: "getInTouchImg_2", maxCount: 1 },
  { name: "getInTouchImg_3", maxCount: 1 },
  { name: "getInTouchImg_4", maxCount: 1 },
  { name: "getInTouchImg_5", maxCount: 1 },
  { name: "getInTouchImg_6", maxCount: 1 },
  { name: "getInTouchImg_7", maxCount: 1 },
  { name: "getInTouchImg_8", maxCount: 1 },
  { name: "getInTouchImg_9", maxCount: 1 },
];

export const faqImageFields: Field[] = [
  // bookACall image
  { name: "bookACallImg", maxCount: 1 },
];
