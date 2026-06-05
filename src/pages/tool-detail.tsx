import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  ArrowLeft,
  Globe,
  Github,
  Download,
  ExternalLink,
  Check,
  Shield,
  Zap,
  Users,
  ChevronRight,
} from 'lucide-react';
import { getUserTools, type Tool } from '@/lib/store';

// ─── Static tool data (mirrors tools.tsx) ─────────────────────────────────────

const STATIC_TOOLS: Tool[] = [
  { id: 1, name: 'DataPipe', category: 'APIs', tagline: 'Connect any two services in minutes — no code required.', description: 'DataPipe lets you connect, transform, and route data between any two services in minutes. No code required. Supports REST, GraphQL, webhooks, and 150+ pre-built connectors. Built for startups that move fast and need reliable data pipelines without the DevOps overhead.\n\nKey features:\n• Visual pipeline builder with drag-and-drop\n• 150+ pre-built connectors (Stripe, Salesforce, Postgres, S3, and more)\n• Real-time and scheduled sync modes\n• Built-in error handling and retry logic\n• Audit logs and monitoring dashboard\n• SOC2 Type II certified', price: 29, priceLabel: '$29/mo', pricingModel: 'monthly', website: 'https://datapipe.example.com', github: '', rating: 4.9, reviews: 312, tag: 'Best Seller' },
  { id: 2, name: 'FlowBot', category: 'Automation', tagline: 'Automate repetitive workflows with a visual builder.', description: 'FlowBot is a no-code automation platform with a visual drag-and-drop builder. Supports 200+ integrations including Slack, Gmail, Notion, GitHub, and more. Build multi-step workflows with conditional logic, loops, and error handling — all without writing a single line of code.\n\nKey features:\n• Visual drag-and-drop workflow builder\n• 200+ native integrations\n• Conditional logic and branching\n• Scheduled and event-triggered automations\n• Team collaboration and version history\n• 99.9% uptime SLA', price: 19, priceLabel: '$19/mo', pricingModel: 'monthly', website: 'https://flowbot.example.com', github: '', rating: 4.7, reviews: 189, tag: 'New' },
  { id: 3, name: 'InsightKit', category: 'Analytics', tagline: 'Drop-in analytics for SaaS — events, funnels, retention.', description: 'InsightKit is a lightweight analytics platform built specifically for SaaS products. Drop in a single script tag and start tracking events, funnels, and retention in minutes. No data sampling, no bloat — just the metrics that matter.\n\nKey features:\n• Single-line installation\n• Event tracking with custom properties\n• Funnel analysis and conversion tracking\n• Cohort retention charts\n• User journey visualization\n• GDPR-compliant data storage', price: 49, priceLabel: '$49/mo', pricingModel: 'monthly', website: 'https://insightkit.example.com', github: '', rating: 4.8, reviews: 241, tag: null },
  { id: 4, name: 'AuthShield', category: 'Security', tagline: 'Enterprise-grade auth for any app in under 10 minutes.', description: 'AuthShield gives you enterprise-grade authentication out of the box. Add SSO, MFA, and role-based access control to any app in under 10 minutes with our drop-in SDK. Trusted by 400+ teams.\n\nKey features:\n• Email/password, OAuth, and magic link auth\n• Multi-factor authentication (TOTP, SMS, hardware keys)\n• Single Sign-On (SAML 2.0, OIDC)\n• Role-based access control (RBAC)\n• Session management and device tracking\n• SOC2 and HIPAA compliant', price: 15, priceLabel: '$15/mo', pricingModel: 'monthly', website: 'https://authshield.example.com', github: '', rating: 4.9, reviews: 408, tag: 'Top Rated' },
  { id: 5, name: 'LogStream', category: 'Dev Tools', tagline: 'Real-time log aggregation and alerting for production.', description: 'LogStream aggregates logs from all your services in real time and makes them searchable in seconds. Set up alerts, create dashboards, and debug production issues faster than ever.\n\nKey features:\n• Real-time log ingestion and search\n• Structured and unstructured log support\n• Custom alert rules with Slack/email notifications\n• Log retention up to 90 days\n• Team access controls\n• OpenTelemetry compatible', price: 12, priceLabel: '$12/mo', pricingModel: 'monthly', website: 'https://logstream.example.com', github: '', rating: 4.6, reviews: 97, tag: null },
  { id: 6, name: 'PromptLayer', category: 'AI & ML', tagline: 'Version, test, and deploy LLM prompts like code.', description: 'PromptLayer is the developer platform for LLM prompt management. Version your prompts, run A/B tests, track performance, and deploy changes without touching your codebase. Built for AI teams that ship fast.\n\nKey features:\n• Prompt versioning and history\n• A/B testing and performance tracking\n• Multi-model support (OpenAI, Anthropic, Gemini)\n• Team collaboration and review workflows\n• Cost tracking and optimization\n• REST API and Python/JS SDKs', price: 39, priceLabel: '$39/mo', pricingModel: 'monthly', website: 'https://promptlayer.example.com', github: '', rating: 4.8, reviews: 156, tag: 'Trending' },
  { id: 7, name: 'FormForge', category: 'Productivity', tagline: 'Powerful forms with logic, payments, and file uploads.', description: 'FormForge lets you build powerful forms with conditional logic, payment collection, and file uploads — then embed them anywhere in seconds. No backend required.\n\nKey features:\n• Drag-and-drop form builder\n• Conditional logic and branching\n• Stripe payment integration\n• File upload support (up to 1GB)\n• Embed anywhere with a single line of code\n• Webhook and Zapier integrations', price: 9, priceLabel: '$9/mo', pricingModel: 'monthly', website: 'https://formforge.example.com', github: '', rating: 4.5, reviews: 203, tag: null },
  { id: 8, name: 'CacheLayer', category: 'Dev Tools', tagline: 'Managed Redis caching with a dead-simple API.', description: 'CacheLayer is managed Redis caching with a dead-simple API. Speed up your app without the ops overhead. Provision a cache in 30 seconds and start caching with a single function call.\n\nKey features:\n• Managed Redis clusters\n• Simple REST and SDK API\n• Auto-scaling and failover\n• Global edge locations\n• Built-in cache invalidation patterns\n• Usage-based pricing', price: 22, priceLabel: '$22/mo', pricingModel: 'monthly', website: 'https://cachelayer.example.com', github: '', rating: 4.7, reviews: 134, tag: null },
  { id: 9, name: 'NotiFlow', category: 'Communication', tagline: 'Multi-channel notifications from a single unified API.', description: 'NotiFlow gives you a single API to send notifications across email, SMS, push, and Slack. Manage templates, track delivery, and handle preferences — all in one place.\n\nKey features:\n• Unified API for email, SMS, push, and Slack\n• Drag-and-drop template editor\n• Delivery tracking and analytics\n• User preference management\n• Retry logic and fallback channels\n• GDPR-compliant opt-out handling', price: 18, priceLabel: '$18/mo', pricingModel: 'monthly', website: 'https://notiflow.example.com', github: '', rating: 4.6, reviews: 88, tag: 'New' },
  { id: 10, name: 'VaultDB', category: 'Databases', tagline: 'Encrypted, serverless database for sensitive data.', description: 'VaultDB is an encrypted, serverless database built for sensitive data. HIPAA and SOC2 compliant out of the box. Store PII, health records, and financial data with confidence.\n\nKey features:\n• End-to-end encryption at rest and in transit\n• Serverless — no infrastructure to manage\n• HIPAA and SOC2 Type II certified\n• Automatic backups and point-in-time recovery\n• Fine-grained access control\n• REST and GraphQL APIs', price: 59, priceLabel: '$59/mo', pricingModel: 'monthly', website: 'https://vaultdb.example.com', github: '', rating: 4.9, reviews: 72, tag: null },
  { id: 11, name: 'PayKit', category: 'Payments', tagline: 'Subscriptions, one-time payments, and invoicing — free tier.', description: 'PayKit makes it easy to add subscriptions, one-time payments, and invoicing to any app. Stripe-compatible API means you can switch without rewriting your integration.\n\nKey features:\n• Subscription and one-time payment support\n• Automated invoicing and receipts\n• Stripe-compatible API\n• Dunning management and retry logic\n• Revenue analytics dashboard\n• Free tier for up to $10k MRR', price: 0, priceLabel: 'Free tier', pricingModel: 'free', website: 'https://paykit.example.com', github: '', rating: 4.8, reviews: 445, tag: 'Popular' },
  { id: 12, name: 'SearchMesh', category: 'APIs', tagline: 'Full-text search as a service — typo-tolerant and fast.', description: 'SearchMesh is full-text search as a service. Typo-tolerant, blazing fast, and easy to integrate. Add powerful search to any app in minutes with our REST API and SDKs.\n\nKey features:\n• Typo-tolerant full-text search\n• Faceted filtering and sorting\n• Instant search with sub-50ms response times\n• Synonyms and custom ranking rules\n• Multi-language support\n• REST API and JS/Python/Go SDKs', price: 35, priceLabel: '$35/mo', pricingModel: 'monthly', website: 'https://searchmesh.example.com', github: '', rating: 4.7, reviews: 119, tag: null },
];

