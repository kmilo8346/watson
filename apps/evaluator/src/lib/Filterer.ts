import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';

const outputSchema = z.object({
  result: z.boolean().describe('Si el tweet cumple con el filtro o no'),
});

export class Filterer {
  private model: ChatOpenAI;
  private filterInstructions: string;

  constructor(filterInstructions) {
    this.filterInstructions = filterInstructions;
    this.model = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
    });
  }

  /**
   * Valida si el contenido de un tweet cumple con un filtro
   * @param tweet
   * @returns {Promise<boolean>}
   */
  async comply(tweetContent: string) {
    const structuredLlm = this.model.withStructuredOutput(outputSchema, {
      name: 'result',
    });

    const { result } = await structuredLlm.invoke([
      new SystemMessage(this.filterInstructions),
      new HumanMessage(`Tweet: ${tweetContent}`),
    ]);

    return result;
  }
}
