import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany, OrderByCondition } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Company } from './company.entity';

@Entity()
export class Source extends Base {
  @Column('jsonb', { nullable: true })
  metadata: any;

  @Column('uuid', { nullable: true, default: null, unique: false })
  group_id: string;

  // This will be mapped to a vector type in the actual migration - always remove this from generated migrations
  @Column('text', { nullable: true })
  embeddings: string;

  // Store the actual content of the data chunk
  @Column('text', { nullable: true })
  content: string;

  // Store a reference slug for this chunk
  @Column('text', { nullable: true })
  slug: string;

  // Store the URL reference to the content in Google Cloud Storage
  @Column('text', { nullable: true })
  contentUrl: string;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => Company, (company) => company.sources, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'company_id' }) // This creates a foreign key column named 'company_id'
  company: Company;
}

export interface SourceFilterOptions {
  contentUrl?: string;
  slug?: string;
  groupId?: string;
}

@Injectable()
export class SourceEntityService extends TypeOrmCrudService<Source> {
  constructor(
    @InjectRepository(Source)
    repo: Repository<Source>,
  ) {
    super(repo);
  }

  addMany(many: Partial<Source>[]): Promise<Source[]> {
    return this.repo.save(many);
  }

  addOne(partial: Partial<Source>): Promise<Source> {
    return this.repo.save(partial);
  }

  async findClosestEmbeddings(
    company_id: string,
    embedding_array: string,
    threshold: string,
    limit: string,
    filters: SourceFilterOptions = {},
  ): Promise<Source[]> {
    const query_builder = this.repo.createQueryBuilder('source');

    // Start building the query
    query_builder
      .select(['source.content', 'source.contentUrl', 'source.slug', 'source.group_id', 'source.created_at'])
      .addSelect('source.embeddings <=> :embedding_array', 'distance') // Calculate distance
      .where('source.company_id = :company_id', { company_id })
      .andWhere('source.embeddings <=> :embedding_array < :threshold', { embedding_array, threshold: parseFloat(threshold) }) // Filter by threshold
      .orderBy('distance', 'ASC'); // Order by calculated distance

    // Apply the filters based on the properties set in the filters object
    if (filters.contentUrl) {
      const urls = filters.contentUrl.split(',').map((url) => url.trim());
      query_builder.andWhere('source.contentUrl IN (:...urls)', { urls });
    }

    if (filters.slug) {
      const slugs = filters.slug.split(',').map((slug) => slug.trim());
      query_builder.andWhere('source.slug IN (:...slugs)', { slugs });
    }

    if (filters.groupId) {
      const groupIds = filters.groupId.split(',').map((id) => id.trim());
      query_builder.andWhere('source.group_id IN (:...groupIds)', { groupIds });
    }

    return query_builder.limit(parseInt(limit)).getMany();
  }
}
