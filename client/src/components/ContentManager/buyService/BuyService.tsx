import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

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
      setSaveMessage("Saved successfully!");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to save. Please try again.";
      setSaveMessage(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <label className="mb-4 block text-xl font-semibold text-slate-900">
        Buy Service
      </label>

      <form
        className="space-y-6"
        action="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saveMessage && (
            <span
              className={`text-sm font-medium ${saveMessage === "Saved successfully!" ? "text-green-600" : "text-red-600"}`}
            >
              {saveMessage}
            </span>
          )}
        </div>

        <section className="space-y-4 rounded-lg border border-slate-200 p-4">
          <h2 className="text-base font-semibold text-slate-900">
            name&Price ({fields.length})
          </h2>

          {fields.map((field, index) => {
            const entryName = entries?.[index]?.name?.trim();

            return (
              <details
                key={field.id}
                className="rounded-md border border-slate-200"
              >
                <summary className="cursor-pointer bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
                  {entryName || `Entry ${index + 1}`}
                </summary>

                <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-[1fr_180px]">
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
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              + Add an entry
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default BuyService;
