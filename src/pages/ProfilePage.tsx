import { motion } from 'framer-motion';
import { User, LogIn, Package, History, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const handleDiscordLogin = () => {
    toast({
      title: 'Login com Discord',
      description: 'Autenticação Discord será configurada com Lovable Cloud.',
    });
  };

  // Mock user (not logged in state)
  const isLoggedIn = false;

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

  return null;
}
