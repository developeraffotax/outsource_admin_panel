import type { Request, Response } from "express";
import {
  getBuyServiceContent,
  saveBuyServiceContent,
} from "../services/BuyContent.service";
import {
  getHomeContent,
  saveHomeContent,
} from "../services/HomeContent.service";
import {
  getAboutUsService,
  saveAboutUsService,
} from "../services/AboutUs.service";
import {
  getContactUsService,
  saveContactUsService,
} from "../services/ContactUs.service";

import { getFaqService, saveFaqService } from "../services/Faq.service";
import type { IHomeContent } from "../models/HomeContent.model";
import { BuyServiceSchemaZod } from "../models/BuyService.model";
import { AboutUsSchemaZod } from "../models/AboutUs.model";
import { contactUsSchema } from "../models/ContactUs.model";
import { faqSchema } from "../models/Faq.model";
import { z } from "zod";

// Helper: safely parse a JSON string from req.body (returns empty array on failure)
function parseJsonField<T>(value: unknown): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// GET /api/content/home — returns saved home content (empty object if nothing saved yet)
export async function getHomeContentController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const content = await getHomeContent();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// POST/PUT /api/content/home — saves home content including image files
export async function saveHomeContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // req.files is typed as a union type — we cast it to the shape we need
    const files = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    // Helper: given a field name, return the URL if a new file was uploaded
    const fileUrl = (fieldName: string): string | undefined => {
      const file = files?.[fieldName]?.[0];
      return file ? `/uploads/${file.filename}` : undefined;
    };

    // Parse array fields (they arrive as JSON strings from FormData)
    const heroCardsRaw = parseJsonField<{
      heroCardImg?: string;
      heroCardTitle?: string;
      heroCardContent?: string;
    }>(req.body.heroCards);
    const whyCardsRaw = parseJsonField<{
      whyCardImage?: string;
      whyCardPointerText?: string;
    }>(req.body.whyOutsoutcingCards);
    const serviceCardsRaw = parseJsonField<{
      imgServiceCard?: string;
      titleServiceCard?: string;
      descriptionServiceCard?: string;
      buttontxtServiceCard?: string;
      pglink?: string;
    }>(req.body.serviceCards);
    const howWeWorkStepsRaw = parseJsonField<{
      stepNumber?: string;
      howWeWorkIcon?: string;
      stepTitle?: string;
      stepDescription?: string;
    }>(req.body.howWeWorkSteps);
    const testimonialsRaw = parseJsonField<{
      testimonialBgImg?: string;
      testimonialPersonImg?: string;
      testimonialTitle?: string;
      testimonialDescription?: string;
      testimonialPersonName?: string;
    }>(req.body.testimonialsCard);

    // Merge text data with image URLs.
    // Images are sent with indexed field names (e.g. heroCardImg_0, heroCardImg_1)
    // so each card's image is unambiguously matched regardless of whether other cards uploaded.
    const heroCards = heroCardsRaw.map((card, i) => ({
      ...card,
      heroCardImg: fileUrl(`heroCardImg_${i}`) ?? card.heroCardImg,
    }));
    const whyOutsoutcingCards = whyCardsRaw.map((card, i) => ({
      ...card,
      whyCardImage: fileUrl(`whyCardImage_${i}`) ?? card.whyCardImage,
    }));
    const serviceCards = serviceCardsRaw.map((card, i) => ({
      ...card,
      imgServiceCard: fileUrl(`imgServiceCard_${i}`) ?? card.imgServiceCard,
    }));
    const howWeWorkSteps = howWeWorkStepsRaw.map((step, i) => ({
      ...step,
      howWeWorkIcon: fileUrl(`howWeWorkIcon_${i}`) ?? step.howWeWorkIcon,
    }));
    const testimonialsCard = testimonialsRaw.map((card, i) => ({
      ...card,
      testimonialBgImg:
        fileUrl(`testimonialBgImg_${i}`) ?? card.testimonialBgImg,
      testimonialPersonImg:
        fileUrl(`testimonialPersonImg_${i}`) ?? card.testimonialPersonImg,
    }));

    // Build the data object — only include image URL if a new file was uploaded
    const data: Partial<IHomeContent> = {
      // text fields (always from req.body)
      title: req.body.title,
      headingTextFirst: req.body.headingTextFirst,
      headingTextMiddle: req.body.headingTextMiddle,
      headingTextEnd: req.body.headingTextEnd,
      description: req.body.description,
      description2: req.body.description2,
      freeConsultation: req.body.freeConsultation,
      cardSelector: req.body.cardSelector,
      whyOutsoutcing: req.body.whyOutsoutcing,
      headingWhyOutsoutcing: req.body.headingWhyOutsoutcing,
      descriptionWhyOutsoutcing: req.body.descriptionWhyOutsoutcing,
      headingServiceSection: req.body.headingServiceSection,
      descriptionServiceSection: req.body.descriptionServiceSection,
      headingHowWeWork: req.body.headingHowWeWork,
      headingClientsTestimonial: req.body.headingClientsTestimonial,
      email: req.body.email,
      number: req.body.number,
      eNumber: req.body.eNumber,
      joinUsHeading: req.body.joinUsHeading,

      // image fields (only set if a new file was uploaded)
      ...(fileUrl("bgImage") && { bgImage: fileUrl("bgImage") }),
      ...(fileUrl("ukFlag") && { ukFlag: fileUrl("ukFlag") }),
      ...(fileUrl("imgWhyOutsoutcing") && {
        imgWhyOutsoutcing: fileUrl("imgWhyOutsoutcing"),
      }),
      ...(fileUrl("imgtwoWhyOutsoutcing") && {
        imgtwoWhyOutsoutcing: fileUrl("imgtwoWhyOutsoutcing"),
      }),
      ...(fileUrl("whyOutSourceAccounting") && {
        whyOutSourceAccounting: fileUrl("whyOutSourceAccounting"),
      }),
      ...(fileUrl("lineOne") && { lineOne: fileUrl("lineOne") }),
      ...(fileUrl("lineTwo") && { lineTwo: fileUrl("lineTwo") }),
      ...(fileUrl("joinUsBgImage") && {
        joinUsBgImage: fileUrl("joinUsBgImage"),
      }),

      // array fields (merged above)
      heroCards,
      whyOutsoutcingCards,
      serviceCards,
      howWeWorkSteps,
      testimonialsCard,
    };

    const content = await saveHomeContent(data);
    res.status(200).json({ content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function getAboutUsContentController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const content = await getAboutUsService();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function saveAboutUsContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const files = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    const fileUrl = (fieldName: string): string | undefined => {
      const file = files?.[fieldName]?.[0];
      return file ? `/uploads/${file.filename}` : undefined;
    };

    const missionCardsRaw = parseJsonField<{
      headingStatment?: string;
      descriptionStatement?: string;
    }>(req.body.missionStatmentCards);

    const missionStatmentCards = missionCardsRaw.map((card, i) => ({
      ...card,
      ...(fileUrl(`imgStatment_${i}`) && {
        imgStatment: fileUrl(`imgStatment_${i}`),
      }),
    }));

    const ourValueRaw = parseJsonField<{
      headingValue?: string;
      descriptionValue?: string;
    }>(req.body.OurValue);

    const OurValue = ourValueRaw.map((card, i) => ({
      ...card,
      ...(fileUrl(`imgValue_${i}`) && { imgValue: fileUrl(`imgValue_${i}`) }),
    }));

    const data = AboutUsSchemaZod.parse({
      heading: req.body.heading,
      subHeading: req.body.subheading,
      ...(fileUrl("imgHero") && { img: fileUrl("imgHero") }),
      OurStory: {
        headingOurStory: req.body.headingOurStory,
        descriptionOurStory: req.body.descriptionOurStory,
        descriptiontwoOurStory: req.body.descriptiontwoOurStory,
        ...(fileUrl("imgOurStory") && { imgOurStory: fileUrl("imgOurStory") }),
        missionStatmentCards,
      },
      OurValue,
    });

    const content = await saveAboutUsService(data);
    res.status(200).json({ content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// GET /api/content/buy-service
export async function getBuyServiceContentController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const content = await getBuyServiceContent();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST/PUT /api/content/buy-service
export async function saveBuyServiceContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // entries may come as a JSON string or as a parsed array depending on Content-Type
    const entriesRaw =
      typeof req.body.entries === "string"
        ? JSON.parse(req.body.entries)
        : req.body.entries;

    const validated = BuyServiceSchemaZod.parse({ entries: entriesRaw });
    const content = await saveBuyServiceContent(validated);
    res.status(200).json({ content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function getContactUsContentController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const content = await getContactUsService();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function saveContactUsContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const files = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    const fileUrl = (fieldName: string): string | undefined => {
      const file = files?.[fieldName]?.[0];
      return file ? `/uploads/${file.filename}` : undefined;
    };
    const getInTouchRaw = parseJsonField<{
      title?: string;
      description?: string;
      detail?: string;
    }>(req.body.getInTouch);

    const getInTouch = getInTouchRaw.map((item, i) => ({
      ...item,
      ...(fileUrl(`getInTouchImg_${i}`) && {
        img: fileUrl(`getInTouchImg_${i}`),
      }),
    }));

    const data = contactUsSchema.parse({
      heading: req.body.heading,
      description: req.body.description,
      ...(fileUrl("img") && { img: fileUrl("img") }),
      getInTouch,
    });

    const content = await saveContactUsService(data);
    res.status(200).json({ content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function getFaqContentController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const content = await getFaqService();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function saveFaqContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const files = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    const fileUrl = (fieldName: string): string | undefined => {
      const file = files?.[fieldName]?.[0];
      return file ? `/uploads/${file.filename}` : undefined;
    };

    const generalQuizRaw = parseJsonField<{
      service?: string;
      description?: string;
    }>(req.body.generalQuiz);
    const generalQuiz = generalQuizRaw.map((item, i) => ({
      ...item,
      ...(fileUrl(`generalQuizImg_${i}`) && {
        img: fileUrl(`generalQuizImg_${i}`),
      }),
    }));

    const bookACallRaw = {
      heading: req.body.bookACallHeading,
      description: req.body.bookACallDescription,
    };
    const bookACall = {
      ...bookACallRaw,
      ...(fileUrl("bookACallImg") && {
        img: fileUrl("bookACallImg"),
      }),
    };

    const data = {
      heading: req.body.heading,
      description: req.body.description,
      link: req.body.link,
      generalQuiz,
      bookACall,
    };

    const validated = faqSchema.parse(data);
    const content = await saveFaqService(validated);
    res.status(200).json({ content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
