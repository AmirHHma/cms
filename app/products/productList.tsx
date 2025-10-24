"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "../generated/prisma";
import {  useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Filtering from "../components/Filtering";
import { Filter } from "./page";
import { Spinner } from "@/components/ui/spinner";
import { GetProductsLazily } from "./action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ProductList = ({
  products: Products,
  initialFilters: filters,
  mostExpensiveProduct,
}: {
  products: Product[] | undefined;
  initialFilters: Filter;
  mostExpensiveProduct: number;
}) => {
  const formatter = Intl.NumberFormat("en-us");
  const divReference = useRef<HTMLDivElement>(null);

  // const [filters,setFilters]=useState(initialFilters)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[] | undefined>(Products);
  let searchParams = useSearchParams();

  const LoadProductsLazily = useCallback(
    async (pageToLoad: number) => {

      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const dta = await GetProductsLazily(pageToLoad, filters);
        if (dta?.length === 0) {
          setHasMore(false);
        }

        setProducts((prev) => [...(prev as Product[]), ...(dta as Product[])]);
      } catch {
        console.error;
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore,filters]
  );

  useEffect(() => {

    setProducts(() => Products);
    setHasMore(true);
    setPage(1);
  }, [searchParams.toString()]);

  useEffect(() => {
        if(!Products||products?.length===0)return;
    if(!divReference.current)return;
    let isReady=false
    const observer = new IntersectionObserver(async (en) => {
      const [entry] = en;
      if (entry.isIntersecting && !loading && hasMore&& isReady) {
        await LoadProductsLazily(page + 1);
        setPage((pg) => pg + 1);
      }
    });
    if (divReference.current) {
      observer.observe(divReference.current);
    }
    const timeout=setTimeout(() => {
      isReady=true;
    }, 300);
    return () => {
      if(divReference.current){
      observer.unobserve(divReference.current); 
      }
      clearTimeout(timeout);
    }
  }, [loading, hasMore,products]);

  return (
    <div className="grid lg:grid-cols-[5fr_1fr] grid-cols-1 mt-20 sm:px-3 md:px-5 lg:px-10 gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {products &&
          products.map((prod) => (
           <Link href={`/products/${prod.id}`}  key={prod.id}>
             <Card
              className="rounded-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-150 cursor-pointer "
            >
              <CardHeader>
                  <Image
                    className="w-full object-cover rounded-lg aspect-square"
                    width={200}
                    height={200}
                    alt={prod.name}
                    src={prod.src || "/no-image.webp"}
                  />
              </CardHeader>
              <CardContent>
                <CardTitle>{prod.name}</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="fill-amber-400 w-4 h-4 " />
                  <span>{prod.rating ?? "N/A"}</span>
                </div>
              </CardContent>
              {}
              <CardFooter>${formatter.format(prod.price)}</CardFooter>
            </Card>
           </Link>
          ))}
      </div>

      <Filtering filters={filters} mostExpensive={mostExpensiveProduct} />
      <div ref={divReference} className="text-center p-4">
        {loading ? (
          <div className="flex justify-center">
            <Spinner className="size-14 text-blue-400" />
          </div>
        ) : hasMore ? (
          "Scroll to load more"
        ) : (
          "No more products"
        )}
      </div>
    </div>
  );
};
export default ProductList;
