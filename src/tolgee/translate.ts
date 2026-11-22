import type { DefaultParamType, TFnType } from '@tolgee/web'

export type TranslationVariables = Record<string, DefaultParamType>
export type AppTranslate = (fullKey: string, defaultValue: string, variables?: TranslationVariables) => string

export function splitTranslationKey(fullKey: string) {
  const separator = fullKey.indexOf('.')

  if (
    separator <= 0 ||
    separator === fullKey.length - 1 ||
    !/^[A-Za-z][A-Za-z0-9_-]*$/.test(fullKey.slice(0, separator))
  ) {
    throw new Error(`Translation keys must use "namespace.key" format: ${fullKey}`)
  }

  return {
    namespace: fullKey.slice(0, separator),
    key: fullKey.slice(separator + 1)
  }
}

export function createNamespacedTranslate(translate: TFnType): AppTranslate {
  return (fullKey, defaultValue, variables) => {
    const { namespace, key } = splitTranslationKey(fullKey)

    return translate({ key, defaultValue, params: variables, ns: namespace })
  }
}
