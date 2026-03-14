import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Upload, Package } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { CATEGORIES, CATEGORY_MAP, type Category } from '@/types';
import { toast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [products] = useState(MOCK_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'mods-de-som' as Category,
    price: '',
    videoUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Produto criado', description: `"${formData.title}" adicionado com sucesso.` });
    setShowForm(false);
    setFormData({ title: '', description: '', category: 'mods-de-som', price: '', videoUrl: '' });
  };

  const handleDelete = (title: string) => {
    toast({ title: 'Produto removido', description: `"${title}" foi excluído.` });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-heading text-3xl">Painel Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Gerencie produtos e assets</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-vault flex items-center gap-2">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Novo Produto
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="glass-surface rounded-xl p-6 mb-10 space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Criar Produto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="input-vault"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <select
                className="input-vault"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <input
                className="input-vault"
                placeholder="Preço (R$)"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input
                className="input-vault"
                placeholder="URL do vídeo (YouTube embed)"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              />
            </div>
            <textarea
              className="input-vault min-h-[80px]"
              placeholder="Descrição do produto"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            {/* File upload zone */}
            <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">Arraste os arquivos ou clique para enviar</p>
              <p className="text-xs text-muted-foreground/60 mt-1">.RPF, .ZIP, .XML, .INI</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="btn-vault-outline">
                Cancelar
              </button>
              <button type="submit" className="btn-vault">
                Publicar Produto
              </button>
            </div>
          </motion.form>
        )}

        {/* Products table */}
        <div className="glass-surface rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Produto</th>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Categoria</th>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Preço</th>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Arquivos</th>
                  <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="h-4 w-4 text-primary" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge-category text-[9px]">{CATEGORY_MAP[product.category]}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm tabular-nums text-foreground">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                      {product.files.length} arquivo{product.files.length > 1 ? 's' : ''}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.title)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
