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

    // Verify bucket exists and is accessible
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      return NextResponse.json({
        error: 'Storage error',
        details: `Failed to list buckets: ${bucketError.message}`
      }, { status: 500 });
    }

    const bucketName = 'images';
    const foundBucket = buckets.find(b => b.name.toLowerCase() === bucketName.toLowerCase());

    if (!foundBucket) {
      const availableBuckets = buckets.map(b => b.name).join(', ');
      return NextResponse.json({
        error: 'Bucket not found',
        details: `The '${bucketName}' bucket does not exist. Available buckets: [${availableBuckets}]. Please create a bucket named 'images' (case-sensitive if possible) in the Supabase dashboard.`
      }, { status: 500 });
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `products/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(foundBucket.name)
      .upload(filePath, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error details:', JSON.stringify(uploadError, null, 2));

      let hint = "";
      if (uploadError.message.includes("row-level security")) {
        hint = " Check if SUPABASE_SERVICE_ROLE_KEY is correctly set and that the 'images' bucket exists with proper RLS policies (or RLS disabled).";
      }

      return NextResponse.json({
        error: 'Failed to upload image',
        details: uploadError.message + hint
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
