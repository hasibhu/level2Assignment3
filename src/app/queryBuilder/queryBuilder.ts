import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search as string;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy as string;
    const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
    if (sortBy) {
      this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    }
    return this;
  }

  filter() {
    const authorId = this?.query?.filter as string;
    if (authorId) {
      this.modelQuery = this.modelQuery.find({ 'author.id': authorId } as FilterQuery<T>);
    }
    return this;
  }
}

export default QueryBuilder;
