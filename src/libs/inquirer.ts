import { prompt, PromptModule } from 'inquirer';

export class InquirerClient {
  private p: PromptModule | null = null;

  public getPrompt = (): PromptModule => {
    if (!this.p) {
      this.p = prompt;
    }
    return this.p;
  };
}
