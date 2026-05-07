'use client';

import { useEffect, useId, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle, Paperclip } from 'lucide-react';
import clsx from 'clsx';
import { trackEvent } from '@/lib/analytics';

type Errors = Partial<
  Record<'name' | 'email' | 'phone' | 'role' | 'resume' | 'coverLetter' | 'form', string>
>;

const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_CAREERS;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const MAX_RESUME_BYTES = 8 * 1024 * 1024; // 8 MB
const ACCEPTED_RESUME_TYPES = ['.pdf', '.doc', '.docx'];

export function ApplicationForm({
  roles,
}: {
  roles: ReadonlyArray<string>;
}): React.ReactElement {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') ?? '';
  const [role, setRole] = useState<string>(initialRole);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    location: useId(),
    role: useId(),
    portfolio: useId(),
    resume: useId(),
    coverLetter: useId(),
  };

  useEffect(() => {
    setRole(searchParams.get('role') ?? '');
  }, [searchParams]);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const roleValue = String(data.get('role') ?? '').trim();
    const coverLetter = String(data.get('coverLetter') ?? '').trim();
    const resume = data.get('resume');

    if (!name) next.name = 'Please tell us your name.';
    if (!email) next.email = 'We need an email to reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email looks off.';
    if (phone && phone.replace(/\D/g, '').length < 7) next.phone = 'That phone number looks short.';
    if (!roleValue) next.role = 'Pick the role you are applying for.';
    if (!coverLetter || coverLetter.length < 40)
      next.coverLetter = 'A few sentences please — why this role, and what you bring.';

    if (!(resume instanceof File) || resume.size === 0) {
      next.resume = 'Attach your CV (PDF, DOC, or DOCX).';
    } else {
      const lower = resume.name.toLowerCase();
      const okType = ACCEPTED_RESUME_TYPES.some((ext) => lower.endsWith(ext));
      if (!okType) next.resume = 'Use a PDF, DOC, or DOCX file.';
      else if (resume.size > MAX_RESUME_BYTES) next.resume = 'CV must be under 8 MB.';
    }

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
        const el = form.querySelector<HTMLElement>(`[name="${firstField}"]`);
        el?.focus();
      }
      return;
    }

    if (!formspreeEndpoint) {
      setErrors({
        form: 'The application form is not yet wired up. Email careers@precifarm.com directly with your CV and cover letter while we set this up.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData(form);
      data.set('_subject', `Application: ${data.get('role') ?? 'unspecified role'}`);
      const res = await fetch(`https://formspree.io/f/${formspreeEndpoint}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('Formspree returned non-OK');
      setSubmitted(true);
      trackEvent('careers_application_submitted', { role: String(data.get('role') ?? '') });
      form.reset();
      setRole('');
    } catch {
      setErrors({
        form: 'Something went wrong. Please try again or email careers@precifarm.com with your CV.',
      });
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
        <h2 className="font-display mt-4 text-xl">Application received.</h2>
        <p className="text-ink-muted mt-2">
          Thanks for applying. We reply to every application within five business days from
          careers@precifarm.com.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-brand mt-6 inline-flex items-center text-sm font-medium underline-offset-4 hover:underline"
        >
          Apply for another role
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor={ids.role} className="text-ink block text-sm font-medium">
          Role <span className="text-brand">*</span>
        </label>
        <select
          id={ids.role}
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          aria-describedby={errors.role ? `${ids.role}-error` : undefined}
          aria-invalid={errors.role ? true : undefined}
          className={clsx(
            'border-line bg-surface mt-2 block w-full rounded-md border px-3 py-2 text-sm',
            'focus-visible:border-brand focus-visible:outline-none',
            errors.role && 'border-red-500',
          )}
        >
          <option value="">Select a role…</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
          <option value="Open application">Open application — none of the above</option>
        </select>
        {errors.role && (
          <p id={`${ids.role}-error`} className="mt-2 text-sm text-red-600">
            {errors.role}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={ids.name}
          name="name"
          label="Full name"
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
          id={ids.location}
          name="location"
          label="Where you are based (optional)"
          autoComplete="address-level2"
        />
      </div>

      <Field
        id={ids.portfolio}
        name="portfolio"
        type="url"
        label="LinkedIn or portfolio URL (optional)"
        autoComplete="url"
      />

      <div>
        <label htmlFor={ids.resume} className="text-ink block text-sm font-medium">
          CV / Resume <span className="text-brand">*</span>
        </label>
        <p className="text-ink-muted mt-1 text-xs">PDF, DOC, or DOCX. Up to 8 MB.</p>
        <div className="mt-2 flex items-center gap-3">
          <input
            id={ids.resume}
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            aria-describedby={errors.resume ? `${ids.resume}-error` : undefined}
            aria-invalid={errors.resume ? true : undefined}
            className={clsx(
              'border-line bg-surface block w-full rounded-md border px-3 py-2 text-sm',
              'file:bg-brand/10 file:text-brand file:mr-3 file:rounded file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold',
              'focus-visible:border-brand focus-visible:outline-none',
              errors.resume && 'border-red-500',
            )}
          />
          <Paperclip aria-hidden="true" className="text-ink-subtle h-4 w-4 shrink-0" />
        </div>
        {errors.resume && (
          <p id={`${ids.resume}-error`} className="mt-2 text-sm text-red-600">
            {errors.resume}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={ids.coverLetter} className="text-ink block text-sm font-medium">
          Cover letter <span className="text-brand">*</span>
        </label>
        <p className="text-ink-muted mt-1 text-xs">
          A short note — why this role, and what you bring. A few sentences is plenty.
        </p>
        <textarea
          id={ids.coverLetter}
          name="coverLetter"
          required
          rows={6}
          aria-describedby={errors.coverLetter ? `${ids.coverLetter}-error` : undefined}
          aria-invalid={errors.coverLetter ? true : undefined}
          className={clsx(
            'border-line bg-surface mt-2 block w-full rounded-md border px-3 py-2 text-sm',
            'focus-visible:border-brand focus-visible:outline-none',
            errors.coverLetter && 'border-red-500',
          )}
        />
        {errors.coverLetter && (
          <p id={`${ids.coverLetter}-error`} className="mt-2 text-sm text-red-600">
            {errors.coverLetter}
          </p>
        )}
      </div>

      {turnstileSiteKey ? (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} aria-label="Anti-spam check" />
      ) : null}

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
        {submitting ? 'Sending…' : 'Submit application'}
      </button>

      <p className="text-ink-subtle text-xs">
        By submitting you agree to be contacted by Precifarm about your application. We never share
        your details with third parties.
      </p>
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
