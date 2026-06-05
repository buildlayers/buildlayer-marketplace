import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, addUserTool } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Globe,
  Github,
  Tag,
  FileText,
  DollarSign,
  User,
  Mail,
  Lock,
  ChevronDown,
  Upload,
  Zap,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'APIs', 'Automation', 'Analytics', 'Dev Tools',
  'AI & ML', 'Productivity', 'Security', 'Databases', 'Payments', 'Communication',
];

const PRICING_MODELS = [
  { value: 'monthly', label: 'Monthly subscription', example: 'e.g. $19/mo' },
  { value: 'annual', label: 'Annual subscription', example: 'e.g. $190/yr' },
  { value: 'one-time', label: 'One-time purchase', example: 'e.g. $99' },
  { value: 'free', label: 'Free (open source / freemium)', example: '' },
];

const STEPS = [
  { id: 1, label: 'Account', icon: User },
  { id: 2, label: 'Tool Info', icon: FileText },
  { id: 3, label: 'Pricing', icon: DollarSign },
  { id: 4, label: 'Review', icon: Check },
];

// ─── Step components ──────────────────────────────────────────────────────────

function StepAccount({
  data,
  onChange,
}: {
  data: Record<string, string>;
  onChange: (k: string, v: string) => void;
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-extrabold text-foreground mb-1">Create your seller account</h2>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="#" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>

      {/* OAuth buttons */}
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 w-full border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-3 w-full border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors bg-[#0D0D0D] text-white border-[#0D0D0D] hover:bg-[#1a1a1a]">
          <Github size={18} />
          Continue with GitHub
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or sign up with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Email form */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">First name</label>
            <Input
              placeholder="Jane"
              value={data.firstName ?? ''}
              onChange={(e) => onChange('firstName', e.target.value)}
              className="h-11"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Last name</label>
            <Input
              placeholder="Smith"
              value={data.lastName ?? ''}
              onChange={(e) => onChange('lastName', e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">Email address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="jane@example.com"
              value={data.email ?? ''}
              onChange={(e) => onChange('email', e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={data.password ?? ''}
              onChange={(e) => onChange('password', e.target.value)}
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
      </div>

      <p className="text-xs text-muted-foreground">
        By creating an account you agree to our{' '}
        <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}

function StepToolInfo({
  data,
  onChange,
}: {
  data: Record<string, string>;
  onChange: (k: string, v: string) => void;
}) {
  const [catOpen, setCatOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-extrabold text-foreground mb-1">Tell us about your tool</h2>
        <p className="text-sm text-muted-foreground">This is what buyers will see on your listing.</p>
      </div>

      {/* Tool name */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">Tool name *</label>
        <div className="relative">
          <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="e.g. DataPipe"
            value={data.toolName ?? ''}
            onChange={(e) => onChange('toolName', e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </div>

      {/* Tagline */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">Short tagline *</label>
        <Input
          placeholder="One sentence that sells your tool (max 100 chars)"
          maxLength={100}
          value={data.tagline ?? ''}
          onChange={(e) => onChange('tagline', e.target.value)}
          className="h-11"
        />
        <p className="text-xs text-muted-foreground mt-1">{(data.tagline ?? '').length}/100</p>
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">Full description *</label>
        <textarea
          placeholder="Describe what your tool does, who it's for, and what makes it different..."
          value={data.description ?? ''}
          onChange={(e) => onChange('description', e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-colors"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">Category *</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCatOpen(!catOpen)}
            className="w-full flex items-center justify-between h-11 px-4 rounded-xl border border-border bg-background text-sm hover:border-primary transition-colors"
          >
            <span className={data.category ? 'text-foreground' : 'text-muted-foreground'}>
              {data.category || 'Select a category'}
            </span>
            <ChevronDown size={15} className={`text-muted-foreground transition-transform ${catOpen ? 'rotate-180' : ''}`} />
          </button>
          {catOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-20 py-1 overflow-hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { onChange('category', cat); setCatOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                    data.category === cat ? 'text-primary font-semibold' : 'text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">Tool website / landing page *</label>
        <div className="relative">
          <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://yourtool.com"
            value={data.website ?? ''}
            onChange={(e) => onChange('website', e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </div>

      {/* GitHub (optional) */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">
          GitHub repo <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <div className="relative">
          <Github size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://github.com/you/your-tool"
            value={data.github ?? ''}
            onChange={(e) => onChange('github', e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </div>

      {/* Logo upload */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">
          Tool logo <span className="text-muted-foreground font-normal">(optional — PNG or SVG, 512×512px)</span>
        </label>
        <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer bg-muted/30">
          <Upload size={20} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Drag & drop or <span className="text-primary font-medium">browse</span></p>
        </div>
      </div>
    </div>
  );
}

function StepPricing({
  data,
  onChange,
}: {
  data: Record<string, string>;
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-extrabold text-foreground mb-1">Set your pricing</h2>
        <p className="text-sm text-muted-foreground">BuildLayer takes a 5% cut. You keep the rest.</p>
      </div>

      {/* Pricing model */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-3 block">Pricing model *</label>
        <div className="flex flex-col gap-3">
          {PRICING_MODELS.map((model) => (
            <label
              key={model.value}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                data.pricingModel === model.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              <div
                onClick={() => onChange('pricingModel', model.value)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  data.pricingModel === model.value ? 'border-primary bg-primary' : 'border-border'
                }`}
              >
                {data.pricingModel === model.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1" onClick={() => onChange('pricingModel', model.value)}>
                <p className="text-sm font-semibold text-foreground">{model.label}</p>
                {model.example && <p className="text-xs text-muted-foreground">{model.example}</p>}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price input */}
      {data.pricingModel && data.pricingModel !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <label className="text-xs font-semibold text-foreground mb-1.5 block">Price *</label>
          <div className="relative">
            <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              min="1"
              placeholder="0"
              value={data.price ?? ''}
              onChange={(e) => onChange('price', e.target.value)}
              className="pl-10 h-11 w-48"
            />
          </div>
        </motion.div>
      )}

      {/* Free trial */}
      <div>
        <label className="text-xs font-semibold text-foreground mb-1.5 block">
          Free trial <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <div className="flex gap-3">
          {['No trial', '7 days', '14 days', '30 days'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange('trial', opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                (data.trial ?? 'No trial') === opt
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue estimate */}
      {data.price && data.pricingModel !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-4"
        >
          <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
            <Zap size={12} /> Revenue estimate
          </p>
          <p className="text-sm text-foreground">
            At 100 customers: <span className="font-bold">${(Number(data.price) * 0.95 * 100).toLocaleString()}</span> / {data.pricingModel === 'one-time' ? 'total' : data.pricingModel === 'annual' ? 'yr' : 'mo'} after BuildLayer's 5% fee.
          </p>
        </motion.div>
      )}
    </div>
  );
}

function StepReview({ data }: { data: Record<string, string> }) {
  const pricingLabel = PRICING_MODELS.find((m) => m.value === data.pricingModel)?.label ?? '—';

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-foreground mb-1">Review your listing</h2>
        <p className="text-sm text-muted-foreground">Everything look good? Submit to go live within 24 hours.</p>
      </div>

      {/* Preview card */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-extrabold text-lg">{(data.toolName || 'T')[0]}</span>
          </div>
          <div>
            <h3 className="font-bold text-foreground">{data.toolName || 'Your Tool Name'}</h3>
            <span className="text-xs text-muted-foreground">{data.category || 'Category'}</span>
          </div>
          <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary border-0 text-xs">
            Pending Review
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{data.tagline || 'Your tagline will appear here.'}</p>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Pricing</p>
            <p className="font-semibold text-foreground">{pricingLabel}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Price</p>
            <p className="font-semibold text-foreground">
              {data.pricingModel === 'free' ? 'Free' : data.price ? `$${data.price}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Website</p>
            <p className="font-semibold text-foreground truncate">{data.website || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Free trial</p>
            <p className="font-semibold text-foreground">{data.trial || 'No trial'}</p>
          </div>
        </div>
      </div>

      {/* Account summary */}
      <div className="bg-muted rounded-xl p-4 text-sm">
        <p className="font-semibold text-foreground mb-1">Seller account</p>
        <p className="text-muted-foreground">
          {data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : 'Name not set'} &middot;{' '}
          {data.email || 'Email not set'}
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        By submitting, your listing will be reviewed by the BuildLayer team within 24 hours. You'll receive an email when it's live.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SellPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (step === 1) return !!(formData.email && formData.password && formData.firstName);
    if (step === 2) return !!(formData.toolName && formData.tagline && formData.category && formData.website);
    if (step === 3) return !!formData.pricingModel;
    return true;
  };

  const handleSubmit = () => {
    // Sign the user in
    signIn({
      firstName: formData.firstName || 'Seller',
      lastName: formData.lastName || '',
      email: formData.email || '',
    });
    // Add tool to the shared store so it appears in Browse
    const price = formData.pricingModel === 'free' ? 0 : Number(formData.price) || 0;
    addUserTool({
      id: Date.now(),
      name: formData.toolName,
      category: formData.category,
      description: formData.description || formData.tagline,
      tagline: formData.tagline,
      price,
      priceLabel: formData.pricingModel === 'free' ? 'Free' : price ? `$${price}/${formData.pricingModel === 'annual' ? 'yr' : formData.pricingModel === 'one-time' ? 'one-time' : 'mo'}` : 'Free',
      pricingModel: formData.pricingModel,
      website: formData.website,
      github: formData.github,
      rating: 0,
      reviews: 0,
      tag: 'New',
      submittedBy: formData.email,
      isUserSubmitted: true,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' as const }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold text-foreground mb-3">You're live!</h2>
          <p className="text-muted-foreground mb-8">
            <strong className="text-foreground">{formData.toolName}</strong> has been listed and is now visible in Browse Tools. You're signed in as <strong className="text-foreground">{formData.email}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="font-semibold" onClick={() => navigate('/tools')}>
              View in Browse
            </Button>
            <Button asChild variant="outline" className="font-semibold">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sell Your Tool — BuildLayer</title>
        <meta name="description" content="List your tech tool on BuildLayer and reach thousands of startups. Create an account, add your tool details, and go live in 24 hours." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">

            {/* ── Left: Steps + Form ── */}
            <div>
              {/* Step indicator */}
              <div className="flex items-center gap-0 mb-10">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          step > s.id
                            ? 'bg-primary text-white'
                            : step === s.id
                            ? 'bg-primary text-white ring-4 ring-primary/20'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step > s.id ? <Check size={15} /> : s.id}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${step === s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`h-px w-12 sm:w-20 mx-1 mb-5 transition-colors ${step > s.id ? 'bg-primary' : 'bg-border'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Form card */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: 'easeOut' as const }}
                  >
                    {step === 1 && <StepAccount data={formData} onChange={handleChange} />}
                    {step === 2 && <StepToolInfo data={formData} onChange={handleChange} />}
                    {step === 3 && <StepPricing data={formData} onChange={handleChange} />}
                    {step === 4 && <StepReview data={formData} />}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  {step > 1 ? (
                    <Button
                      variant="ghost"
                      onClick={() => setStep(step - 1)}
                      className="gap-2 font-medium text-muted-foreground"
                    >
                      <ArrowLeft size={15} /> Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={!canProceed()}
                      className="gap-2 font-semibold px-6"
                    >
                      Continue <ArrowRight size={15} />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="gap-2 font-semibold px-8 bg-primary hover:bg-primary/90"
                    >
                      Submit Listing <Check size={15} />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Why sell on BuildLayer ── */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="bg-[#0D0D0D] rounded-2xl p-8 text-white mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Why BuildLayer</p>
                  <h3 className="text-2xl font-extrabold mb-6 leading-tight">
                    The fastest way to monetize your tool.
                  </h3>
                  <div className="flex flex-col gap-5">
                    {[
                      { icon: Zap, title: 'Go live in 24h', desc: 'Submit today, get reviewed and listed tomorrow.' },
                      { icon: DollarSign, title: 'Keep 95%', desc: 'We take just 5%. No hidden fees, no setup costs.' },
                      { icon: Globe, title: '12k+ active buyers', desc: 'Startups actively searching for tools like yours.' },
                      { icon: Check, title: 'Built-in trust', desc: 'Verified listings, reviews, and buyer protection.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <item.icon size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-white">{item.title}</p>
                          <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted border border-border rounded-2xl p-5 text-sm">
                  <p className="font-semibold text-foreground mb-1">Questions?</p>
                  <p className="text-muted-foreground text-xs mb-3">
                    Send us an email and we'll get back to you.
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full font-medium">
                    <a href="mailto:buildlayer1@gmail.com">buildlayer1@gmail.com</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
