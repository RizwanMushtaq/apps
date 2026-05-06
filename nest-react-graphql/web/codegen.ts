import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: '../user-management-graphql/src/schema.gql',
    documents: 'src/**/*.graphql',
    generates: {
        'src/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                withHooks: false,
                withMutationFn: false,
                withMutationOptionsType: false,
                apolloReactCommonImportFrom: '@apollo/client/react',
            },
        },
    },
};
export default config;
