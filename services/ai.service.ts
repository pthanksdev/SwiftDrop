
import { GoogleGenAI } from "@google/genai";

// Strictly follow GenAI SDK initialization guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Logistics AI Service
 * Provides predictive analytics, fleet optimization, and customer support via Gemini
 */
export const aiLogisticsService = {
  /**
   * Generates fleet optimization suggestions based on current system load
   */
  async getFleetOptimizationInsights(currentStats: any) {
    try {
      const prompt = `
        Analyze the following real-time logistics data for SwiftDrop:
        - Total Orders Today: ${currentStats.orders || 0}
        - Active Drivers: ${currentStats.drivers || 0}
        - Pending Dispatch: ${currentStats.pending || 0}
        - Success Rate: 99.4%
        - Peak Regions: Sunset District, Downtown Core
        
        Provide 3 high-impact strategies for fleet optimization for the next 4 hours. 
        Focus on reducing "Pending Dispatch" and improving "Average Delivery Time".
        Keep suggestions extremely professional, data-driven, and concise.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the Lead Logistics Orchestrator for SwiftDrop, an enterprise delivery platform. Your tone is clinical, strategic, and concise.",
        }
      });

      return response.text || "Analysis currently unavailable.";
    } catch (err) {
      console.error("Gemini AI Integration Error:", err);
      return "Unable to calibrate fleet via AI layer. Check System Relay connection.";
    }
  },

  /**
   * Creates a stateful chat session for user support
   */
  createSupportChat() {
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `
          You are the SwiftDrop AI Support Assistant. 
          Your goal is to help users with:
          1. Tracking shipments (ask for Order ID if not provided).
          2. Explaining shipping policies (fragile items, dimensions, insurance).
          3. General platform navigation.
          
          Tone: Helpful, precise, and efficient.
          Disclaimer: You can assist with information, but cannot perform physical delivery actions.
        `,
      },
    });
  }
};
