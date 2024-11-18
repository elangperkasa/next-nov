import Image from 'next/image';

type ProductProps = {
  params: { id: string };
};

async function fetchProduct(id: string) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await fetchProduct(params.id);

  return (
    <div className='py-10 px-10'>
      <h1 className="text-xl font-semibold mt-2">{product.title}</h1>
      <div>
        {product.images.map((img: string, index: number) => (
          <Image key={index} src={img} alt={product.title} width={500} height={500} />
        ))}
      </div>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <span>{product.stock > 0 ? 'Available' : 'Out of Stock'}</span>
    </div>
  );
}