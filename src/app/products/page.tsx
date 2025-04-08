'use client'
import { useEffect, useState } from 'react';
import { ProductType } from '../types/products';
import { api } from '@/utils/axios';

export default function Products() {

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/products')
        if (response.data)
          setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div>
      <pre>
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
