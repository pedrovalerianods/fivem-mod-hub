import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Menu, X, User, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/files', label: 'Meus arquivos' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/30">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Shield className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            VAULT<span className="text-primary">.5M</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  active
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/perfil" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="h-7 w-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
            Perfil
          </Link>
          <Link to="/files" className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
            <LayoutDashboard className="h-3.5 w-3.5" strokeWidth={1.5} />
            Meus arquivos
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-surface border-t border-border/30 px-4 pb-4"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/perfil" onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground hover:text-primary">
            Perfil
          </Link>
          <Link to="/files" onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground hover:text-primary">
            Meus arquivos
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
