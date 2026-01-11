
import { GoogleGenAI, Type, Modality } from "@google/genai";

/**
 * Logistics AI Service
 * Provides predictive analytics, fleet optimization, and customer support via Gemini.
 * Adheres to expert initialization and grounding guidelines.
 */
export const aiLogisticsService = {
  /**
   * Generates deep-thinking fleet optimization suggestions using Pro models and Maps grounding.
   */
  async getFleetOptimizationInsights(currentStats: any) {
    // Initialize fresh instance at call-site
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const prompt = `
        Analyze current logistics throughput for SwiftDrop:
        - Active Orders: ${currentStats.orders || 0}
        - Online Units: ${currentStats.drivers || 0}
        - Delayed/Stale: ${currentStats.pending || 0}
        - Primary Hotspots: Sunset District, Downtown Core, SoMa
        
        Using Google Maps context, provide 3 strategic deployment adjustments for the next 4-hour window.
        Focus on reducing "Pending Dispatch" and improving "Average Delivery Time".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the Lead Logistics Orchestrator. Your tone is clinical and strategic. Use Maps grounding to verify location-based recommendations.",
          tools: [{ googleMaps: {} }],
          // Use thinking budget for complex reasoning tasks
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });

      return {
        text: response.text || "Analysis currently unavailable.",
        grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (err) {
      console.error("Gemini Pro Integration Error:", err);
      return { text: "Unable to calibrate fleet via AI layer. Check System Relay.", grounding: [] };
    }
  },

  /**
   * Creates a stateful chat session with Search grounding for the help desk.
   */
  createSupportChat() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `
          You are the SwiftDrop AI Assistant. Help users with tracking, policies, and navigation.
          Always use Google Search to verify real-world conditions like weather or traffic if relevant.
        `,
        tools: [{ googleSearch: {} }]
      },
    });
  },

  /**
   * Connects to the Live API for hands-free driver interaction.
   */
  async connectLiveRelay(callbacks: any) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
        },
        systemInstruction: "You are the Driver's Voice Co-Pilot. Provide hands-free status updates and route navigation tips. Keep responses extremely brief and safe for driving."
      }
    });
  }
};
