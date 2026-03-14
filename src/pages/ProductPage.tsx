import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, FileText, Download } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { CATEGORY_MAP } from '@/types';
import { toast } from '@/hooks/use-toast';

export default function ProductPage() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

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
