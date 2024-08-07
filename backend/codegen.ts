import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/graphql/**/*.graphql',
    generates: {
        'src/generated/generated-types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
};

export default config;
