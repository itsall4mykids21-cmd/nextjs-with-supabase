import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BotConfigForm } from "@/components/bot-config-form";

export default async function BotConfigPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-4">Bot Configuration</h1>
        <p className="text-muted-foreground mb-8">
          Configure and send your bot ID, knowledge base name, and branding information.
        </p>
      </div>
      
      <BotConfigForm />
    </div>
  );
}