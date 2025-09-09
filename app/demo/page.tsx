import { ImageUpload } from "@/components/image-upload";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Image Upload Demo</h1>
            <p className="text-muted-foreground">
              This is a demonstration of the image upload functionality.
              In the real application, this would be available on the protected page after user authentication.
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <ImageUpload />
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-800 mb-2">Note:</h3>
            <p className="text-sm text-amber-700">
              This demo uses mock data since Supabase credentials are not configured. 
              In a production environment, images would be uploaded to Supabase Storage and persisted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}