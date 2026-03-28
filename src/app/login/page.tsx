'use client';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabaseUrl = 'https://ucwekiqdzbdolyesxyla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjd2VraXFkemJkb2x5ZXN4eWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODIwMDMsImV4cCI6MjA5MDI1ODAwM30.ByOMtup8VqXMQ4BacI8Mg8PrtLY_ktwRgCjszIv3tc8';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center mb-8">
          Twitter Clone
        </h1>
        <Auth
          supabaseClient={createClient(supabaseUrl, supabaseAnonKey)}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo="http://localhost:3000/"
        />
      </div>
    </div>
  );
}