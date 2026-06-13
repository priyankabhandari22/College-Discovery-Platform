'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Plus, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { io } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

interface Discussion {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  user: { id: string; name: string | null; image: string | null };
  _count: { answers: number };
}

export default function DiscussionsPage() {
  const { user, isLoggedIn } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/discussions')
      .then((res) => res.json())
      .then(setDiscussions)
      .catch(() => setError('Failed to load discussions'))
      .finally(() => setLoading(false));
  }, []);

  // Socket.IO — listen for new discussions in real time
  useEffect(() => {
    const socket = io(WS_URL);
    socket.on('new-discussion', (d: Discussion) => {
      setDiscussions((prev) => [d, ...prev]);
    });
    return () => { socket.disconnect(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create');
      }
      setTitle('');
      setContent('');
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Discussions</h1>
            <p className="mt-2 text-sm text-gray-500">Ask questions, share answers, help each other.</p>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Ask Question
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Ask a Question</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question?"
              required
              minLength={5}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide more details..."
              required
              minLength={10}
              rows={4}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {error && <p className="mb-3 text-sm font-semibold text-red-500">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? 'Posting...' : 'Post Question'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl bg-gray-200 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!isLoggedIn && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            <Link href="/login?callbackUrl=/discussions" className="font-bold underline">
              Sign in
            </Link>
            {' '}to ask a question.
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : discussions.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
            <MessageSquare className="mx-auto mb-4 h-10 w-10 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-900">No discussions yet</h2>
            <p className="mt-2 text-sm text-gray-500">Be the first to ask a question!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions.map((d) => (
              <Link
                key={d.id}
                href={`/discussions/${d.id}`}
                className="block rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600">{d.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{d.content}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                  <span>{d.user.name || 'Anonymous'}</span>
                  <span>{new Date(d.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {d._count.answers} {d._count.answers === 1 ? 'answer' : 'answers'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
