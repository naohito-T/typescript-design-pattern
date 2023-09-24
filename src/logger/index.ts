import { pino } from 'pino';
import { BaseEnv } from '@/configs';

export interface ILogger {
  debug(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true, ignore: 'level,time,pid,hostname' },
});

export const logger = pino({ level: BaseEnv.isLocal ? 'debug' : 'info' }, transport);
