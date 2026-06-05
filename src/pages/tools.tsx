import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Search, SlidersHorizontal, Star, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getUserTools, onToolsChange, type Tool } from '@/lib/store';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATIC_TOOLS: Tool[] = [
  { id: 1, name: 'DataPipe', category: 'APIs', description: 'Connect, transform, and route data between any two services in minutes. No code required.', tagline: '', price: 29, priceLabel: '$29/mo', pricingModel: 'monthly', website: '', rating: 4.9, reviews: 312, tag: 'Best Seller' },
  { id: 2, name: 'FlowBot', category: 'Automation', description: 'Automate repetitive workflows with a visual drag-and-drop builder. Supports 200+ integrations.', tagline: '', price: 19, priceLabel: '$19/mo', pricingModel: 'monthly', website: '', rating: 4.7, reviews: 189, tag: 'New' },
  { id: 3, name: 'InsightKit', category: 'Analytics', description: 'Drop-in analytics for SaaS products. Track events, funnels, and retention without the bloat.', tagline: '', price: 49, priceLabel: '$49/mo', pricingModel: 'monthly', website: '', rating: 4.8, reviews: 241, tag: null },
  { id: 4, name: 'AuthShield', category: 'Security', description: 'Add enterprise-grade auth to any app in under 10 minutes. SSO, MFA, and role-based access.', tagline: '', price: 15, priceLabel: '$15/mo', pricingModel: 'monthly', website: '', rating: 4.9, reviews: 408, tag: 'Top Rated' },
  { id: 5, name: 'LogStream', category: 'Dev Tools', description: 'Real-time log aggregation and alerting for production apps. Never miss a critical error again.', tagline: '', price: 12, priceLabel: '$12/mo', pricingModel: 'monthly', website: '', rating: 4.6, reviews: 97, tag: null },
  { id: 6, name: 'PromptLayer', category: 'AI & ML', description: 'Version, test, and deploy LLM prompts like code. Built for AI teams shipping fast.', tagline: '', price: 39, priceLabel: '$39/mo', pricingModel: 'monthly', website: '', rating: 4.8, reviews: 156, tag: 'Trending' },
  { id: 7, name: 'FormForge', category: 'Productivity', description: 'Build powerful forms with logic, payments, and file uploads. Embed anywhere in seconds.', tagline: '', price: 9, priceLabel: '$9/mo', pricingModel: 'monthly', website: '', rating: 4.5, reviews: 203, tag: null },
  { id: 8, name: 'CacheLayer', category: 'Dev Tools', description: 'Managed Redis caching with a dead-simple API. Speed up your app without the ops overhead.', tagline: '', price: 22, priceLabel: '$22/mo', pricingModel: 'monthly', website: '', rating: 4.7, reviews: 134, tag: null },
  { id: 9, name: 'NotiFlow', category: 'Communication', description: 'Multi-channel notifications (email, SMS, push, Slack) from a single unified API.', tagline: '', price: 18, priceLabel: '$18/mo', pricingModel: 'monthly', website: '', rating: 4.6, reviews: 88, tag: 'New' },
  { id: 10, name: 'VaultDB', category: 'Databases', description: 'Encrypted, serverless database for sensitive data. HIPAA and SOC2 compliant out of the box.', tagline: '', price: 59, priceLabel: '$59/mo', pricingModel: 'monthly', website: '', rating: 4.9, reviews: 72, tag: null },
  { id: 11, name: 'PayKit', category: 'Payments', description: 'Add subscriptions, one-time payments, and invoicing to any app. Stripe-compatible API.', tagline: '', price: 0, priceLabel: 'Free tier', pricingModel: 'free', website: '', rating: 4.8, reviews: 445, tag: 'Popular' },
  { id: 12, name: 'SearchMesh', category: 'APIs', description: 'Full-text search as a service. Typo-tolerant, blazing fast, and easy to integrate.', tagline: '', price: 35, priceLabel: '$35/mo', pricingModel: 'monthly', website: '', rating: 4.7, reviews: 119, tag: null },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'reviews', label: 'Most Reviewed' },
];

