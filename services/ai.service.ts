
import { GoogleGenAI } from "@google/genai";

// Fixed: Strictly follow GenAI SDK initialization guidelines for naming and direct process.env usage
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Logistics AI Service
 * Provides predictive analytics and fleet optimization suggestions using Gemini
 */
export const aiLogisticsService = {
  /**
   * Generates fleet optimization suggestions based on current system load
   */
  async getFleetOptimizationInsights(currentStats: any) {
    try {
      const prompt = `
        Analyze the following real-time logistics data for SwiftDrop:
        - Total Orders Today: ${currentStats.orders}
        - Active Drivers: ${currentStats.drivers}
        - Pending Dispatch: ${currentStats.pending}
        - Success Rate: 99.4%
        - Peak Regions: Sunset District, Downtown Core
        
        Provide 3 high-impact strategies for fleet optimization for the next 4 hours. 
        Focus on reducing "Pending Dispatch" and improving "Average Delivery Time".
        Keep suggestions extremely professional, data-driven, and concise.
      `;

      // Fixed: Strictly following text generation rules for Gemini 3 series
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the Lead Logistics Orchestrator for an enterprise delivery platform. Your tone is clinical, strategic, and concise.",
        }
      });

      return response.text || "Analysis currently unavailable.";
    } catch (err) {
      console.error("Gemini AI Integration Error:", err);
      return "Unable to calibrate fleet via AI layer. Check System Relay connection.";
    }
  }
};
