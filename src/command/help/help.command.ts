import { HelpConstructor as C } from '@/configs';
import { ILogger } from '@/libs/logger';

type MessageCategory = 'large' | 'medium';

type LargeCategoryDesignPatterns = {
  creational: string;
  structural: string;
  behavioral: string;
};

type MediumCategoryDesignPatterns = {
  'factory-method': string;
  'abstract-factory': string;
  builder: string;
  prototype: string;
  adapter: string;
  bridge: string;
  composite: string;
  decorator: string;
  facade: string;
  flyweight: string;
  proxy: string;
  'chain-of-responsibility': string;
  command: string;
  interpreter: string;
  iterator: string;
  mediator: string;
  memento: string;
  observer: string;
  state: string;
};

type DesignPatternsMessageMap = {
  large: LargeCategoryDesignPatterns;
  medium: MediumCategoryDesignPatterns;
};

export class HelpCommand {
  private readonly content: string | undefined;

  private static helpMessagesMap: Map<MessageCategory, DesignPatternsMessageMap[MessageCategory]> = new Map([
    [
      'large',
      {
        creational: C.CREATIONAL.CREATIONAL_DESC,
        structural: 'Large Structural Design Patternの説明...',
        behavioral: 'Large Behavioral Design Patternの説明...',
      },
    ],
    [
      'medium',
      {
        'factory-method': 'Medium Creational Design Patternの説明...',
        'abstract-factory': 'Medium Structural Design Patternの説明...',
        builder: 'Medium Behavioral Design Patternの説明...',
        prototype: 'Medium Behavioral Design Patternの説明...',
        adapter: 'Medium Behavioral Design Patternの説明...',
        bridge: 'Medium Behavioral Design Patternの説明...',
        composite: 'Medium Behavioral Design Patternの説明...',
        decorator: 'Medium Behavioral Design Patternの説明...',
        facade: 'Medium Behavioral Design Patternの説明...',
        flyweight: 'Medium Behavioral Design Patternの説明...',
        proxy: 'Medium Behavioral Design Patternの説明...',
        'chain-of-responsibility': 'Medium Behavioral Design Patternの説明...',
        command: 'Medium Behavioral Design Patternの説明...',
        interpreter: 'Medium Behavioral Design Patternの説明...',
        iterator: 'Medium Behavioral Design Patternの説明...',
        mediator: 'Medium Behavioral Design Patternの説明...',
        memento: 'Medium Behavioral Design Patternの説明...',
        observer: 'Medium Behavioral Design Patternの説明...',
        state: 'Medium Behavioral Design Patternの説明...',
      },
    ],
  ]);

  constructor(
    private readonly logger: ILogger,
    private readonly context: MessageCategory,
    private readonly subCategory: keyof (LargeCategoryDesignPatterns & MediumCategoryDesignPatterns),
  ) {
    this.logger.debug(`Help Command context: ${this.context}`);

    const messages = HelpCommand.helpMessagesMap.get(this.context);

    if (this.context === 'large' && messages) {
      this.content = (messages as LargeCategoryDesignPatterns)[this.subCategory as keyof LargeCategoryDesignPatterns];
    } else if (this.context === 'medium' && messages) {
      this.content = (messages as MediumCategoryDesignPatterns)[this.subCategory as keyof MediumCategoryDesignPatterns];
    }

    if (this.content === undefined) {
      this.logger.debug(`No help message found for context ${this.context} and subCategory ${this.subCategory}`);
    }
  }

  public show = (): void => {
    console.log(this.content);
  };
}
