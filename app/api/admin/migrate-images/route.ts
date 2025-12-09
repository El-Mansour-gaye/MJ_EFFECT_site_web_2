// /app/api/admin/migrate-images/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Simple in-memory lock to prevent concurrent migrations
let isMigrationRunning = false;

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (isMigrationRunning) {
    return NextResponse.json({ message: 'Migration is already in progress.' }, { status: 409 });
  }

  isMigrationRunning = true;
  console.log("Image migration started...");

  const supabase = createSupabaseAdmin();
  let updatedCount = 0;
  let errorCount = 0;

  try {
    // 1. Fetch all products
    const { data: products, error: fetchError } = await supabase
      .from('produits')
      .select('id, image, images');

    if (fetchError) {
      throw new Error(`Failed to fetch products: ${fetchError.message}`);
    }

    // 2. Process each product
    for (const product of products) {
      let needsUpdate = false;
      const newImageUrls: string[] = [];
      const allImages = [product.image, ...(product.images || [])].filter(Boolean) as string[];

      for (const imageUrl of allImages) {
        // 3. Identify local images (starting with '/')
        if (imageUrl && imageUrl.startsWith('/')) {
          try {
            const localPath = path.join(process.cwd(), 'public', imageUrl);
            const fileBuffer = await fs.readFile(localPath);
            const fileExtension = path.extname(imageUrl);
            const fileName = `${uuidv4()}${fileExtension}`;
            const filePath = `products/${fileName}`;

            // 4. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
              .from('images')
              .upload(filePath, fileBuffer, {
                contentType: `image/${fileExtension.substring(1)}`
              });

            if (uploadError) {
                throw new Error(`Supabase upload failed for ${imageUrl}: ${uploadError.message}`);
            }

            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            newImageUrls.push(publicUrlData.publicUrl);
            needsUpdate = true;

          } catch (fileError) {
            console.error(`Could not process local image ${imageUrl} for product ${product.id}:`, fileError);
            // If the file doesn't exist, we just skip it but keep other images
            newImageUrls.push(imageUrl);
            errorCount++;
          }
        } else {
            // Keep existing remote URLs
            newImageUrls.push(imageUrl);
        }
      }

      // 5. Update the product in the database if necessary
      if (needsUpdate) {
        const uniqueUrls = [...new Set(newImageUrls)];
        const { error: updateError } = await supabase
          .from('produits')
          .update({
            image: uniqueUrls.length > 0 ? uniqueUrls[0] : null,
            images: uniqueUrls,
          })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Failed to update product ${product.id}:`, updateError.message);
          errorCount++;
        } else {
          updatedCount++;
        }
      }
    }

    console.log(`Image migration finished. Products updated: ${updatedCount}. Errors: ${errorCount}.`);
    return NextResponse.json({ message: `Migration complete. Products updated: ${updatedCount}. Errors: ${errorCount}.` });

  } catch (error) {
    console.error('An unexpected error occurred during migration:', error);
    return NextResponse.json({ error: 'Migration failed. Check server logs.' }, { status: 500 });
  } finally {
    isMigrationRunning = false;
  }
}
