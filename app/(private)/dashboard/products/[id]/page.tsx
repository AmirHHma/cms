
import ProductDetailView from "@/app/views/productDetailView";
import { getSpecificProduct } from "../dashboard-products-actions";

 const ProductId = async({params}:{params:{id:string}}) => {
    const {id}=await params

    const theProduct=await getSpecificProduct(id) 
   
    
 return (<ProductDetailView product={theProduct}/>)
}
export default ProductId;