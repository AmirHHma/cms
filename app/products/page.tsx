import { Category } from "../generated/prisma";
import { GetInitialProducts, GetMostExpensiveWithFilters } from "./action";
import ProductList from "./productList";
export type Filter = {
  category: Category;
  max: string;
  min: string;
  search: string;
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams:Filter;
}) => {
  const { category,  search } =await searchParams;
  
  
  
  const mostExpensiveProduct=await GetMostExpensiveWithFilters({category,search})|| 10000;
  
  const {max=String(mostExpensiveProduct),min='0'}=await searchParams;
  const initialFilters = { category, search ,max,min};
  const initialProducts = await GetInitialProducts(initialFilters) 

  return <ProductList mostExpensiveProduct={mostExpensiveProduct} products={initialProducts} initialFilters={initialFilters}/>
};
export default ProductPage;
