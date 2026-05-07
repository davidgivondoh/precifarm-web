'use client';

// Client because: form state, client-side validation, fetch on submit.

import { useId, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { trackEvent } from '@/lib/analytics';

type FormType = 'customer' | 'partner' | 'press';

const formMeta: Record<FormType, { label: string; lede: string; envKey: string; cta: string }> = {
  customer: {
    label: 'I am a customer',
    lede: 'Tell us about the room, home, or building you want to power.',
    envKey: 'NEXT_PUBLIC_FORMSPREE_CUSTOMER',
    cta: 'Request a quote',
  },
  partner: {
    label: 'I am a partner',
    lede: 'Bank, distributor, or installer? Tell us how you want to work together.',
    envKey: 'NEXT_PUBLIC_FORMSPREE_PARTNER',
    cta: 'Start a conversation',
  },
  press: {
    label: 'I am press',
    lede: 'Reporter, analyst, or researcher? We respond within two business days.',
    envKey: 'NEXT_PUBLIC_FORMSPREE_PRESS',
    cta: 'Send your enquiry',
  },
};

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'form', string>>;

const formspreeEndpoints: Record<FormType, string | undefined> = {
  customer: process.env.NEXT_PUBLIC_FORMSPREE_CUSTOMER,
  partner: process.env.NEXT_PUBLIC_FORMSPREE_PARTNER,
  press: process.env.NEXT_PUBLIC_FORMSPREE_PRESS,
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm(): React.ReactElement {
  const [type, setType] = useState<FormType>('customer');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    organisation: useId(),
    message: useId(),
  };

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name) next.name = 'Please tell us your name.';
    if (!email) next.email = 'We need an email to reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email looks off.';
    if (phone && phone.replace(/\D/g, '').length < 7) next.phone = 'That phone number looks short.';
    if (!message || message.length < 10)
      next.message = 'A few sentences please, so we can route this well.';

    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = e.currentTarget;
    const issues = validate(form);
    setErrors(issues);
    if (Object.keys(issues).length > 0) {
      const firstField = Object.keys(issues)[0];
      if (firstField) {
        const el = form.querySelector<HTMLInputElement>(`[name="${firstField}"]`);
        el?.focus();
      }
      return;
    }

    const endpoint = formspreeEndpoints[type];
    if (!endpoint) {
      setErrors({
        form: 'This form is not yet wired to a Formspree endpoint. Email hello@precifarm.com directly while we set this up.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData(form);
      data.set('_form_type', type);
      const res = await fetch(`https://formspree.io/f/${endpoint}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('Formspree returned non-OK');
      setSubmitted(true);
      trackEvent('contact_form_submitted', { type });
      form.reset();
    } catch {
      setErrors({ form: 'Something went wrong. Please try again or email hello@precifarm.com.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-line bg-surface-muted rounded-xl border p-8"
      >
        <CheckCircle2 className="text-brand h-8 w-8" aria-hidden="true" />
        <h2 className="font-display mt-4 text-xl">We have your message.</h2>
        <p className="text-ink-muted mt-2">
          We will reply from hello@precifarm.com within two business days. If it is urgent, call us
          on +254 700 000 000.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-brand mt-6 inline-flex items-center text-sm font-medium underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const meta = formMeta[type];

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className="text-ink text-sm font-medium">I am writing as</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {(Object.keys(formMeta) as FormType[]).map((key) => {
            const m = formMeta[key];
            const checked = type === key;
            return (
              <label
                key={key}
                className={clsx(
                  'flex cursor-pointer items-center justify-center rounded-md border px-4 py-2.5 text-sm transition-colors',
                  checked
                    ? 'border-brand bg-brand text-white'
                    : 'border-line text-ink hover:bg-surface-muted',
                )}
              >
                <input
                  type="radio"
                  name="form_type"
                  value={key}
                  checked={checked}
                  onChange={() => setType(key)}
                  className="sr-only"
                />
                {m.label}
              </label>
            );
          })}
        </div>
        <p className="text-ink-muted mt-3 text-sm">{meta.lede}</p>
      </fieldset>

      <Field
        id={ids.name}
        name="name"
        label="Your name"
        autoComplete="name"
        required
        error={errors.name}
      />
      <Field
        id={ids.email}
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <Field
        id={ids.phone}
        name="phone"
        type="tel"
        label="Phone (optional)"
        autoComplete="tel"
        error={errors.phone}
      />
      <Field
        id={ids.organisation}
        name="organisation"
        label="Organisation (optional)"
        autoComplete="organization"
      />

      <div>
        <label htmlFor={ids.message} className="text-ink block text-sm font-medium">
          Your message <span className="text-brand">*</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          required
          rows={6}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          aria-invalid={errors.message ? true : undefined}
          className={clsx(
            'border-line bg-surface mt-2 block w-full rounded-md border px-3 py-2 text-sm',
            'focus-visible:border-brand focus-visible:outline-none',
            errors.message && 'border-red-500',
          )}
        />
        {errors.message && (
          <p id={`${ids.message}-error`} className="mt-2 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {turnstileSiteKey ? (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          aria-label="Anti-spam check"
        />
      ) : (
        <p className="text-ink-muted text-xs">
          Anti-spam protection (Cloudflare Turnstile) is not configured in this environment. The
          form still works for now.
        </p>
      )}

      {errors.form && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{errors.form}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-brand hover:bg-brand-strong inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {submitting ? 'Sending…' : meta.cta}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}): React.ReactElement {
  return (
    <div>
      <label htmlFor={id} className="text-ink block text-sm font-medium">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className={clsx(
          'border-line bg-surface mt-2 block w-full rounded-md border px-3 py-2 text-sm',
          'focus-visible:border-brand focus-visible:outline-none',
          error && 'border-red-500',
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