function getAllTools(): Tool[] {
  return [...getUserTools(), ...STATIC_TOOLS];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            className={i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-border fill-border'}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{rating > 0 ? rating : 'No ratings yet'}</span>
      {reviews > 0 && <span className="text-sm text-muted-foreground">({reviews} reviews)</span>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToolDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tool = getAllTools().find((t) => t.id === Number(id));

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-2xl font-extrabold text-foreground">Tool not found</p>
        <Button asChild variant="outline">
          <Link to="/tools">Back to Browse</Link>
        </Button>
      </div>
    );
  }

  const descriptionParagraphs = tool.description.split('\n\n');

  return (
    <>
      <Helmet>
        <title>{tool.name} — BuildLayer</title>
        <meta name="description" content={tool.tagline || tool.description.slice(0, 160)} />
      </Helmet>

      {/* ── Breadcrumb ── */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/tools" className="hover:text-foreground transition-colors">Browse</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">{tool.name}</span>
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="container mx-auto px-6 py-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

            {/* ── Left: Main content ── */}
            <div>
              {/* Back link */}
              <Link
                to="/tools"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft size={14} /> Back to Browse
              </Link>

              {/* Tool header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' as const }}
                className="flex items-start gap-5 mb-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-extrabold text-2xl">{tool.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{tool.name}</h1>
                    {tool.tag && (
                      <Badge className="bg-primary/10 text-primary border-0 font-medium">{tool.tag}</Badge>
                    )}
                    {tool.isUserSubmitted && (
                      <Badge variant="secondary" className="text-xs font-medium">Community</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{tool.category}</p>
                  <StarRating rating={tool.rating} reviews={tool.reviews} />
                </div>
              </motion.div>

              {/* Tagline */}
              {tool.tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' as const }}
                  className="text-xl text-foreground font-medium leading-relaxed mb-8 border-l-4 border-primary pl-4"
                >
                  {tool.tagline}
                </motion.p>
              )}

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' as const }}
                className="prose prose-sm max-w-none mb-10"
              >
                {descriptionParagraphs.map((para, i) => {
                  if (para.startsWith('Key features:')) {
                    const lines = para.split('\n');
                    return (
                      <div key={i} className="mt-6">
                        <h3 className="text-base font-bold text-foreground mb-3">{lines[0]}</h3>
                        <ul className="flex flex-col gap-2">
                          {lines.slice(1).map((line, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <Check size={14} className="text-primary mt-0.5 shrink-0" />
                              <span>{line.replace(/^[•\-]\s*/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {para}
                    </p>
                  );
                })}
              </motion.div>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: Shield, title: 'Verified Listing', desc: 'Reviewed by BuildLayer team' },
                  { icon: Zap, title: 'Quick Integration', desc: 'Up and running in minutes' },
                  { icon: Users, title: 'Active Community', desc: 'Support from real users' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 bg-muted rounded-xl p-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviews placeholder */}
              <div className="border-t border-border pt-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Reviews {tool.reviews > 0 ? `(${tool.reviews})` : ''}
                </h2>
                {tool.reviews === 0 ? (
                  <div className="bg-muted rounded-xl p-6 text-center">
                    <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this tool.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {[
                      { name: 'Alex M.', rating: 5, text: 'Saved us weeks of development time. Integration was seamless and the docs are excellent.' },
                      { name: 'Sarah K.', rating: 5, text: 'Exactly what we needed. The support team is incredibly responsive too.' },
                      { name: 'James T.', rating: 4, text: 'Great tool overall. Would love to see more advanced filtering options but it does the job well.' },
                    ].map((review) => (
                      <div key={review.name} className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-foreground">{review.name}</span>
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((i) => (
                              <Star key={i} size={12} className={i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-border fill-border'} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Purchase card ── */}
            <div>
              <div className="sticky top-28">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' as const }}
                  className="bg-card border border-border rounded-2xl p-6 mb-4"
                >
                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-extrabold text-foreground">{tool.priceLabel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">
                      {tool.pricingModel === 'free' ? 'Free to use' : tool.pricingModel === 'one-time' ? 'One-time purchase' : `Billed ${tool.pricingModel}`}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 mb-5">
                    <Button className="w-full h-11 font-semibold gap-2">
                      <Download size={16} />
                      {tool.price === 0 ? 'Get for Free' : 'Buy Now'}
                    </Button>
                    {tool.website && (
                      <Button asChild variant="outline" className="w-full h-11 font-medium gap-2">
                        <a href={tool.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} />
                          Visit Website
                        </a>
                      </Button>
                    )}
                    {tool.github && (
                      <Button asChild variant="ghost" className="w-full h-11 font-medium gap-2 text-muted-foreground">
                        <a href={tool.github} target="_blank" rel="noopener noreferrer">
                          <Github size={14} />
                          View on GitHub
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="border-t border-border pt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-foreground">{tool.category}</span>
                    </div>
                    {tool.reviews > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-medium text-foreground">{tool.rating} / 5.0</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reviews</span>
                      <span className="font-medium text-foreground">{tool.reviews > 0 ? tool.reviews : 'None yet'}</span>
                    </div>
                    {tool.website && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Website</span>
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline flex items-center gap-1"
                        >
                          <Globe size={12} /> Visit
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Guarantee */}
                <div className="bg-muted rounded-xl p-4 text-xs text-muted-foreground flex items-start gap-2.5">
                  <Shield size={14} className="text-primary shrink-0 mt-0.5" />
                  <p>All purchases are protected by BuildLayer's 30-day money-back guarantee.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
