import { User } from '@prisma/client';

export type PaginationTypes = {
  page: number;
  limit: number;
};

export interface UserPromiseInterface {
  success: boolean;
  data: User[];
  total: number;
  limit: number;
  page: number;
  nextPage: boolean;
  message: string;
}
