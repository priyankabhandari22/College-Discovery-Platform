'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Loader2, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { io } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

interface Answer {
  id: string;
  content: string;
  userId: string;
  discussionId: string;
  createdAt: string;
  user: { id: string; name: string | null; image: string | null };
}

interface DiscussionDetail {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  user: { id: string; name: string | null; image: string | null };
  answers: Answer[];
}

export default function DiscussionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [discussion, setDiscussion] = useState<DiscussionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/discussions/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setDiscussion)
      .catch(() => router.push('/discussions'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  // Socket.IO — join discussion room, listen for new answers
  useEffect(() => {
    const socket = io(WS_URL);
    socket.emit('join-discussion', params.id);

    socket.on('new-answer', (answer: Answer) => {
      if (answer.discussionId === params.id) {
        setDiscussion((prev) => {
          if (!prev) return prev;
          if (prev.answers.some((a) => a.id === answer.id)) return prev;
          return { ...prev, answers: [...prev.answers, answer] };
        });
      }
    });

    return () => {
      socket.emit('leave-discussion', params.id);
      socket.disconnect();
    };
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/discussions/${params.id}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: answerText }),
      });
      if (!res.ok) throw new Error('Failed to post');
      setAnswerText('');
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </main>
    );
  }

  if (!discussion) return null;

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/discussions"
          className="mb-6 inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discussions
        </Link>

        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6">
          <h1 className="text-2xl font-black text-gray-900">{discussion.title}</h1>
          <p className="mt-1 text-xs text-gray-400">
            Asked by {discussion.user.name || 'Anonymous'} &middot;{' '}
            {new Date(discussion.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </p>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{discussion.content}</p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-bold text-gray-900">
            {discussion.answers.length} {discussion.answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
        </div>

        {discussion.answers.length === 0 ? (
          <div className="mb-6 rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
            <p className="text-sm text-gray-500">No answers yet. Be the first to answer!</p>
          </div>
        ) : (
          <div className="mb-8 space-y-4">
            {discussion.answers.map((a) => (
              <div key={a.id} className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
                    {(a.user.name || 'A')[0].toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-600">{a.user.name || 'Anonymous'}</span>
                  <span>{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{a.content}</p>
              </div>
            ))}
          </div>
        )}

        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="mb-16 rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-900">Your Answer</h3>
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer..."
              rows={3}
              required
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              disabled={submitting || !answerText.trim()}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Posting...' : 'Post Answer'}
            </button>
          </form>
        ) : (
          <div className="mb-16 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            <Link href={`/login?callbackUrl=/discussions/${params.id}`} className="font-bold underline">
              Sign in
            </Link>
            {' '}to post an answer.
          </div>
        )}
      </div>
    </main>
  );
}
