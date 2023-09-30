import { ILogger } from '@/logger';

type MessageCategory = 'large' | 'medium' | 'small';

type DesignPatterns = {
  creational: string;
  structural: string;
  behavioral: string;
};

export class HelpCommand {
  private readonly content: string | undefined;

  private static helpMessagesMap: Map<MessageCategory, DesignPatterns> = new Map([
    [
      'large',
      {
        creational: 'Large Creational Design Patternの説明...',
        structural: 'Large Structural Design Patternの説明...',
        behavioral: 'Large Behavioral Design Patternの説明...',
      },
    ],
    [
      'medium',
      {
        creational: 'Medium Creational Design Patternの説明...',
        structural: 'Medium Structural Design Patternの説明...',
        behavioral: 'Medium Behavioral Design Patternの説明...',
      },
    ],
    [
      'small',
      {
        creational: 'Small Creational Design Patternの説明...',
        structural: 'Small Structural Design Patternの説明...',
        behavioral: 'Small Behavioral Design Patternの説明...',
      },
    ],
  ]);

  constructor(
    private readonly context: MessageCategory,
    private readonly subCategory: keyof DesignPatterns,
    private readonly logger: ILogger,
  ) {
    this.logger.debug(`Help Command context: ${this.context}`);
    this.content = HelpCommand.helpMessagesMap.get(this.context)?.[this.subCategory];
    if (this.content === undefined) {
      this.logger.debug(`No help message found for context ${this.context} and subCategory ${this.subCategory}`);
    }
  }

  public show = (): void => {
    console.log(this.content);
  };
}
