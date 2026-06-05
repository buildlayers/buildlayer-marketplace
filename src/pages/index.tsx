import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Zap, Shield, Users } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────


const featuredTools = [
  {
    id: 1,
    name: 'DataPipe',
    category: 'APIs',
    description: 'Connect, transform, and route data between any two services in minutes. No code required.',
    price: '$29/mo',
    rating: 4.9,
    reviews: 312,
    tag: 'Best Seller',
    large: true,
  },
  {
    id: 2,
    name: 'FlowBot',
    category: 'Automation',
    description: 'Automate repetitive workflows with a visual drag-and-drop builder.',
    price: '$19/mo',
    rating: 4.7,
    reviews: 189,
    tag: 'New',
    large: false,
  },
  {
    id: 3,
    name: 'InsightKit',
    category: 'Analytics',
    description: 'Drop-in analytics for SaaS products. Track events, funnels, and retention.',
    price: '$49/mo',
    rating: 4.8,
    reviews: 241,
    tag: null,
    large: false,
  },
  {
    id: 4,
    name: 'AuthShield',
    category: 'Security',
    description: 'Add enterprise-grade auth to any app in under 10 minutes.',
    price: '$15/mo',
    rating: 4.9,
    reviews: 408,
    tag: 'Top Rated',
    large: true,
  },
  {
    id: 5,
    name: 'LogStream',
    category: 'Dev Tools',
    description: 'Real-time log aggregation and alerting for production apps.',
    price: '$12/mo',
    rating: 4.6,
    reviews: 97,
    tag: null,
    large: false,
  },
  {
    id: 6,
    name: 'PromptLayer',
    category: 'AI & ML',
    description: 'Version, test, and deploy LLM prompts like code. Built for AI teams.',
    price: '$39/mo',
    rating: 4.8,
    reviews: 156,
    tag: 'Trending',
    large: false,
  },
];

