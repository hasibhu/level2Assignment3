



import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search by title or content (case-insensitive)
  search(searchableFields: string[]) {
    const search = this.query?.search as string;

    if (search) {
      // Convert the search term to lowercase for consistent matching
      const lowercasedSearch = search.toLowerCase();

      // Build search conditions for multiple fields, using case-insensitive regex
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: lowercasedSearch, $options: 'i' }, // Case-insensitive regex
      }));

      // Apply OR condition for the search fields
      this.modelQuery = this.modelQuery.find({
        $or: searchConditions,
      } as FilterQuery<T>);
    }

    return this;
  }

  // Sort by a specific field and order (ascending or descending)
  sort() {
    const sortBy = this.query?.sortBy as string; 
    const sortOrder = this.query?.sortOrder === 'desc' ? -1 : 1; 

    if (sortBy) {
      this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    }

    return this;
  }

  // Filter by a specific field (e.g., author ID)
  filter() {
    const filterValue = this.query?.filter as string;

    if (filterValue) {
      this.modelQuery = this.modelQuery.find({
        'author.id': filterValue,
      } as FilterQuery<T>);
    }

    return this;
  }

  // Pagination (optional, if needed)
  paginate() {
    const page = parseInt(this.query?.page as string, 10) || 1;
    const limit = parseInt(this.query?.limit as string, 10) || 10;
    
    this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit);

    return this;
  }

  // Combine all conditions and execute the query
  execute() {
    return this.modelQuery;
  }
}

export default QueryBuilder;
