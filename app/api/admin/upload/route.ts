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

    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);

    const supabase = createSupabaseAdmin();

    // Try to list buckets for diagnostic purposes, but don't block the upload
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    const bucketName = 'images';
    let targetBucket = bucketName;

    if (bucketError) {
      console.warn('Supabase storage listBuckets error:', bucketError.message);
    } else if (buckets) {
      const foundBucket = buckets.find(b => b.name.toLowerCase() === bucketName.toLowerCase());
      if (foundBucket) {
        targetBucket = foundBucket.name;
      } else {
        const bucketList = buckets.map(b => b.name).join(', ');
        console.warn(`Bucket '${bucketName}' not found in available buckets: [${bucketList}]`);
      }
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `products/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(filePath, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error details:', JSON.stringify(uploadError, null, 2));

      let hint = "";
      if (uploadError.message.includes("row-level security")) {
        hint = " IMPORTANT: This error ('row-level security') almost always means the SUPABASE_SERVICE_ROLE_KEY is invalid or is actually the 'anon' key. Please verify you are using the 'service_role' key from the Supabase dashboard settings.";
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
