// /app/api/admin/abonnes/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();

  // 1. Fetch all orders with a non-null email, ordered by creation date
  const { data: commandes, error } = await supabase
    .from('commandes')
    .select('client_email, date_creation')
    .not('client_email', 'is', null)
    .order('date_creation', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 2. Process in JavaScript to get unique emails and their first order date
  const subscribersMap = new Map();
  commandes.forEach(commande => {
    // Since the query is ordered by date ascending, the first time we see an email, it's the first order.
    if (commande.client_email && !subscribersMap.has(commande.client_email)) {
      subscribersMap.set(commande.client_email, {
        // The frontend page expects id, email, and date_abonnement
        id: commande.client_email, // Use email as a unique ID for the key prop
        email: commande.client_email,
        date_abonnement: commande.date_creation,
      });
    }
  });

  const uniqueSubscribers = Array.from(subscribersMap.values());

  // 3. Sort by date descending to show the newest subscribers first
  uniqueSubscribers.sort((a, b) => new Date(b.date_abonnement).getTime() - new Date(a.date_abonnement).getTime());

  return NextResponse.json(uniqueSubscribers);
}
