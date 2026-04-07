import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import { CmsSaveBar } from "../shared/CmsSaveBar";

type BuyServiceEntry = {
  name: string;
  price: string;
};

type BuyServiceFormValues = {
  nameAndPrice: BuyServiceEntry[];
};

const BACKEND = API_BASE_URL;

const defaultEntries: BuyServiceEntry[] = [
  { name: "Company Accounts & Tax Return!", price: "299" },
  { name: "Bookkeeping", price: "" },
  { name: "Company Formation", price: "" },
];

const BuyService = () => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const saveMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BuyServiceFormValues>({
    defaultValues: {
      nameAndPrice: defaultEntries,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "nameAndPrice",
  });

  const entries = watch("nameAndPrice");

  // Load saved entries from the backend when the page opens
  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await axios.get(`${BACKEND}/api/content/buy-service`);
        const c = res.data.content;
        if (!c?.entries?.length) return;
        // Map backend "entries" array back to frontend "nameAndPrice"
        reset({ nameAndPrice: c.entries });
      } catch {
        // silently ignore — form keeps its defaults
      }
    };
    loadContent();
  }, [reset]);

  const showSaveMessage = (msg: string) => {
    setSaveMessage(msg);
    if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    saveMessageTimer.current = setTimeout(() => setSaveMessage(null), 4000);
  };

  useEffect(() => {
    return () => {
      if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    };
  }, []);

  const onSubmit = async (data: BuyServiceFormValues) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      // Send as regular JSON — no files in this form
      await axios.post(
        `${BACKEND}/api/content/buy-service`,
        { entries: data.nameAndPrice },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showSaveMessage("Saved successfully!");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to save. Please try again.";
      showSaveMessage(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="cms-form-shell mx-auto w-full max-w-5xl">
      <label className="cms-page-title mb-4 block">Buy Service</label>

      <form
        className="space-y-6"
        action="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CmsSaveBar saving={saving} saveMessage={saveMessage} />

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Name & Price ({fields.length})</span>
            <svg
              className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <div className="cms-accordion-content space-y-4 border-t border-slate-100 p-3">
            {fields.map((field, index) => {
              const entryName = entries?.[index]?.name?.trim();

              return (
                <details
                  key={field.id}
                  className="cms-accordion group rounded-md border border-slate-200 bg-white"
                >
                  <summary className="cms-accordion-summary cursor-pointer px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                    {entryName || `Entry ${index + 1}`}
                  </summary>

                  <div className="cms-accordion-content grid gap-4 border-t border-slate-200 p-4 md:grid-cols-[1fr_180px]">
                    <div>
                      <label
                        htmlFor={`name-${index}`}
                        className="mb-1 block text-sm font-medium text-slate-700"
                      >
                        Name
                      </label>
                      <input
                        id={`name-${index}`}
                        type="text"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        {...register(`nameAndPrice.${index}.name`, {
                          required: "Please enter name",
                        })}
                      />
                      {errors.nameAndPrice?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.nameAndPrice[index]?.name?.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`price-${index}`}
                        className="mb-1 block text-sm font-medium text-slate-700"
                      >
                        Price
                      </label>
                      <input
                        id={`price-${index}`}
                        type="text"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        {...register(`nameAndPrice.${index}.price`, {
                          required: "Please enter price",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message:
                              "Please enter a valid number (e.g. 299 or 299.99)",
                          },
                        })}
                      />
                      {errors.nameAndPrice?.[index]?.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.nameAndPrice[index]?.price?.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                </details>
              );
            })}

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => append({ name: "", price: "" })}
                className="cms-btn-link"
              >
                + Add an entry
              </button>
            </div>
          </div>
        </details>
      </form>
    </div>
  );
};

export default BuyService;
