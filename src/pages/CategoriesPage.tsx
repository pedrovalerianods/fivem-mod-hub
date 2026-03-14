import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { CATEGORIES, type Category } from '@/types';

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = (searchParams.get('cat') as Category) || null;

  const filtered = activeCategory
    ? MOCK_PRODUCTS.filter((p) => p.category === activeCategory)
    : MOCK_PRODUCTS;

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-heading text-3xl mb-8"
        >
          {activeCategory
            ? CATEGORIES.find((c) => c.id === activeCategory)?.label
            : 'Todas as Categorias'}
        </motion.h1>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSearchParams({})}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              !activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ cat: cat.id })}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">Nenhum produto nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
