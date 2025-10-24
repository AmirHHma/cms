import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Product } from "../generated/prisma";
import Pagination from "@/components/ui/pagination";
import { Edit } from "lucide-react";

const ProductList = ({ Products,count ,currentPage}: { Products: Product[] ,count:number,currentPage:number}) => {
  return (
    <div>
      <div className="flex justify-end px-8">
        <Button asChild> 
      <Link prefetch href={'/dashboard/products/add'}>Add product</Link>
</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Count</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          Products.map((prod,i) => (
            <TableRow key={prod.id}>
              
              <TableCell>{i+1}</TableCell>
              <TableCell><Button variant={'outline'} asChild><Link href={`/dashboard/products/${prod.id}`} ><Edit/></Link></Button></TableCell>
              <TableCell>{prod.id.slice(0,8)}+</TableCell>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.category}</TableCell>
              <TableCell>{prod.price}</TableCell>
              <TableCell>{prod.stock}</TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
              <TableCell colSpan={5}><Pagination page={currentPage} totalItems={count} divide={5}  /></TableCell>
          </TableRow>
        </TableFooter>

      </Table>
      
    </div>
  );
};
export default ProductList;
