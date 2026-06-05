import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/airo-assets/images/logo/horizontal"
                alt="BuildLayer logo"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              The marketplace for tools that ship.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} BuildLayer. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built by builders, for builders.
          </p>
        </div>
      </div>
    </footer>
  );
}
