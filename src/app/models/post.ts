import { Category } from './Category';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  dateCreated: Date;
  imagePath: string;
  creator: string;
}

