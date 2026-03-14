import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Zap, Lock, Download } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, type Product } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_files(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar produtos', error);
        return;
      }

      const parsed = (data ?? []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        price: Number(item.price ?? 0),
        videoUrl: item.video_url ?? '',
        imageUrl: item.image_url ?? '',
        createdAt: item.created_at ?? '',
        files: (item.product_files ?? []).map((f: any) => ({
          id: f.id,
          productId: f.product_id,
          fileName: f.file_name,
          fileType: f.file_type,
        })),
      }));

      setProducts(parsed);
    };

    loadProducts();
  }, []);

  const featured = products[0];
  const newest = products.slice(0, 6);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-glow-pulse" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="max-w-3xl"
          >
            <div className="badge-category mb-6 inline-flex">PLATAFORMA DE ELITE</div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              The Professional Standard for{' '}
              <span className="text-gradient-primary">FiveM Assets</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Arquitetura de som e performance, protegida por criptografia de ponta.
              Compre, baixe e gerencie seus mods com segurança absoluta.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/perfil" className="btn-vault inline-flex items-center gap-2">
                Entrar / Registrar
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link to="/files" className="btn-vault-outline inline-flex items-center gap-2">
                Meus arquivos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b border-border/20 bg-card/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'Downloads Seguros', desc: 'Links temporários com expiração' },
              { icon: Zap, title: 'Alta Performance', desc: 'Assets otimizados para FiveM' },
              { icon: Download, title: 'Acesso Vitalício', desc: 'Baixe novamente quando quiser' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/15">
                  <f.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Categorias</h2>
          <Link to="/categorias" className="text-sm text-primary hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={`/categorias?cat=${cat.id}`}
                className="glass-surface-hover flex flex-col items-center gap-2 rounded-xl p-5 text-center"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="section-heading mb-8">Novos Assets</h2>
        {newest.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Nenhum produto encontrado.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {newest.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} featured={i === 0} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
