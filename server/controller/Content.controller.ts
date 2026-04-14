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
import { z } from "zod";
import {
  buildAboutUsContentData,
  buildContactUsContentData,
  buildFaqContentData,
  buildHomeContentData,
  buildServiceContentData,
  cleanupRemovedCloudinaryUrls,
  createFileUrlResolver,
  parseServiceRows,
} from "./content.controller.helpers.js";

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
// POST/PUT /api/content/home — saves home content including image files
export async function saveHomeContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const fileUrl = await createFileUrlResolver(req.files);
    const data = buildHomeContentData(req.body, fileUrl);

    const oldDoc = await getHomeContent();
    const content = await saveHomeContent(data);
    await cleanupRemovedCloudinaryUrls(oldDoc, content);
    await triggerOutsourceRevalidation("home");
    res.status(200).json({ content });
  } catch (error) {
    console.error("[saveHomeContent]", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
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
    const fileUrl = await createFileUrlResolver(req.files);
    const oldDoc = await getAboutUsService();

    const data = AboutUsSchemaZod.parse(
      buildAboutUsContentData(req.body, fileUrl, oldDoc),
    );

    const content = await saveAboutUsService(data);
    await cleanupRemovedCloudinaryUrls(oldDoc, content);
    await triggerOutsourceRevalidation("about-us");
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
    await triggerOutsourceRevalidation("buy-service");
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
    const fileUrl = await createFileUrlResolver(req.files);
    const oldDoc = await getContactUsService();

    const data = contactUsSchema.parse(
      buildContactUsContentData(req.body, fileUrl, oldDoc),
    );

    const content = await saveContactUsService(data);
    await cleanupRemovedCloudinaryUrls(oldDoc, content);
    await triggerOutsourceRevalidation("contact-us");
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
    const fileUrl = await createFileUrlResolver(req.files);
    const oldDoc = await getFaqService();

    const data = buildFaqContentData(req.body, fileUrl, oldDoc);

    const validated = faqSchema.parse(data);
    const content = await saveFaqService(validated);
    await cleanupRemovedCloudinaryUrls(oldDoc, content);
    await triggerOutsourceRevalidation("faq");
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

// GET /api/content/service — returns saved service content by slug
// GET /api/content/services — returns all saved services
export async function getServiceContentController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const content = await getServiceContent();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? [] });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/content/services/:slug/pricing — returns pricing for one service slug
export async function getServicePricingController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const slug = normalizeSlugParam(req.params.slug);
    if (!slug) {
      res.status(400).json({ error: "Service slug is required" });
      return;
    }

    const content = await getServicePricingBySlug(slug);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ content: content ?? {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST/PUT /api/content/services — saves an array of services with images
export async function saveServiceContentController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const fileUrl = await createFileUrlResolver(req.files);
    const servicesRaw = parseServiceRows(req.body.services);

    const oldDocs = await getServiceContent();
    const oldBySlug = new Map(oldDocs.map((doc) => [doc.slug, doc]));

    // Save each service individually (upsert by slug)
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

// POST/PUT /api/content/services/:slug/pricing — saves pricing only for one service slug
export async function saveServicePricingController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const slug = normalizeSlugParam(req.params.slug);
    if (!slug) {
      res.status(400).json({ error: "Service slug is required" });
      return;
    }

    const pricing = pricingSchemaZod.parse(parsePricingPayload(req.body));
    const saved = await saveServicePricingBySlug(slug, pricing);

    await triggerOutsourceRevalidation("services");
    res.status(200).json({ content: saved.Pricing ?? {} });
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
