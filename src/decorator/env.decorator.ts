import { ApplicationStageType, ApplicationStage } from '~/src/configs';

type EnvOptions<T> = {
  [key in ApplicationStageType]?: T;
} & {
  default?: T;
};

export const EnvVar = <T>(options: EnvOptions<T>): PropertyDecorator => {
  const STAGE = process.env.STAGE as ApplicationStageType;
  if (STAGE === undefined) {
    throw new Error(`process.env.stage undefined`);
  } else if (!Object.values(ApplicationStage).some((value) => STAGE === value)) {
    throw new Error(`process.env.stage is invalid. Set to local, dev, or prod.`);
  }

  return (target: any, propertyKey: string | symbol) => {
    Object.defineProperty(target, propertyKey, {
      set: (_: unknown) => null,
      get: () => {
        if (options[STAGE] !== undefined) return options[STAGE];
        if (options.default !== undefined) return options.default;
        // if (
        //   typeof propertyKey === 'string' &&
        //   process.env[snakeCase(propertyKey).toUpperCase()] != null
        // )
        //   return process.env[snakeCase(propertyKey).toUpperCase()];
        // throw new Error(
        //   `environment variable ${propertyKey.toString()} is not defined in ${stage} stage`,
        // );
      },
    });
  };
};
