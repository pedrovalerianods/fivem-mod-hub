import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORY_MAP, type Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export default function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className={featured ? 'col-span-1 md:col-span-2' : ''}
    >
      <Link to={`/produto/${product.id}`} className="card-product block">
        <div className="relative aspect-video overflow-hidden rounded-t-xl bg-muted/30">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="text-4xl opacity-30">
                {product.category === 'mods-de-som' ? '🔊' : product.category === 'graficos' ? '🎨' : '📦'}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <span className="badge-category absolute bottom-3 left-3">
            {CATEGORY_MAP[product.category]}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
            {product.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-foreground font-mono tabular-nums">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {product.files.length} arquivo{product.files.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
