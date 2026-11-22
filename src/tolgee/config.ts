export const namespaces = ['common', 'master'] as const
export type TranslationNamespace = (typeof namespaces)[number]
export const defaultNamespace: TranslationNamespace = 'common'

export const staticData = {
  'en:common': () => import('../../langs/common/en.json').then(module => module.default),
  'th:common': () => import('../../langs/common/th.json').then(module => module.default),
  'en:master': () => import('../../langs/master/en.json').then(module => module.default),
  'th:master': () => import('../../langs/master/th.json').then(module => module.default)
}
