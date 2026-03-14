import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Shield, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(Boolean(data.session));
      setUserEmail(data.session?.user?.email ?? null);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ title: 'Email obrigatório', description: 'Digite seu email para login.' });
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({ email: email.trim() });
    if (error) {
      toast({ title: 'Erro ao enviar link', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Link enviado', description: 'Verifique seu email para fazer login.' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-slate-950 text-slate-100">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-surface rounded-xl p-10 text-center max-w-md w-full">
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesse sua conta</h1>
          <p className="text-sm text-muted-foreground mb-8">Insira seu email para receber o link mágico de login.</p>
          <form onSubmit={handleMagicLink} className="space-y-3">
            <input
              type="email"
              className="input-vault w-full"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-vault w-full flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" /> Enviar Link
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="glass-surface rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Bem-vindo</h1>
        <p className="text-muted-foreground mb-6">Você está logado como <strong>{userEmail ?? 'usuário'}</strong>.</p>
        <button
          className="btn-vault flex items-center justify-center gap-2"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.reload();
          }}
        >
          <LogOut className="h-4 w-4" /> Sair
        </button>
      </div>
    </div>
  );
}
