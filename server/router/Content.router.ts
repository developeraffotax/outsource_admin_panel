import express from "express";
import AuthMiddleware from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/Upload.middleware.js";
import {
  homeImageFields,
  aboutUsImageFields,
  contactUsImageFields,
  faqImageFields,
} from "../config/upload-fields.config.js";
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

// Home content routes
router.get("/home", getHomeContentController);
router.post("/home", AuthMiddleware, upload.any(), saveHomeContentController);
router.put("/home", AuthMiddleware, upload.any(), saveHomeContentController);

// Buy service routes
router.get("/buy-service", getBuyServiceContentController);
router.post("/buy-service", AuthMiddleware, saveBuyServiceContentController);
router.put("/buy-service", AuthMiddleware, saveBuyServiceContentController);

// About Us routes
router.get("/about-us", getAboutUsContentController);
router.post(
  "/about-us",
  AuthMiddleware,
  upload.fields(aboutUsImageFields),
  saveAboutUsContentController,
);
router.put(
  "/about-us",
  AuthMiddleware,
  upload.fields(aboutUsImageFields),
  saveAboutUsContentController,
);

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
