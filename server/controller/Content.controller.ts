import type { Request, Response } from "express";
import {
  getBuyServiceContent,
  saveBuyServiceContent,
} from "../services/BuyContent.service.js";
import {
  getHomeContent,
  saveHomeContent,
} from "../services/HomeContent.service.js";
import {
  getAboutUsService,
  saveAboutUsService,
} from "../services/AboutUs.service.js";
import {
  getContactUsService,
  saveContactUsService,
} from "../services/ContactUs.service.js";
import {
  getServiceContent,
  getServicePricingBySlug,
  saveServiceContent,
  saveServicePricingBySlug,
} from "../services/Service.service.js";
import { triggerOutsourceRevalidation } from "../services/Revalidation.service.js";
import { getFaqService, saveFaqService } from "../services/Faq.service.js";
import { BuyServiceSchemaZod } from "../models/BuyService.model.js";
import { AboutUsSchemaZod } from "../models/AboutUs.model.js";
import { contactUsSchema } from "../models/ContactUs.model.js";
import { faqSchema } from "../models/Faq.model.js";
import { pricingSchemaZod } from "../models/Service.model.js";
import { catchAsync } from "../utils/catch-async.js";
import { buildAboutUsContentData } from "./builders/about-content.builder.js";
import { buildContactUsContentData } from "./builders/contact-content.builder.js";
import { buildFaqContentData } from "./builders/faq-content.builder.js";
import { buildHomeContentData } from "./builders/home-content.builder.js";
import {
  buildServiceContentData,
  parseServiceRows,
} from "./builders/service-content.builder.js";
import {
  cleanupRemovedCloudinaryUrls,
  createFileUrlResolver,
} from "./builders/shared.js";

function parsePricingPayload(value: unknown): unknown {
  const source =
    typeof value === "object" && value !== null && "pricing" in value
      ? (value as Record<string, unknown>).pricing
      : value;

  if (typeof source === "string") {
    try {
      return JSON.parse(source);
    } catch {
      throw new Error("Invalid pricing payload JSON.");
    }
  }

  return source;
}

function normalizeSlugParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

// GET /api/content/home
export const getHomeContentController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const content = await getHomeContent();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? {} });
});

// POST/PUT /api/content/home
export const saveHomeContentController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const fileUrl = await createFileUrlResolver(req.files);
  const data = buildHomeContentData(req.body, fileUrl);

  const oldDoc = await getHomeContent();
  const content = await saveHomeContent(data);
  await cleanupRemovedCloudinaryUrls(oldDoc, content);
  await triggerOutsourceRevalidation("home");
  res.status(200).json({ content });
});

// GET /api/content/about-us
export const getAboutUsContentController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const content = await getAboutUsService();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? {} });
});

// POST/PUT /api/content/about-us
export const saveAboutUsContentController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const fileUrl = await createFileUrlResolver(req.files);
  const oldDoc = await getAboutUsService();

  const data = AboutUsSchemaZod.parse(
    buildAboutUsContentData(req.body, fileUrl, oldDoc),
  );

  const content = await saveAboutUsService(data);
  await cleanupRemovedCloudinaryUrls(oldDoc, content);
  await triggerOutsourceRevalidation("about-us");
  res.status(200).json({ content });
});

// GET /api/content/buy-service
export const getBuyServiceContentController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const content = await getBuyServiceContent();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? {} });
});

// POST/PUT /api/content/buy-service
export const saveBuyServiceContentController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const entriesRaw =
    typeof req.body.entries === "string"
      ? JSON.parse(req.body.entries)
      : req.body.entries;

  const validated = BuyServiceSchemaZod.parse({ entries: entriesRaw });
  const content = await saveBuyServiceContent(validated);
  await triggerOutsourceRevalidation("buy-service");
  res.status(200).json({ content });
});

// GET /api/content/contact-us
export const getContactUsContentController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const content = await getContactUsService();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? {} });
});

// POST/PUT /api/content/contact-us
export const saveContactUsContentController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const fileUrl = await createFileUrlResolver(req.files);
  const oldDoc = await getContactUsService();

  const data = contactUsSchema.parse(
    buildContactUsContentData(req.body, fileUrl, oldDoc),
  );

  const content = await saveContactUsService(data);
  await cleanupRemovedCloudinaryUrls(oldDoc, content);
  await triggerOutsourceRevalidation("contact-us");
  res.status(200).json({ content });
});

// GET /api/content/faq
export const getFaqContentController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const content = await getFaqService();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? {} });
});

// POST/PUT /api/content/faq
export const saveFaqContentController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const fileUrl = await createFileUrlResolver(req.files);
  const oldDoc = await getFaqService();

  const data = buildFaqContentData(req.body, fileUrl, oldDoc);

  const validated = faqSchema.parse(data);
  const content = await saveFaqService(validated);
  await cleanupRemovedCloudinaryUrls(oldDoc, content);
  await triggerOutsourceRevalidation("faq");
  res.status(200).json({ content });
});

// GET /api/content/services
export const getServiceContentController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const content = await getServiceContent();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? [] });
});

// GET /api/content/services/:slug/pricing
export const getServicePricingController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const slug = normalizeSlugParam(req.params.slug);
  if (!slug) {
    res.status(400).json({ error: "Service slug is required" });
    return;
  }

  const content = await getServicePricingBySlug(slug);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ content: content ?? {} });
});

// POST/PUT /api/content/services
export const saveServiceContentController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const fileUrl = await createFileUrlResolver(req.files);
  const servicesRaw = parseServiceRows(req.body.services);

  const oldDocs = await getServiceContent();
  const oldBySlug = new Map(oldDocs.map((doc) => [doc.slug, doc]));

  const saved = await Promise.all(
    servicesRaw.map((svc, i) =>
      saveServiceContent(
        buildServiceContentData(svc, i, oldDocs, oldBySlug, fileUrl),
      ),
    ),
  );

  await cleanupRemovedCloudinaryUrls(oldDocs, saved);
  await triggerOutsourceRevalidation("services");
  res.status(200).json({ content: saved });
});

// POST/PUT /api/content/services/:slug/pricing
export const saveServicePricingController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const slug = normalizeSlugParam(req.params.slug);
  if (!slug) {
    res.status(400).json({ error: "Service slug is required" });
    return;
  }

  const pricing = pricingSchemaZod.parse(parsePricingPayload(req.body));
  const saved = await saveServicePricingBySlug(slug, pricing);

  await triggerOutsourceRevalidation("services");
  res.status(200).json({ content: saved.Pricing ?? {} });
});
