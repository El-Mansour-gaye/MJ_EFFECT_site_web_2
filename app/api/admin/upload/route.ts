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
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `products/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from('images') // Assumes a 'images' bucket in Supabase Storage
      .upload(filePath, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error details:', JSON.stringify(uploadError, null, 2));
      return NextResponse.json({
        error: 'Failed to upload image',
        details: uploadError.message
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
