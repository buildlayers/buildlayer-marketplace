import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, Github } from 'lucide-react';
import { signIn } from '@/lib/store';

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Demo: derive name from email
    const namePart = email.split('@')[0];
    const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    signIn({ firstName, lastName: '', email });
    navigate('/');
  };

  const handleOAuth = (provider: string) => {
    signIn({ firstName: provider === 'Google' ? 'Google User' : 'GitHub User', lastName: '', email: `user@${provider.toLowerCase()}.com` });
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Sign In — BuildLayer</title>
        <meta name="description" content="Sign in to your BuildLayer account." />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' as const }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-8">
            <img src="/airo-assets/images/logo/horizontal" alt="BuildLayer" className="h-9 w-auto object-contain" />
          </Link>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h1 className="text-2xl font-extrabold text-foreground mb-1">Welcome back</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Don't have an account?{' '}
              <Link to="/sell" className="text-primary font-medium hover:underline">Sign up free</Link>
            </p>

            {/* OAuth */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={() => handleOAuth('Google')}
                className="flex items-center justify-center gap-3 w-full border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button
                onClick={() => handleOAuth('GitHub')}
                className="flex items-center justify-center gap-3 w-full rounded-xl py-3 text-sm font-medium text-white bg-[#0D0D0D] hover:bg-[#1a1a1a] transition-colors"
              >
                <Github size={18} />
                Continue with GitHub
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Email address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-foreground">Password</label>
                  <Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 font-semibold mt-1">
                Sign In
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
