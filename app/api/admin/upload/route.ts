// /app/api/admin/upload/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // Ensure the bucket exists (or at least try to)
    // We do this because the "new row violates row-level security policy"
    // can sometimes happen if the bucket isn't properly initialized with policies.
    const { data: buckets } = await supabase.storage.listBuckets();
    const imagesBucket = buckets?.find(b => b.name === 'images');

    if (!imagesBucket) {
      const { error: createBucketError } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      if (createBucketError && createBucketError.message !== 'Bucket already exists') {
        console.error('Failed to create bucket:', createBucketError);
      }
    } else if (!imagesBucket.public) {
      // Ensure the bucket is public so images can be accessed
      await supabase.storage.updateBucket('images', { public: true });
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `products/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error details:', JSON.stringify(uploadError, null, 2));

      // Try to get bucket info to diagnose
      const { data: buckets } = await supabase.storage.listBuckets();
      const imagesBucket = buckets?.find(b => b.name === 'images');

      const isUsingAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      return NextResponse.json({
        error: 'Échec du téléversement vers Supabase Storage',
        details: uploadError.message,
        hint: isUsingAnonKey
          ? "La clé SERVICE_ROLE semble être identique à la clé ANON. Veuillez vérifier vos variables d'environnement."
          : "Vérifiez que le bucket 'images' existe et que les politiques RLS permettent l'insertion.",
        diagnostics: {
          bucketExists: !!imagesBucket,
          isPublic: imagesBucket?.public,
          allBuckets: buckets?.map(b => b.name),
          isUsingAnonKey
        }
      }, { status: 500 });
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return NextResponse.json({ imageUrl: data.publicUrl });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
