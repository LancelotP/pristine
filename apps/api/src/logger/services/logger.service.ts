/* eslint-disable @typescript-eslint/no-explicit-any */

import type { LoggerService as NestLoggerService } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import type { Logger } from 'winston';
import { createLogger, format, transports } from 'winston';

import { ConfigService } from '../../config/services/config.service';

@Injectable()
export class LoggerService implements NestLoggerService {
  private _context?: string;
  private _logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this._logger = createLogger({
      exitOnError: false,
    });

    if (this.configService.app.env.isDev) {
      this._logger.configure({
        level: 'debug',
        format: format.combine(
          format.ms(),
          format.align(),
          format.printf((info) => {
            let color: chalk.Chalk;

            switch (info.level) {
              case 'info':
                color = chalk.green;
                break;
              case 'warn':
                color = chalk.yellow;
                break;
              case 'error':
                color = chalk.red;
                break;
              case 'debug':
                color = chalk.magenta;
                break;
              case 'verbose':
                color = chalk.cyan;
                break;
              default:
                color = chalk.white;
            }

            const context = typeof info.context === 'string' ? `[${info.context}]` : '';
            const stack = typeof info.stack !== 'undefined' ? '\n' + chalk.red(info.stack) : false;

            return [
              color(info.level.padEnd(7)),
              chalk.yellow(context.padEnd(20)),
              color(info.message),
              chalk.yellow(info.ms),
              stack,
            ]
              .filter(Boolean)
              .join(' ');
          }),
        ),
        transports: [new transports.Console()],
      });
    } else {
      // this._logger.transports.push()
    }
  }

  setContext(context: string) {
    this._context = context;
  }

  log(message: any, context?: string) {
    context = context ?? this._context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.info(msg as string, { ...meta, context });
    }

    return this._logger.info(message, { context });
  }

  error(message: any, trace?: string, context?: string) {
    context = context ?? this._context;

    if (message instanceof Error) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this._logger.error(msg, { context, stack: [trace ?? message.stack], ...meta });
    }

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.error(msg as string, { context, stack: [trace], ...meta });
    }

    return this._logger.error(message, { context, stack: [trace] });
  }

  warn(message: any, context?: string) {
    context = context ?? this._context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.warn(msg as string, { context, ...meta });
    }

    return this._logger.warn(message, { context });
  }

  debug(message: any, context?: string): any {
    context = context ?? this._context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.debug(msg as string, { context, ...meta });
    }

    return this._logger.debug(message, { context });
  }

  verbose(message: any, context?: string): any {
    context = context ?? this._context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.verbose(msg as string, { context, ...meta });
    }

    return this._logger.verbose(message, { context });
  }
}
