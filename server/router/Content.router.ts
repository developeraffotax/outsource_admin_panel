import express from "express";
import AuthMiddleware from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/Upload.middleware.js";
import {
  getHomeContentController,
  saveHomeContentController,
  getBuyServiceContentController,
  saveBuyServiceContentController,
  getAboutUsContentController,
  saveAboutUsContentController,
  getContactUsContentController,
  saveContactUsContentController,
  getFaqContentController,
  saveFaqContentController,
  getServiceContentController,
  getServicePricingController,
  saveServiceContentController,
  saveServicePricingController,
} from "../controller/Content.controller.js";

const router = express.Router();

// All image field names the home form can upload.
// Array card images use indexed names (e.g. heroCardImg_0) so each card's
// image is unambiguously matched on the backend regardless of upload gaps.
const homeImageFields = [
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

// Home content routes
router.get("/home", getHomeContentController);
router.post("/home", AuthMiddleware, upload.any(), saveHomeContentController);
router.put("/home", AuthMiddleware, upload.any(), saveHomeContentController);

// Buy service routes
router.get("/buy-service", getBuyServiceContentController);
router.post("/buy-service", AuthMiddleware, saveBuyServiceContentController);
router.put("/buy-service", AuthMiddleware, saveBuyServiceContentController);

// about image fields
const AboutUsImageFields = [
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

// About Us routes
router.get("/about-us", getAboutUsContentController);
router.post(
  "/about-us",
  AuthMiddleware,
  upload.fields(AboutUsImageFields),
  saveAboutUsContentController,
);
router.put(
  "/about-us",
  AuthMiddleware,
  upload.fields(AboutUsImageFields),
  saveAboutUsContentController,
);

// Contact Us image fields
const contactUsImageFields = [
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

// Contact Us routes
router.get("/contact-us", getContactUsContentController);
router.post(
  "/contact-us",
  AuthMiddleware,
  upload.fields(contactUsImageFields),
  saveContactUsContentController,
);
router.put(
  "/contact-us",
  AuthMiddleware,
  upload.fields(contactUsImageFields),
  saveContactUsContentController,
);

const faqImageFields = [
  // bookACall image
  { name: "bookACallImg", maxCount: 1 },
];

// FAQ routes
router.get("/faq", getFaqContentController);
router.post(
  "/faq",
  AuthMiddleware,
  upload.fields(faqImageFields),
  saveFaqContentController,
);
router.put(
  "/faq",
  AuthMiddleware,
  upload.fields(faqImageFields),
  saveFaqContentController,
);

// Service routes
// upload.any() is used here because image field names are dynamic (2D indexed:
// serviceIndex + cardIndex), making it impractical to enumerate them statically.
router.get("/services/:slug/pricing", getServicePricingController);
router.post(
  "/services/:slug/pricing",
  AuthMiddleware,
  saveServicePricingController,
);
router.put(
  "/services/:slug/pricing",
  AuthMiddleware,
  saveServicePricingController,
);

router.get("/services", getServiceContentController);
router.post(
  "/services",
  AuthMiddleware,
  upload.any(),
  saveServiceContentController,
);
router.put(
  "/services",
  AuthMiddleware,
  upload.any(),
  saveServiceContentController,
);

export default router;
