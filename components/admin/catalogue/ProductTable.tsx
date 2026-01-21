// components/admin/catalogue/ProductTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Archive, ArchiveRestore } from 'lucide-react';
import { Product } from '@/app/admin/(protected)/catalogue/page';
import { Badge } from '@/components/ui/badge';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onArchive: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, onArchive }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Prix (FCFA)</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className={product.is_archived ? "opacity-60 bg-muted/50" : ""}>
            <TableCell className="font-medium">
              {product.nom}
            </TableCell>
            <TableCell>{product.prix_fcfa.toLocaleString()}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              {product.is_archived ? (
                <Badge variant="secondary">Archivé</Badge>
              ) : (
                <Badge variant="outline" className="text-green-600 border-green-600">Actif</Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(product)} title="Modifier">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onArchive(product)}
                  title={product.is_archived ? "Désarchiver" : "Archiver"}
                >
                  {product.is_archived ? <ArchiveRestore className="h-4 w-4 text-blue-600" /> : <Archive className="h-4 w-4 text-orange-600" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(product.id!)} title="Supprimer">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
