import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // List files in user's folder
    const { data, error } = await supabase.storage
      .from("images")
      .list(user.id, {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" }
      });

    if (error) {
      console.error("List images error:", error);
      return NextResponse.json({ 
        error: "Failed to fetch images" 
      }, { status: 500 });
    }

    // Get public URLs for all images
    const images = data?.map(file => {
      const filePath = `${user.id}/${file.name}`;
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);
      
      return {
        name: file.name,
        url: publicUrl,
        size: file.metadata?.size || 0,
        createdAt: file.created_at
      };
    }) || [];

    return NextResponse.json({ images });

  } catch (error) {
    console.error("List images error:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}