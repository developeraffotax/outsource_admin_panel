type CmsRevalidationModel =
  | "home"
  | "about-us"
  | "contact-us"
  | "faq"
  | "buy-service"
  | "services";

const DEFAULT_MODEL_NAMES: Record<CmsRevalidationModel, string[]> = {
  home: ["home-page"],
  "about-us": ["about-us"],
  "contact-us": ["contact-us"],
  faq: ["faq"],
  "buy-service": ["buy-service"],
  services: ["service"],
};

const MODEL_ENV_VARS: Record<CmsRevalidationModel, string | undefined> = {
  home: process.env.OUTSOURCE_REVALIDATE_MODEL_HOME,
  "about-us": process.env.OUTSOURCE_REVALIDATE_MODEL_ABOUT_US,
  "contact-us": process.env.OUTSOURCE_REVALIDATE_MODEL_CONTACT_US,
  faq: process.env.OUTSOURCE_REVALIDATE_MODEL_FAQ,
  "buy-service": process.env.OUTSOURCE_REVALIDATE_MODEL_BUY_SERVICE,
  services: process.env.OUTSOURCE_REVALIDATE_MODEL_SERVICES,
};

let hasLoggedMissingConfig = false;

function isWebhookEnabled(): boolean {
  const raw = process.env.OUTSOURCE_REVALIDATE_ENABLED?.trim().toLowerCase();
  return raw !== "false" && raw !== "0" && raw !== "no";
}

function getTimeoutMs(): number {
  const parsed = Number(process.env.OUTSOURCE_REVALIDATE_TIMEOUT_MS ?? "8000");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 8000;
}

function parseModelNames(
  value: string | undefined,
  fallback: string[],
): string[] {
  if (!value) return fallback;

  const fromEnv = value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return fromEnv.length > 0 ? fromEnv : fallback;
}

function truncate(value: string, maxLen = 240): string {
  return value.length > maxLen ? `${value.slice(0, maxLen)}...` : value;
}

function getModelNames(model: CmsRevalidationModel): string[] {
  return parseModelNames(MODEL_ENV_VARS[model], DEFAULT_MODEL_NAMES[model]);
}

function buildRevalidateUrl(baseUrl: string, secret: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("secret", secret);
  return url.toString();
}

export async function triggerOutsourceRevalidation(
  model: CmsRevalidationModel,
): Promise<boolean> {
  if (!isWebhookEnabled()) {
    return false;
  }

  const url = process.env.OUTSOURCE_REVALIDATE_URL?.trim();
  const secret = process.env.OUTSOURCE_REVALIDATE_SECRET?.trim();

  if (!url || !secret) {
    if (!hasLoggedMissingConfig) {
      console.warn(
        "[revalidate] Skipped because OUTSOURCE_REVALIDATE_URL and/or OUTSOURCE_REVALIDATE_SECRET is missing.",
      );
      hasLoggedMissingConfig = true;
    }
    return false;
  }

  const models = Array.from(new Set(getModelNames(model)));
  let revalidateUrl: string;

  try {
    revalidateUrl = buildRevalidateUrl(url, secret);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[revalidate] Invalid OUTSOURCE_REVALIDATE_URL: ${message}`);
    return false;
  }

  let successCount = 0;

  for (const mappedModel of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), getTimeoutMs());

    try {
      const response = await fetch(revalidateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: mappedModel,
          source: "in-house-cms",
          changedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        console.warn(
          `[revalidate] Failed for model "${model}" as "${mappedModel}": ${response.status} ${response.statusText}${body ? ` - ${truncate(body)}` : ""}`,
        );
      } else {
        successCount += 1;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `[revalidate] Request error for model "${model}" as "${mappedModel}": ${message}`,
      );
    } finally {
      clearTimeout(timer);
    }
  }

  return successCount > 0;
}
