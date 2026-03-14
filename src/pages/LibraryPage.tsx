import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Package, Calendar } from 'lucide-react';
import { CATEGORY_MAP, type Product } from '@/types';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function LibraryPage() {
  const [purchased, setPurchased] = useState<Product[]>([]);

  useEffect(() => {
    const loadPurchased = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_files(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar biblioteca', error);
        return;
      }

      setPurchased(
        (data ?? []).map((item: any) => ({
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
        }))
      );
    };

    loadPurchased();
  }, []);

  const handleDownload = (title: string) => {
    toast({
      title: 'Download iniciado',
      description: `Gerando link seguro para "${title}"...`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="section-heading text-3xl mb-2">Minha Biblioteca</h1>
          <p className="text-sm text-muted-foreground mb-10">
            Seus assets adquiridos. Baixe novamente quando quiser.
          </p>
        </motion.div>

        {purchased.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum produto na biblioteca.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {purchased.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-surface-hover rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-category text-[9px]">{CATEGORY_MAP[product.category]}</span>
                    <span className="badge-status bg-green-500/10 text-green-400 border border-green-500/20">
                      Comprado
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground truncate">{product.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {product.createdAt}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {product.files.length} arquivo{product.files.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {product.files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => handleDownload(file.fileName)}
                      className="btn-vault-outline flex items-center gap-2 py-2 px-4 text-xs"
                    >
                      <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {file.fileName}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
