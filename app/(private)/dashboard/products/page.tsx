import ProductList from "@/app/views/productView";
import { getProducts } from "./dashboard-products-actions";

 const Products = async({searchParams}:{searchParams:{page:string}}) => {
  let temp=await searchParams
   const currentPage=parseInt(temp.page) ||1
   const quantity=5

    const {Products,count}=await getProducts(quantity,currentPage)
 return ( <>
 <ProductList currentPage={currentPage} Products={Products} count={count}/>
 </>);
}
export default Products;