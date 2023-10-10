import { MainCommand } from '@/command/main.command';
import { BaseEnv, Environment as E } from '@/configs';
import { InquirerClient } from '@/libs/inquirer';
import { logger } from '@/libs/logger';

try {
  (async () => {
    logger.debug(`Env STAGE: ${BaseEnv.stage}`);
    logger.debug(`Env VERSION: ${E.VERSION}`);
    const typeScriptDesignPattern = new MainCommand(new InquirerClient().getPrompt(), logger);
    await typeScriptDesignPattern.run();
    process.exit(0);
  })();
} catch (e: unknown) {
  // @todo error handler
  console.error(e);
  process.exit(1);
}
