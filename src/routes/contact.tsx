import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

function ContactPage() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await fetch('/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...fields }),
    }).catch(() => {})
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main className="contact-page">
      <h1>Get in Touch</h1>
      <p className="lead">
        Have a stationery recommendation, a question about a post, or just want to say hello?
        Fill in the form below and I will get back to you as soon as I can — usually within
        a few days.
      </p>

      <div className="contact-form">
        {submitted ? (
          <div className="success-message">
            <strong>Message received!</strong> Thank you for writing. I will be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: 'none' }}>
              <label>Do not fill this out: <input name="bot-field" /></label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <select
                id="contact-subject"
                name="subject"
                value={fields.subject}
                onChange={handleChange}
              >
                <option value="">Select a topic…</option>
                <option value="General">General enquiry</option>
                <option value="Review request">Product review request</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Press">Press enquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={fields.message}
                onChange={handleChange}
                required
                placeholder="What would you like to say?"
                style={{ minHeight: '150px' }}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
