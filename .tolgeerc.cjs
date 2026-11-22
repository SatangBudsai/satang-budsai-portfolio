const projectId = process.env.TOLGEE_PROJECT_ID

module.exports = {
  $schema: 'https://docs.tolgee.io/cli-schema.json',
  apiUrl: process.env.TOLGEE_API_URL || process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'https://app.tolgee.io',
  apiKey: process.env.TOLGEE_API_KEY,
  ...(projectId ? { projectId } : {}),
  format: 'JSON_ICU',
  patterns: ['./src/**/*.{ts,tsx}'],
  extractor: './scripts/tolgee/tolgee-extractor.cjs',
  defaultNamespace: 'common',
  push: {
    languages: ['en', 'th'],
    filesTemplate: './langs/{namespace}/{languageTag}.json',
    forceMode: 'NO_FORCE'
  },
  pull: {
    languages: ['en', 'th'],
    path: './langs',
    fileStructureTemplate: '{namespace}/{languageTag}.{extension}',
    delimiter: null
  }
}
