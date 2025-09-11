export interface BotConfiguration {
  botId: string;
  knowledgeBaseName: string;
  branding: BotBranding;
}

export interface BotBranding {
  name: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  description?: string;
}

export interface SendBotConfigRequest {
  botId: string;
  knowledgeBaseName: string;
  branding: BotBranding;
  timestamp: string;
}

export interface SendBotConfigResponse {
  success: boolean;
  message: string;
  data?: {
    botId: string;
    knowledgeBaseName: string;
    sentAt: string;
  };
}