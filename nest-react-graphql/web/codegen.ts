import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: '../user-management-graphql/src/schema.gql',
    documents: 'src/**/*.graphql',
    generates: {
        'src/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typed-document-node',
            ],
            config: {
                preResolveTypes: false,
                useTypeImports: true,
            },
        },
    },
};
export default config;
