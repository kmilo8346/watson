import { ICollection, SearchParams } from '@watson/models';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export interface IConfig {
  baseURL: string;
  apiKey?: string;
  requestInterceptor?: {
    onFulfilled?: (
      value: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    onRejected?: (error: AxiosError) => any;
  };
  responseInterceptor?: {
    onFulfilled?: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onRejected?: (error: AxiosError) => any;
  };
}

export class RESTClient<E, C, U, S> {
  protected axios: AxiosInstance;
  protected baseUrl: string;
  protected collection: string;

  constructor(config: IConfig, collection: string) {
    const { baseURL, apiKey, requestInterceptor, responseInterceptor } = config;
    this.baseUrl = baseURL;
    this.collection = collection;

    const headers: AxiosRequestConfig['headers'] = {};
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    this.axios = axios.create({
      baseURL,
      headers,
    });

    // Add request interceptor if provided
    if (requestInterceptor) {
      this.axios.interceptors.request.use(
        requestInterceptor.onFulfilled,
        requestInterceptor.onRejected
      );
    }

    // Add response interceptor if provided
    if (responseInterceptor) {
      this.axios.interceptors.response.use(
        responseInterceptor.onFulfilled,
        responseInterceptor.onRejected
      );
    }
  }

  async getById(id: string, config?: AxiosRequestConfig): Promise<E> {
    const response = await this.axios.get<E>(
      `/${this.collection}/${id}`,
      config
    );
    return response.data;
  }

  async getAll(
    params: S,
    config?: AxiosRequestConfig
  ): Promise<ICollection<E>> {
    const response = await this.axios.get<ICollection<E>>(
      `/${this.collection}`,
      {
        ...config,
        params,
      }
    );
    return response.data;
  }

  async create(data: C, config?: AxiosRequestConfig): Promise<E> {
    const response = await this.axios.post<E>(
      `/${this.collection}`,
      data,
      config
    );
    return response.data;
  }

  async createMany(data: C[], config?: AxiosRequestConfig) {
    await this.axios.post<C[]>(`${this.collection}/many`, { data }, config);
  }

  async update(id: string, data: U, config?: AxiosRequestConfig) {
    await this.axios.put<U>(`/${this.collection}/${id}`, data, config);
  }

  async updateMany(data: U[], config?: AxiosRequestConfig) {
    await this.axios.put<U[]>(`/${this.collection}/many`, { data }, config);
  }
}
