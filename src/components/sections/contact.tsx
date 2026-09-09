"use client";

import { ArrowUpRight, Check, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/fx/section-heading";
import { Button } from "@/components/ui/button";
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/ui/field";
import { servicesByPractice } from "@/lib/data/services";
import {
  budgetBands,
  contactSchema,
  firstErrors,
  type ContactErrors,
  type ContactInput,
} from "@/lib/schema/contact";
import { site } from "@/lib/site";

const EMPTY: ContactInput = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "Not decided yet",
  message: "",
  trap: "",
};

const NEXT_STEPS = [
  "I read every message personally — not an auto-responder.",
  "A reply within one business day with a straight answer on whether I can help.",
  "If it looks like a fit, a quick call to go over the details and get started.",
] as const;

type Status = "idle" | "sending" | "sent" | "failed";

export function Contact() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState<string>("");

  function update(field: keyof ContactInput) {
    return (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;
      setValues((current: ContactInput) => ({ ...current, [field]: value }));
      // Clear a field's error the moment the person starts fixing it.
      setErrors((current: ContactErrors) =>
        current[field] ? { ...current, [field]: undefined } : current,
      );
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(firstErrors(parsed.error.issues));
      setStatus("idle");
      setNotice("");
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { errors?: ContactErrors; message?: string }
          | null;

        if (body?.errors) setErrors(body.errors);
        setStatus("failed");
        setNotice(
          body?.message ??
            "We could not send that. Try again, or email us directly.",
        );
        return;
      }

      setStatus("sent");
      setNotice("");
      setValues(EMPTY);
    } catch {
      setStatus("failed");
      setNotice(
        "The network dropped the request. Try again, or email us directly.",
      );
    }
  }

  const sending = status === "sending";

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <SectionGlow className="right-0 top-1/3 size-[36rem]" tone="aqua" />

      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Start here"
            title="Tell us what is not working."
            lead="One paragraph is enough. The more specific the problem, the more useful our first reply will be."
          />

          <Reveal delay={0.22} className="mt-10">
            <ul className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: site.email,
                  href: `mailto:${site.email}`,
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: site.phone + " (Click to chat)",
                  href: site.whatsapp,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: site.phone,
                  href: `tel:${site.phoneHref}`,
                },
                {
                  icon: MapPin,
                  label: "Based in",
                  value: "Pakistan · Available worldwide",
                },
                {
                  icon: Clock3,
                  label: "Reply time",
                  value: "Within one business day",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-ice/[0.09] bg-ice/[0.03] text-mist">
                      <Icon className="size-4" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mist">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block truncate text-[0.9375rem] text-ice transition-colors duration-300 hover:text-aqua"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-[0.9375rem] text-ice">
                          {item.value}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <div className="rounded-glass glass glass-rim p-6">
              <p className="eyebrow text-[0.625rem]">What happens next</p>
              <ol className="mt-4 space-y-3">
                {NEXT_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3.5 text-[0.8125rem] leading-relaxed text-mist"
                  >
                    <span
                      data-numeric
                      className="mt-px font-mono text-[0.6875rem] text-aqua/80"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <GlassCard
              tier="raised"
              className="p-4 sm:p-8 lg:p-10"
              sheen={false}
              glowColor="rgba(20,184,166,.14)"
            >
              {status === "sent" ? (
                <div className="flex min-h-[28rem] flex-col items-start justify-center">
                  <span className="grid size-12 place-items-center rounded-2xl border border-aqua/35 bg-aqua/12 text-aqua">
                    <Check className="size-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-7 text-h3 text-ice">
                    Got it — I will be in touch.
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist">
                    I personally read every message and will reply within one
                    business day. If it is urgent, call {site.phone} directly.
                  </p>
                  <Button
                    variant="glass"
                    className="mt-8 w-full sm:w-auto"
                    onClick={() => setStatus("idle")}
                  >
                    Send another brief
                  </Button>
                </div>
              ) : (
                <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:gap-5">
                  <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Your name</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Dana Whitfield"
                        className="mt-2.5"
                        value={values.name}
                        onChange={update("name")}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      <span id="name-error">
                        <FieldError>{errors.name}</FieldError>
                      </span>
                    </div>

                    <div>
                      <Label htmlFor="email">Work email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="dana@company.com"
                        className="mt-2.5"
                        value={values.email}
                        onChange={update("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      <span id="email-error">
                        <FieldError>{errors.email}</FieldError>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      placeholder="Helios Freight"
                      className="mt-2.5"
                      value={values.company}
                      onChange={update("company")}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={
                        errors.company ? "company-error" : undefined
                      }
                    />
                    <span id="company-error">
                      <FieldError>{errors.company}</FieldError>
                    </span>
                  </div>

                  <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="service">Closest service</Label>
                      <Select
                        id="service"
                        name="service"
                        className="mt-2.5"
                        value={values.service}
                        onChange={update("service")}
                        aria-invalid={Boolean(errors.service)}
                        aria-describedby={
                          errors.service ? "service-error" : undefined
                        }
                      >
                        <option value="">Select a service...</option>
                        {servicesByPractice.map((practice) => (
                          <optgroup key={practice.id} label={`✦ ${practice.name}`}>
                            {practice.items.map((service) => (
                              <option key={service.id} value={service.title}>
                                {service.title}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="Not sure yet">Not sure yet (General Inquiry)</option>
                      </Select>
                      <span id="service-error">
                        <FieldError>{errors.service}</FieldError>
                      </span>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget band</Label>
                      <Select
                        id="budget"
                        name="budget"
                        className="mt-2.5"
                        value={values.budget}
                        onChange={update("budget")}
                        aria-invalid={Boolean(errors.budget)}
                        aria-describedby={
                          errors.budget ? "budget-error" : undefined
                        }
                      >
                        {budgetBands.map((band) => (
                          <option key={band} value={band}>
                            {band}
                          </option>
                        ))}
                      </Select>
                      <span id="budget-error">
                        <FieldError>{errors.budget}</FieldError>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">
                      The problem
                      <span className="text-mist/60">— 20 characters minimum</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Our dispatchers re-type every booking into three systems and we lose an hour a day to it…"
                      className="mt-2.5"
                      value={values.message}
                      onChange={update("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    <span id="message-error">
                      <FieldError>{errors.message}</FieldError>
                    </span>
                  </div>

                  {/* Honeypot. Hidden visually but accessible to bots. */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      width: 1,
                      height: 1,
                      padding: 0,
                      margin: -1,
                      overflow: "hidden",
                      clip: "rect(0,0,0,0)",
                      whiteSpace: "nowrap",
                      border: 0,
                    }}
                  >
                    <label htmlFor="trap">Website</label>
                    <input
                      id="trap"
                      name="trap"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.trap ?? ""}
                      onChange={update("trap")}
                    />
                  </div>

                  <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Magnetic className="w-full sm:w-auto">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={sending}
                        className="w-full sm:w-auto"
                      >
                        {sending ? "Sending…" : "Send the brief"}
                        {sending ? null : <ArrowUpRight />}
                      </Button>
                    </Magnetic>

                    <p className="max-w-xs text-xs leading-relaxed text-mist">
                      No sequences, no newsletter. We reply, and that is the
                      whole of it.
                    </p>
                  </div>

                  {status === "failed" && notice ? (
                    <p
                      role="alert"
                      className="rounded-2xl border border-red-400/30 bg-red-400/[0.07] px-4 py-3 text-sm text-red-200"
                    >
                      {notice}{" "}
                      <a
                        href={`mailto:${site.email}`}
                        className="underline decoration-red-300/40 underline-offset-4 hover:text-ice"
                      >
                        {site.email}
                      </a>
                    </p>
                  ) : null}
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
