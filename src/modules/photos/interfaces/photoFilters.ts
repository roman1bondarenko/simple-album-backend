import { User } from 'modules/users/entities';
import { Nullable } from '_common/types/nullable';

export interface PhotoFilters {
  user: Nullable<User>;
  maxcount: number;
  page: number;
}