const steps = [
  {
    number: '01',
    title: 'Browse',
    description: 'Explore hundreds of curated tools across every category. Filter by use case, price, and rating.',
  },
  {
    number: '02',
    title: 'Buy',
    description: 'One-click purchase. Instant access. No long contracts — pay monthly or annually.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Integrate in minutes with clear docs and direct support from the tool\'s creator.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-border fill-border'}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: typeof featuredTools[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' as const }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
      className={`bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-shadow duration-200 ${
        tool.large ? 'md:row-span-2' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-sm">{tool.name[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm leading-tight">{tool.name}</h3>
            <span className="text-xs text-muted-foreground">{tool.category}</span>
          </div>
        </div>
        {tool.tag && (
          <Badge
            variant="secondary"
            className="text-xs shrink-0 bg-primary/10 text-primary border-0 font-medium"
          >
            {tool.tag}
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className={`text-sm text-muted-foreground leading-relaxed ${tool.large ? '' : 'line-clamp-2'}`}>
        {tool.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <StarRating rating={tool.rating} />
        <span className="text-sm font-semibold text-foreground">{tool.price}</span>
      </div>
    </motion.div>
  );
}

// ─── Hero mockup cards ────────────────────────────────────────────────────────

function HeroMockup() {
  const mockTools = [
    { name: 'DataPipe', cat: 'APIs', price: '$29/mo', color: 'bg-violet-500' },
    { name: 'FlowBot', cat: 'Automation', price: '$19/mo', color: 'bg-indigo-500' },
    { name: 'AuthShield', cat: 'Security', price: '$15/mo', color: 'bg-blue-500' },
    { name: 'PromptLayer', cat: 'AI & ML', price: '$39/mo', color: 'bg-purple-500' },
  ];

  return (
    <div className="relative w-full h-full min-h-[420px] select-none">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#0D0D0D 1px, transparent 1px), linear-gradient(90deg, #0D0D0D 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Card 1 — large, top-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' as const }}
        className="absolute top-0 left-0 w-[200px] bg-white border border-border rounded-2xl p-4 shadow-lg"
      >
        <div className={`w-8 h-8 rounded-lg ${mockTools[0].color} mb-3 flex items-center justify-center`}>
          <Zap size={14} className="text-white" />
        </div>
        <p className="font-semibold text-sm text-foreground">{mockTools[0].name}</p>
        <p className="text-xs text-muted-foreground mb-2">{mockTools[0].cat}</p>
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />)}
        </div>
        <span className="text-xs font-bold text-primary">{mockTools[0].price}</span>
      </motion.div>

      {/* Card 2 — top-right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' as const }}
        className="absolute top-4 right-0 w-[175px] bg-white border border-border rounded-2xl p-4 shadow-md"
      >
        <div className={`w-8 h-8 rounded-lg ${mockTools[1].color} mb-3 flex items-center justify-center`}>
          <Shield size={14} className="text-white" />
        </div>
        <p className="font-semibold text-sm text-foreground">{mockTools[1].name}</p>
        <p className="text-xs text-muted-foreground mb-2">{mockTools[1].cat}</p>
        <span className="text-xs font-bold text-primary">{mockTools[1].price}</span>
      </motion.div>

      {/* Card 3 — middle-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' as const }}
        className="absolute top-[170px] left-[30px] w-[190px] bg-white border border-border rounded-2xl p-4 shadow-md"
      >
        <div className={`w-8 h-8 rounded-lg ${mockTools[2].color} mb-3 flex items-center justify-center`}>
          <Users size={14} className="text-white" />
        </div>
        <p className="font-semibold text-sm text-foreground">{mockTools[2].name}</p>
        <p className="text-xs text-muted-foreground mb-2">{mockTools[2].cat}</p>
        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">Top Rated</Badge>
      </motion.div>

      {/* Card 4 — bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5, ease: 'easeOut' as const }}
        className="absolute top-[200px] right-[10px] w-[165px] bg-[#0D0D0D] border border-white/10 rounded-2xl p-4 shadow-xl"
      >
        <div className={`w-8 h-8 rounded-lg ${mockTools[3].color} mb-3 flex items-center justify-center`}>
          <Zap size={14} className="text-white" />
        </div>
        <p className="font-semibold text-sm text-white">{mockTools[3].name}</p>
        <p className="text-xs text-white/50 mb-2">{mockTools[3].cat}</p>
        <span className="text-xs font-bold text-primary">{mockTools[3].price}</span>
      </motion.div>

      {/* Floating stat badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' as const }}
        className="absolute bottom-0 left-[50%] -translate-x-1/2 bg-primary text-white rounded-full px-4 py-2 text-xs font-semibold shadow-lg whitespace-nowrap"
      >
        500+ tools available
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>BuildLayer — The Marketplace for Tech Tools</title>
        <meta
          name="description"
          content="Discover, buy, and sell small tech tools in one place. BuildLayer is the marketplace for startups and builders — think App Store for indie dev tools."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-background pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Subtle grid bg */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#5B4FE8 1px, transparent 1px), linear-gradient(90deg, #5B4FE8 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' as const }}
              >
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary/10 text-primary border-0 font-medium px-3 py-1"
                >
                  Built by builders, for builders
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-6"
              >
                The marketplace<br />
                <span className="text-primary">for tools</span><br />
                that ship.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
                className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md"
              >
                One place to discover, buy, and sell small tech tools. Stop hunting across the internet — everything your startup needs is right here.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg" className="font-semibold px-8 h-12 text-base">
                  <Link to="/tools">
                    Browse Tools
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-semibold px-8 h-12 text-base border-foreground/20 hover:border-primary hover:text-primary transition-colors duration-150"
                >
                  <Link to="/sell">Sell Your Tool</Link>
                </Button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' as const }}
                className="flex items-center gap-6 mt-10 pt-10 border-t border-border"
              >
                {[
                  { value: '500+', label: 'Tools listed' },
                  { value: '12k+', label: 'Active buyers' },
                  { value: '4.8★', label: 'Avg. rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Mockup */}
            <div className="hidden lg:block relative h-[420px]">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Tools ── */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Curated picks
              </p>
              <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
                Featured tools
              </h2>
            </div>
            <Link
              to="/tools"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-[auto_auto] gap-5">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button asChild variant="outline" className="font-semibold">
              <Link to="/tools">View all tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-muted py-24 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Simple by design
            </p>
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' as const }}
                className="relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+20px)] w-[calc(100%-40px)] h-px bg-border" />
                )}
                <span className="block text-7xl font-extrabold text-foreground/[0.06] leading-none mb-4 select-none">
                  {step.number}
                </span>
                <h3 className="text-2xl font-extrabold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seller CTA ── */}
      <section className="relative overflow-hidden bg-[#0D0D0D] py-28">
        {/* Geometric accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
          <div className="absolute top-1/2 right-[-40px] -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/[0.06]" />
          <div className="absolute top-1/2 right-[20px] -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-primary/20" />
          <div className="absolute top-1/2 right-[80px] -translate-y-1/2 w-[140px] h-[140px] rounded-full bg-primary/10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' as const }}
              className="text-xs font-semibold uppercase tracking-widest text-primary mb-4"
            >
              For creators & indie devs
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
              className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            >
              Build it.<br />
              List it.<br />
              <span className="text-primary">Earn.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
              className="text-white/60 text-lg leading-relaxed mb-10"
            >
              Turn your side project into recurring revenue. List your tool on BuildLayer and reach thousands of startups actively looking for exactly what you built.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
            >
              <Button
                asChild
                size="lg"
                className="font-semibold px-10 h-13 text-base bg-primary hover:bg-primary/90"
              >
                <Link to="/sell">
                  Start Selling
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' as const }}
              className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/10"
            >
              {[
                { value: '0%', label: 'Setup fee' },
                { value: '5%', label: 'Platform cut' },
                { value: '24h', label: 'To go live' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
