import { DynamicModule, Module } from '@nestjs/common';

export type MyDynamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';

@Module({})
export class MyDynamicModule {
  static register(configs: MyDynamicModuleConfigs): DynamicModule {
    // aqui posso ter logica e usar minhas configs
    console.log(configs);
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useValue: configs,
        },
      ],
      controllers: [],
      exports: [],
    };
  } //forRootAsync //passar configs
}
