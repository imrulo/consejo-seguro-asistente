import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAIApi;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    this.openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }));
  }

  async empatheticResponse(prompt: string, language = 'es'): Promise<string> {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: `Eres un asistente empático, cálido y culturalmente sensible. Responde en ${language}. No des diagnósticos médicos ni legales. Incluye siempre: 'Esto es información general; consulta a un profesional calificado inmediatamente.'` },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });
      return completion.data.choices[0].message?.content || '';
    } catch (e) {
      this.logger.error('Error en OpenAI', e);
      return 'No se pudo generar una respuesta empática en este momento.';
    }
  }

  async translate(text: string, targetLang: string): Promise<string> {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: `Traduce el siguiente texto al idioma ${targetLang}, manteniendo el tono humano y empático. Responde solo con la traducción, sin explicaciones ni notas.` },
          { role: 'user', content: text },
        ],
        max_tokens: 300,
        temperature: 0.3,
      });
      return completion.data.choices[0].message?.content || '';
    } catch (e) {
      this.logger.error('Error en traducción OpenAI', e);
      return text;
    }
  }
}
