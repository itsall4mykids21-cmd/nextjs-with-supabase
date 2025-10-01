"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BotConfiguration, SendBotConfigRequest, SendBotConfigResponse } from "@/lib/types/bot";
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";

export function BotConfigForm() {
  const [config, setConfig] = useState<BotConfiguration>({
    botId: "",
    knowledgeBaseName: "",
    branding: {
      name: "",
      logo: "",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      description: ""
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<SendBotConfigResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const request: SendBotConfigRequest = {
        ...config,
        timestamp: new Date().toISOString()
      };

      const res = await fetch('/api/bot/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: SendBotConfigResponse = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse({
        success: false,
        message: 'Failed to send bot configuration'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (path: string, value: string) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Bot Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bot ID */}
          <div className="space-y-2">
            <Label htmlFor="botId">Bot ID</Label>
            <Input
              id="botId"
              type="text"
              value={config.botId}
              onChange={(e) => updateConfig('botId', e.target.value)}
              placeholder="Enter bot ID"
              required
            />
          </div>

          {/* Knowledge Base Name */}
          <div className="space-y-2">
            <Label htmlFor="knowledgeBaseName">Knowledge Base Name</Label>
            <Input
              id="knowledgeBaseName"
              type="text"
              value={config.knowledgeBaseName}
              onChange={(e) => updateConfig('knowledgeBaseName', e.target.value)}
              placeholder="Enter knowledge base name"
              required
            />
          </div>

          {/* Branding Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Branding</h3>
            
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                type="text"
                value={config.branding.name}
                onChange={(e) => updateConfig('branding.name', e.target.value)}
                placeholder="Enter brand name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandLogo">Logo URL</Label>
              <Input
                id="brandLogo"
                type="url"
                value={config.branding.logo || ""}
                onChange={(e) => updateConfig('branding.logo', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={config.branding.primaryColor || "#000000"}
                  onChange={(e) => updateConfig('branding.primaryColor', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={config.branding.secondaryColor || "#ffffff"}
                  onChange={(e) => updateConfig('branding.secondaryColor', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandDescription">Description</Label>
              <Textarea
                id="brandDescription"
                value={config.branding.description || ""}
                onChange={(e) => updateConfig('branding.description', e.target.value)}
                placeholder="Enter brand description"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Bot Configuration
              </>
            )}
          </Button>

          {/* Response Message */}
          {response && (
            <div className={`flex items-center gap-2 p-3 rounded-md ${
              response.success 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {response.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span className="text-sm">{response.message}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}