import { Option } from './option';
export interface Question {
  id: number;
  value: string|number;
  options: Option[];
  answered: boolean;
}