const PRICE_RANGES = [
  { value: 'all', label: 'Any price' },
  { value: 'free', label: 'Free tier' },
  { value: '0-20', label: 'Under $20/mo' },
  { value: '20-50', label: '$20–$50/mo' },
  { value: '50+', label: '$50+/mo' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={11}
            className={i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-border fill-border'}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{rating} ({reviews})</span>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' as const }}
      whileHover={{ y: -3, boxShadow: '0 16px 32px rgba(0,0,0,0.09)' }}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-extrabold text-base">{tool.name[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground leading-tight">{tool.name}</h3>
            <span className="text-xs text-muted-foreground">{tool.category}</span>
          </div>
        </div>
        {tool.tag && (
          <Badge variant="secondary" className="text-xs shrink-0 bg-primary/10 text-primary border-0 font-medium">
            {tool.tag}
          </Badge>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {tool.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <StarRating rating={tool.rating} reviews={tool.reviews} />
        <span className="text-sm font-bold text-foreground">{tool.priceLabel}</span>
      </div>

      <Button asChild size="sm" className="w-full font-semibold mt-1">
        <Link to={`/tools/${tool.id}`}>View Tool</Link>
      </Button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [userTools, setUserTools] = useState<Tool[]>(getUserTools());

  // Re-render when new tools are submitted
  useEffect(() => {
    return onToolsChange(() => setUserTools(getUserTools()));
  }, []);

  const ALL_TOOLS = useMemo(() => [...userTools, ...STATIC_TOOLS], [userTools]);

  const filtered = useMemo(() => {
    let tools = [...ALL_TOOLS];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Price
    if (priceRange === 'free') tools = tools.filter((t) => t.price === 0);
    else if (priceRange === '0-20') tools = tools.filter((t) => t.price > 0 && t.price < 20);
    else if (priceRange === '20-50') tools = tools.filter((t) => t.price >= 20 && t.price <= 50);
    else if (priceRange === '50+') tools = tools.filter((t) => t.price > 50);

    // Sort
    if (sortBy === 'rating') tools.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price-asc') tools.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') tools.sort((a, b) => b.price - a.price);
    else if (sortBy === 'reviews') tools.sort((a, b) => b.reviews - a.reviews);

    return tools;
  }, [search, priceRange, sortBy, ALL_TOOLS]);

  const activeFiltersCount = [priceRange !== 'all'].filter(Boolean).length;

  const clearFilters = () => {
    setPriceRange('all');
    setSearch('');
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Featured';

  return (
    <>
      <Helmet>
        <title>Browse Tools — BuildLayer</title>
        <meta name="description" content="Discover and buy hundreds of curated tech tools for startups and developers. Filter by category, price, and rating." />
      </Helmet>

      {/* ── Page header ── */}
      <section className="bg-background border-b border-border pt-12 pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-1">
              Browse Tools
            </h1>
            <p className="text-muted-foreground text-sm">
              {ALL_TOOLS.length} tools available for startups and builders
            </p>
          </motion.div>

          {/* Search bar */}          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' as const }}
            className="mt-6 flex gap-3"
          >
            <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools by name, category, or keyword..."
                className="pl-10 h-11 text-sm bg-background"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter toggle (mobile) */}
            <Button
              variant="outline"
              size="sm"
              className="h-11 gap-2 font-medium md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="bg-muted/40 min-h-screen py-10">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {/* ── Sidebar filters (desktop) ── */}
            <aside className="hidden md:block w-56 shrink-0">
              <div className="bg-card border border-border rounded-2xl p-5 sticky top-28">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-sm text-foreground">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Price
                  </p>
                  <div className="flex flex-col gap-2">
                    {PRICE_RANGES.map((range) => (
                      <label key={range.value} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          onClick={() => setPriceRange(range.value)}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            priceRange === range.value
                              ? 'border-primary bg-primary'
                              : 'border-border group-hover:border-primary'
                          }`}
                        >
                          {priceRange === range.value && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <span
                          onClick={() => setPriceRange(range.value)}
                          className={`text-sm transition-colors ${
                            priceRange === range.value ? 'text-foreground font-medium' : 'text-muted-foreground'
                          }`}
                        >
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Min. Rating
                  </p>
                  <div className="flex flex-col gap-2">
                    {[4.5, 4.0, 3.5].map((r) => (
                      <button
                        key={r}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} size={11} className={i <= Math.floor(r) ? 'fill-yellow-400 text-yellow-400' : 'text-border fill-border'} />
                          ))}
                        </div>
                        <span>{r}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Mobile filters panel ── */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setShowFilters(false)}>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' as const }}
                  className="absolute right-0 top-0 bottom-0 w-72 bg-card p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X size={18} className="text-muted-foreground" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Price</p>
                    <div className="flex flex-col gap-3">
                      {PRICE_RANGES.map((range) => (
                        <label key={range.value} className="flex items-center gap-3 cursor-pointer">
                          <div
                            onClick={() => setPriceRange(range.value)}
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              priceRange === range.value ? 'border-primary bg-primary' : 'border-border'
                            }`}
                          >
                            {priceRange === range.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-sm text-muted-foreground">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full font-semibold" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </motion.div>
              </div>
            )}

            {/* ── Tool grid ── */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span> tools found
                </p>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded-lg px-3 py-2 hover:border-primary transition-colors bg-card"
                  >
                    {currentSortLabel}
                    <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-20 min-w-[180px] py-1 overflow-hidden">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                            sortBy === opt.value ? 'text-primary font-semibold' : 'text-foreground'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Active filter chips */}
              {priceRange !== 'all' && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {priceRange !== 'all' && (
                    <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                      {PRICE_RANGES.find((r) => r.value === priceRange)?.label}
                      <button onClick={() => setPriceRange('all')}><X size={11} /></button>
                    </span>
                  )}
                </div>
              )}

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl font-extrabold text-foreground mb-2">No tools found</p>
                  <p className="text-muted-foreground text-sm mb-6">Try adjusting your search or filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="font-semibold">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
