import { z } from "zod";

/**
 * One schema, both sides. The browser uses it for instant feedback and the API
 * route uses it as the trust boundary — so a rule can never drift between them.
 */

export const budgetBands = [
  "Under $25K",
  "$25K – $60K",
  "$60K – $150K",
  "$150K+",
  "Not decided yet",
] as const;

export type BudgetBand = (typeof budgetBands)[number];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please tell us who you are." })
    .max(80, { message: "That name is longer than we can store." }),

  email: z
    .string()
    .trim()
    .min(1, { message: "We need somewhere to reply." })
    .email({ message: "That address does not look right." })
    .max(160),

  company: z
    .string()
    .trim()
    .min(2, { message: "Company or project name, whichever exists." })
    .max(120),

  service: z
    .string()
    .trim()
    .min(1, { message: "Pick the closest match — we will refine it together." })
    .max(80),

  budget: z.enum(budgetBands, {
    message: "Choose a band. It changes what we recommend, not whether we reply.",
  }),

  message: z
    .string()
    .trim()
    .min(20, { message: "A couple of sentences about the problem, please." })
    .max(4000, { message: "Keep it under 4,000 characters and send the rest later." }),

  /** Honeypot: hidden from people, irresistible to naive bots. */
  trap: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/**
 * Flattens issues to one message per field — all a form can display. Typed
 * structurally so it does not depend on Zod's internal issue-type exports.
 */
export function firstErrors(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
): ContactErrors {
  const errors: ContactErrors = {};

  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    const field = key as keyof ContactInput;
    if (errors[field]) continue;
    errors[field] = issue.message;
  }

  return errors;
}
