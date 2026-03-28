'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const supabaseUrl = 'https://ucwekiqdzbdolyesxyla.supabase.co';  // Your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjd2VraXFkemJkb2x5ZXN4eWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODIwMDMsImV4cCI6MjA5MDI1ODAwM30.ByOMtup8VqXMQ4BacI8Mg8PrtLY_ktwRgCjszIv3tc8';  // Your anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchTweets();
  }, []);

  async function fetchTweets() {
    const { data } = await supabase
      .from('tweets')
      .select(`
        id,
        content,
        created_at,
        user_id,
        users (
          email
        )
      `)
      .order('created_at', { ascending: false });

    setTweets(data || []);
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4">Twitter Clone</h1>
          <a href="/login" className="bg-blue-500 px-6 py-2 rounded-full">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Home Feed</h1>
        {tweets.length === 0 ? (
          <p className="text-gray-500">No tweets yet. Create one!</p>
        ) : (
          tweets.map((tweet) => (
            <div key={tweet.id} className="border-b border-gray-800 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <p className="font-semibold">{tweet.users?.email || 'Anonymous'}</p>
              </div>
              <p>{tweet.content}</p>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(tweet.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 px-4 py-2 rounded mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}