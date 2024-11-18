"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css'; 

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    setFilteredProducts(filtered);
  }

  function handleSort(order: 'asc' | 'desc') {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
    setFilteredProducts(sorted);
  }

  return (
    <div className='py-10 px-10'>
      <h1 className="text-xl font-semibold mt-2">Product List</h1>
      <div >
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">All</option>
          {Array.from(new Set(products.map(p => p.category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className='py-10'>
        <p className="py-2"><button onClick={() => handleSort('asc')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Sort by Price: Low to High</button></p>        
        
        <button onClick={() => handleSort('desc')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Sort by Price: High to Low</button>        
      </div>
      
      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className={styles.productCard}>
              <Image src={product.images[0]} alt={product.title} width={150} height={150} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}