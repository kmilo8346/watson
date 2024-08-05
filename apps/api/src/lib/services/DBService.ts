import { HttpException, HttpStatus } from '@nestjs/common';
import { ICollection, SearchParams } from '@watson/models';
import {
  Collection,
  Document,
  Filter,
  MongoClient,
  ObjectId,
  OptionalUnlessRequiredId,
  SortDirection,
} from 'mongodb';

export abstract class DBService<T extends Document, C, U> {
  protected readonly collectionName: string;
  protected readonly collection: Collection<T>;

  constructor(mongoClient: MongoClient, collectionName: string) {
    this.collectionName = collectionName;
    this.collection = mongoClient.db().collection<T>(collectionName);
  }

  /**
   * Obtiene un documento por su id
   * La función lanza una excepción si no se encuentra el documento
   * @param id
   * @returns {Promise<T>}
   */
  async getById(id: string): Promise<T> {
    const filter = {
      _id: new ObjectId(id),
    } as Filter<T>;

    const data = await this.collection.findOne(filter);

    if (data === null) {
      throw new HttpException(`Document not found`, HttpStatus.NOT_FOUND);
    }

    return data as T;
  }

  /**
   * Obtiene todos los documentos de la colección
   * filtrados por los parámetros de búsqueda
   * @param params
   * @returns {Promise<ICollection<T>>}
   */
  async getAll(params?: SearchParams): Promise<ICollection<T>> {
    const _params: SearchParams = Object.assign(
      { filter: {}, from: 0, size: 10, sort: undefined },
      params
    );

    const { filter, from, size, sort } = _params;

    // Agregar soporte para filtrar por _id
    if (filter._id) {
      if (typeof filter._id === 'string') {
        filter._id = new ObjectId(filter._id as string);
      } else if (typeof filter._id === 'object' && '$in' in filter._id) {
        filter._id.$in = (filter._id.$in as string[]).map(
          (id) => new ObjectId(id)
        );
      }
    }

    const [data, total] = await Promise.all([
      this.collection
        .find(filter)
        .skip(from)
        .limit(size)
        .sort(sort as { [key: string]: SortDirection })
        .toArray(),
      this.collection.countDocuments(filter),
    ]);

    return {
      total,
      from,
      size,
      data: data as T[],
    };
  }

  /**
   * Crear un nuevo documento en la colección
   * @param createDocument
   * @returns {Promise<T>}
   */
  async create(createDocument: C): Promise<T> {
    const data = {
      ...createDocument,
      _created_at: new Date().toISOString(),
      _updated_at: new Date().toISOString(),
    } as unknown as T;

    const result = await this.collection.insertOne(
      data as OptionalUnlessRequiredId<T>
    );

    if (result.acknowledged === false) {
      throw new HttpException(
        `Failed to create document`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  /**
   * Crea varios documentos en la colección
   * @param createDocuments
   */
  async createMany(createDocuments: C[]) {
    const data = createDocuments.map((document) => ({
      ...document,
      _created_at: new Date().toISOString(),
      _updated_at: new Date().toISOString(),
    }));

    const result = await this.collection.insertMany(
      data as OptionalUnlessRequiredId<T>[]
    );

    if (result.acknowledged === false) {
      throw new HttpException(
        `Failed to create documents`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Actualiza un documento en la colección
   * @param id
   * @param data
   */
  async update(id: string, data: U): Promise<void> {
    const toUpdate = {
      ...data,
      _updated_at: new Date().toISOString(),
    } as Partial<T>;

    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) } as Filter<T>,
      { $set: toUpdate }
    );

    if (result.acknowledged === false) {
      throw new HttpException(
        `Failed to update document`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (result.modifiedCount === 0) {
      throw new HttpException(`Document not found`, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Elimina un documento de la colección
   * @param id
   */
  async delete(id: string): Promise<void> {
    const result = await this.collection.deleteOne({
      _id: new ObjectId(id),
    } as Filter<T>);

    if (result.deletedCount === 0) {
      throw new HttpException(
        `Failed to delete document`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
