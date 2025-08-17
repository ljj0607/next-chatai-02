import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8787/graphql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config