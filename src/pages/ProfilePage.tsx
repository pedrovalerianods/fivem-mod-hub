import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(Boolean(data.session));
      setUsername(data.session?.user?.email ?? null);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoggedIn(Boolean(session));
      setUsername(session?.user?.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleDiscordLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        scopes: 'identify email',
      },
    });

    if (error) {
      toast({ title: 'Login falhou', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Redirecionando', description: 'Autenticação Discord iniciada.' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-surface rounded-xl p-10 text-center max-w-md w-full"
        >
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesse o Vault</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Entre com sua conta Discord para acessar sua biblioteca e compras.
          </p>
          <button onClick={handleDiscordLogin} className="btn-vault w-full flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" strokeWidth={1.5} />
            Entrar com Discord
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="glass-surface rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Bem-vindo ao Vault</h1>
        <p className="text-muted-foreground mb-6">Você está logado como {username ?? 'usuário'}</p>
        <button
          className="btn-vault"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.reload();
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
