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

    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(filePath, arrayBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error details:', JSON.stringify(uploadError, null, 2));

      let hint = "";
      if (uploadError.message.includes("row-level security") || uploadError.message.includes("Forbidden") || (uploadError as any).status === 403) {
        hint = " IMPORTANT: This error (403/RLS) means the 'service_role' key is not bypassing security. 1) Check that SUPABASE_SERVICE_ROLE_KEY is the correct 'service_role' key (Dashboard -> Settings -> API). 2) Ensure the 'images' bucket is set to 'Public' and RLS is either disabled for it or has a policy for 'service_role'. 3) If nothing works, try running this SQL in Supabase: CREATE POLICY \"Allow All\" ON storage.objects FOR ALL TO public USING (bucket_id = 'images') WITH CHECK (bucket_id = 'images');";
      }

      return NextResponse.json({
        error: 'Failed to upload image',
        details: uploadError.message + hint
      }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from(targetBucket)
      .getPublicUrl(filePath);

    return NextResponse.json({ imageUrl: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
