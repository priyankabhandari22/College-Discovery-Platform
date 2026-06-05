'use client';

import Link from 'next/link';
import { Users, ArrowLeft, Phone, Mail } from 'lucide-react';

export default function CounselingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 pt-16">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <Users className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Counseling Help</h1>
          <p className="mt-2 text-sm text-gray-500">Get personalized guidance for your college admissions.</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-bold text-gray-700">Full Name</label>
              <input id="name" type="text" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-bold text-gray-700">Email</label>
              <input id="email" type="email" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="john@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-bold text-gray-700">Phone</label>
            <input id="phone" type="tel" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-bold text-gray-700">Your Query</label>
            <textarea id="message" rows={4} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Tell us about the colleges or courses you're interested in..." />
          </div>
          <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700">
            Submit Request
          </button>
        </form>

        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
          <a href="mailto:counseling@edutrack.dev" className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">
            <Mail className="h-5 w-5 text-blue-600" />
            counseling@edutrack.dev
          </a>
          <a href="tel:+911800123456" className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">
            <Phone className="h-5 w-5 text-blue-600" />
            1800-123-456
          </a>
        </div>

        <Link href="/" className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-blue-600">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
