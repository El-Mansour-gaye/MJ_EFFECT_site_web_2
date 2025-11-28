// components/order-summary.tsx
"use client";

import { useCartStore } from '@/lib/store/cart';
import Image from 'next/image';

export const OrderSummary = () => {
    const { cart_content } = useCartStore();

    const subtotal = cart_content.reduce((acc, item) => acc + item.prix_fcfa * item.quantite, 0);
    const deliveryFee = subtotal > 0 ? 500 : 0;
    const total = subtotal + deliveryFee;

    if (cart_content.length === 0) {
        return null;
    }

    return (
        <div className="border rounded-lg p-6 shadow-lg bg-background">
            <h2 className="text-2xl font-semibold mb-6">Résumé de la Commande</h2>

            <div className="space-y-4 mb-6">
                {cart_content.map(item => (
                    <div key={item.produit_id} className="flex items-center">
                        <Image
                            src={item.image_url || '/placeholder.svg'}
                            alt={item.nom}
                            width={64}
                            height={64}
                            className="rounded-md object-cover mr-4"
                        />
                        <div className="flex-grow">
                            <p className="font-medium">{item.nom}</p>
                            <p className="text-sm text-muted-foreground">Qté: {item.quantite}</p>
                        </div>
                        <p className="font-medium">
                            {(item.prix_fcfa * item.quantite).toLocaleString()} FCFA
                        </p>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span>{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{total.toLocaleString()} FCFA</span>
                </div>
            </div>
        </div>
    );
};
