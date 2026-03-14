import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/30 backdrop-blur-xl mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" strokeWidth={1.5} />
            <span className="text-sm font-bold tracking-tight text-foreground">
              VAULT<span className="text-primary">.5M</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 VAULT.5M — The Professional Standard for FiveM Assets.
          </p>
        </div>
      </div>
    </footer>
  );
}
