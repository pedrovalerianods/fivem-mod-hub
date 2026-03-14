import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, FileText, Download } from 'lucide-react';
import { CATEGORY_MAP, type Product } from '@/types';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_files(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar produto', error);
        setLoading(false);
        return;
      }

      const parsed = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: Number(data.price ?? 0),
        videoUrl: data.video_url ?? '',
        imageUrl: data.image_url ?? '',
        createdAt: data.created_at ?? '',
        files: (data.product_files ?? []).map((f: any) => ({
          id: f.id,
          productId: f.product_id,
          fileName: f.file_name,
          fileType: f.file_type,
        })),
      } as Product;

      setProduct(parsed);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Produto não encontrado.</p>
      </div>
    );
  }

  const handleBuy = () => {
    toast({
      title: 'Sistema de pagamento',
      description: 'Integração de pagamento será configurada com Lovable Cloud.',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/categorias" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Voltar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Video / Image - 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden glass-surface">
              {product.videoUrl ? (
                <iframe
                  src={product.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/20">
                  <span className="text-6xl opacity-20">📦</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info panel - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-surface rounded-xl p-6 sticky top-24">
              <span className="badge-category">{CATEGORY_MAP[product.category]}</span>
              <h1 className="mt-4 text-2xl font-bold text-foreground">{product.title}</h1>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Files */}
              <div className="mt-6 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Arquivos inclusos
                </p>
                {product.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2.5 border border-border/30"
                  >
                    <FileText className="h-4 w-4 text-primary shrink-0" strokeWidth={1.5} />
                    <span className="text-xs font-mono text-foreground/80 truncate">{file.fileName}</span>
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground uppercase">{file.fileType}</span>
                  </div>
                ))}
              </div>

              {/* Price + Buy */}
              <div className="mt-8 border-t border-border/30 pt-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-mono tracking-wider">Preço</p>
                    <p className="text-3xl font-bold text-foreground font-mono tabular-nums">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button onClick={handleBuy} className="btn-vault w-full flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
                  Adquirir Licença
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
