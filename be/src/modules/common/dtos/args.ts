export class PaginationArgs {
  limit?: number;

  page?: number;

  filters?: any[];

  s?: string;
}

export class BasePaginationArgs {
  limit: number;
  page: number;
}
