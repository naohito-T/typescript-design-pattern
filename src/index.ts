import { MainCommand } from '@/command/main.command';
import { logger } from '@/logger';

try {
  (async () => {
    const typeScriptDesignPattern = new MainCommand(logger);
    await typeScriptDesignPattern.run();
    process.exit(0);
  })();
} catch (e: unknown) {
  // @todo error handler
  console.error(e);
  process.exit(1);
}
