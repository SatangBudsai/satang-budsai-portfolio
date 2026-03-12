/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum E36EnumsMassageEnum {
  Text = 'text',
  Image = 'image'
}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type PrismaJsonValue = string | number | boolean | PrismaJsonObject | PrismaJsonArray | null

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export interface PrismaJsonObject extends Record<string, PrismaJsonValue> {}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export type PrismaJsonArray = PrismaJsonValue[] | object

export interface DefaultSelectionPrisma36MessagePayload {
  /** @format date-time */
  update_time: string
  /** @format date-time */
  created_time: string
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  user_read: PrismaJsonValue
  message: string
  type: E36EnumsMassageEnum
  conversation_id: string
  sender_id: string
  id: string
}

/**
 * Model message
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type Message = DefaultSelectionPrisma36MessagePayload

export enum E36EnumsConversationEnum {
  Group = 'group',
  Singer = 'singer'
}

export interface ConversationType {
  message?: MessageType[] | null
  conversation_member?: ConversationMemberType[] | null
  mst_app?: ApplicationType | null
  profile: string | null
  name: string | null
  /** @format date-time */
  update_time: string | null
  /** @format date-time */
  created_time: string | null
  type: E36EnumsConversationEnum | null
  app_id: string | null
  id: string | null
}

export enum E36EnumsTypeUserEnum {
  String = 'string',
  Int = 'int'
}

export interface ApplicationType {
  external_users?: ExternalUsersType[] | null
  conversation?: ConversationType[] | null
  /** @format date-time */
  update_time: string | null
  /** @format date-time */
  created_time: string | null
  logo: string | null
  name: string | null
  domain: string | null
  id: string | null
}

export interface ExternalUsersType {
  application?: ApplicationType | null
  /** @format date-time */
  update_time: string | null
  /** @format date-time */
  created_time: string | null
  type_user_enum: E36EnumsTypeUserEnum | null
  headers: any
  url: string | null
  app_id: string | null
  id: string | null
}

export interface ConversationMemberType {
  conversation?: ConversationType | null
  /** @format date-time */
  update_time: string | null
  /** @format date-time */
  created_time: string | null
  user_id: string | null
  conversation_id: string | null
  id: string | null
}

export interface MessageType {
  conversation?: ConversationType | null
  /** @format date-time */
  update_time: string | null
  /** @format date-time */
  created_time: string | null
  user_read: any
  message: string | null
  type: E36EnumsMassageEnum | null
  conversation_id: string | null
  sender_id: string
  id: string | null
}

export interface CreateMessageRequest {
  message: string
  type: E36EnumsMassageEnum
  sender_id: string
  conversation_id: string
}

export interface ExternalUsersCreateType {
  update_time?: string | null
  created_time?: string
  type_user_enum?: E36EnumsTypeUserEnum | null
  headers?: any
  url?: string | null
  app_id?: string
}

export interface ExternalUserResponse {
  profile?: string | null
  full_name: string
  id: string | number
}

export interface GetExternalUsersRequest {
  user_id: string | number
  app_id: string
}

export interface GetManyExternalUsersRequest {
  user_id: string[] | number[]
  app_id: string
}

export interface DefaultSelectionPrisma36ConversationPayload {
  profile: string
  name: string
  /** @format date-time */
  update_time: string
  /** @format date-time */
  created_time: string
  type: E36EnumsConversationEnum
  app_id: string
  id: string
}

/**
 * Model conversation
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type Conversation = DefaultSelectionPrisma36ConversationPayload

export interface ConversationCreateType {
  profile?: string | null
  name?: string | null
  update_time?: string | null
  created_time?: string
  type?: E36EnumsConversationEnum | null
  app_id?: string
}

export interface ApplicationCreateType {
  update_time?: string | null
  created_time?: string
  logo?: string | null
  name?: string | null
  domain?: string | null
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '/api/v1' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path
      })
      .then(response => response.data)
  }
}

/**
 * @title realtime-chat-service
 * @version 1.0.0
 * @license MIT
 * @baseUrl /api/v1
 * @contact
 *
 * API Realtime Chat Service
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  message = {
    /**
     * No description
     *
     * @tags Message
     * @name GetAll
     * @request GET:/message/getAll
     */
    getAll: (params: RequestParams = {}) =>
      this.request<Message[], any>({
        path: `/message/getAll`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Message
     * @name GetMessageHistoryByConversationId
     * @request GET:/message/history/{conversation_id}
     */
    getMessageHistoryByConversationId: (
      conversationId: string,
      query: {
        /** @format double */
        page: number
      },
      params: RequestParams = {}
    ) =>
      this.request<MessageType[], any>({
        path: `/message/history/${conversationId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Message
     * @name Create
     * @request POST:/message/create
     */
    create: (data: CreateMessageRequest, params: RequestParams = {}) =>
      this.request<Message, any>({
        path: `/message/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  externalUser = {
    /**
     * No description
     *
     * @tags External User
     * @name Create
     * @request POST:/external-user/create
     */
    create: (data: ExternalUsersCreateType, params: RequestParams = {}) =>
      this.request<ExternalUsersType, any>({
        path: `/external-user/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags External User
     * @name Get
     * @request POST:/external-user/get
     */
    get: (data: GetExternalUsersRequest, params: RequestParams = {}) =>
      this.request<ExternalUserResponse, any>({
        path: `/external-user/get`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags External User
     * @name GetMany
     * @request POST:/external-user/getMany
     */
    getMany: (data: GetManyExternalUsersRequest, params: RequestParams = {}) =>
      this.request<ExternalUserResponse[], any>({
        path: `/external-user/getMany`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  conversation = {
    /**
     * No description
     *
     * @tags Conversation
     * @name GetConversationSinger
     * @request GET:/conversation/getConversationSinger
     */
    getConversationSinger: (
      query: {
        app_id: string
        sender_id: string
        receiver_id: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ConversationType, any>({
        path: `/conversation/getConversationSinger`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name GetManyConversationByUserId
     * @request GET:/conversation/getManyConversationByUserId
     */
    getManyConversationByUserId: (
      query: {
        app_id: string
        user_id: string
        /** @format double */
        page?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ConversationMemberType[], any>({
        path: `/conversation/getManyConversationByUserId`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name GetManyMemberInConversation
     * @request GET:/conversation/getManyMemberInConversation
     */
    getManyMemberInConversation: (
      query: {
        conversation_id: string
      },
      params: RequestParams = {}
    ) =>
      this.request<string[], any>({
        path: `/conversation/getManyMemberInConversation`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name Create
     * @request POST:/conversation/create
     */
    create: (data: ConversationCreateType, params: RequestParams = {}) =>
      this.request<Conversation, any>({
        path: `/conversation/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  application = {
    /**
     * No description
     *
     * @tags Application
     * @name CreateApplication
     * @request POST:/application/create
     */
    createApplication: (data: ApplicationCreateType, params: RequestParams = {}) =>
      this.request<ApplicationType, any>({
        path: `/application/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
}
