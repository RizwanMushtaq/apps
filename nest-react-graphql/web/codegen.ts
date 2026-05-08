import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: '../user-management-graphql/src/schema.gql',
    documents: 'src/**/*.graphql',
    generates: {
        './src/generated/': {
            preset: 'client',
            config: {
                useTypeImports: true,
            },
        },
    },
};
export default config;
