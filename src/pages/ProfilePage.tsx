import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Shield, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
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

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: 'Dados obrigatórios', description: 'Email e senha são necessários.' });
      return;
    }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
      if (error) {
        toast({ title: 'Erro no login', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Logado', description: 'Você está logado com sucesso.' });
      return;
    }

    const { error } = await supabase.auth.signUp({ email: email.trim(), password: password.trim() });
    if (error) {
      toast({ title: 'Erro no cadastro', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Conta criada', description: 'Conta criada. Faça login com sua senha.' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-slate-950 text-slate-100">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-surface rounded-xl p-10 text-center max-w-md w-full">
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesse sua conta</h1>
          <p className="text-sm text-muted-foreground mb-8">Use email + senha para acessar seus arquivos.</p>
          <form onSubmit={handleAuth} className="space-y-3">
            <input
              type="email"
              className="input-vault w-full"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-vault w-full"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button type="submit" className="btn-vault w-full flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" /> {mode === 'login' ? 'Entrar' : 'Registrar'}
            </button>
          </form>
          <div className="text-xs text-muted-foreground">
            {mode === 'login' ? (
              <>Ainda não tem conta? <button onClick={() => setMode('register')} className="text-primary underline">Registrar</button></>
            ) : (
              <>Já tem conta? <button onClick={() => setMode('login')} className="text-primary underline">Entrar</button></>
            )}
          </div>
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
