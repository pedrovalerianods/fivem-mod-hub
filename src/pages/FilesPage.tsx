import { FormEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, FileText, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadItem {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export default function FilesPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('Configuração');
  const [file, setFile] = useState<File | null>(null);

  const storageKey = useMemo(() => {
    if (!userEmail) return 'fivem-mod-hub-files-guest';
    return `fivem-mod-hub-files-${userEmail}`;
  }, [userEmail]);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserEmail(data.session?.user?.email ?? null);
      setSessionLoaded(true);
    };
    loadSession();
  }, []);

  useEffect(() => {
    if (!sessionLoaded) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UploadItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      } catch {
        setItems([]);
      }
    }
  }, [storageKey, sessionLoaded]);

  useEffect(() => {
    if (!sessionLoaded) return;
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey, sessionLoaded]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !file) {
      toast({ title: 'Dados faltando', description: 'Insira nome e arquivo.' });
      return;
    }

    setItems((prev) => [
      {
        id: `${Date.now()}`,
        name: name.trim(),
        type,
        uploadedAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);
    setName('');
    setFile(null);
    toast({ title: 'Arquivo salvo', description: `${name.trim()} foi adicionado.` });
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({ title: 'Arquivo removido', description: 'O arquivo foi excluído.' });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (!sessionLoaded) {
    return <div className="min-h-screen pt-24">Carregando...</div>;
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="glass-surface rounded-xl p-8 md:p-10 w-full max-w-md text-center">
          <p className="text-lg font-semibold">Faça login para ver seus arquivos</p>
          <a href="/perfil" className="btn-vault mt-4 inline-flex items-center gap-2"><LogOut className="h-4 w-4" /> Ir para login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-950 text-slate-100 px-4">
      <div className="mx-auto w-full max-w-3xl space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-surface rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-primary"><FileText className="h-4 w-4" /> <span className="font-semibold">Meus arquivos</span></div>
              <p className="text-sm text-slate-300">Arquivos são salvos localmente por usuário.</p>
              <p className="text-xs text-slate-400 mt-1">Usuário: <strong>{userEmail}</strong></p>
            </div>
            <button onClick={handleSignOut} className="btn-vault text-xs h-8 px-3 inline-flex items-center gap-1"><LogOut className="h-4 w-4" /> Sair</button>
          </div>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass-surface rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-300"><Upload className="h-4 w-4" /> Adicionar arquivo</div>
          <input className="input-vault w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do arquivo (ex: meu-mod)." />
          <select className="input-vault w-full" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Configuração</option>
            <option>Mod de som</option>
            <option>Outro</option>
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="w-full text-xs text-slate-300" />
          <button className="btn-vault w-full">Adicionar</button>
        </motion.form>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-surface rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Arquivos salvos</div>
            <div className="text-xs text-slate-400">{items.length} arquivo(s)</div>
          </div>
          {items.length === 0 ? (
            <div className="text-slate-400 text-sm">Nenhum arquivo encontrado. Faça upload para exibir aqui.</div>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/40 p-3">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.type} · {item.uploadedAt}</div>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-destructive p-1 rounded hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
