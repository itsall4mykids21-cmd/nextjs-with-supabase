import { NextRequest, NextResponse } from 'next/server';
import { SendBotConfigRequest, SendBotConfigResponse } from '@/lib/types/bot';

export async function POST(request: NextRequest) {
  try {
    const body: SendBotConfigRequest = await request.json();
    
    // Validate required fields
    if (!body.botId || !body.knowledgeBaseName || !body.branding?.name) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: botId, knowledgeBaseName, or branding.name' 
        } as SendBotConfigResponse,
        { status: 400 }
      );
    }

    // Here you would typically send this data to your backend service
    // For now, we'll simulate sending and log the data
    console.log('Sending bot configuration:', {
      botId: body.botId,
      knowledgeBaseName: body.knowledgeBaseName,
      branding: body.branding,
      timestamp: body.timestamp || new Date().toISOString()
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const response: SendBotConfigResponse = {
      success: true,
      message: 'Bot configuration sent successfully',
      data: {
        botId: body.botId,
        knowledgeBaseName: body.knowledgeBaseName,
        sentAt: new Date().toISOString()
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error sending bot configuration:', error);
    
    const response: SendBotConfigResponse = {
      success: false,
      message: 'Failed to send bot configuration'
    };

    return NextResponse.json(response, { status: 500 });
  }
}