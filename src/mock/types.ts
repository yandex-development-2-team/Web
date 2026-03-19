export type ProjectItem = {
  id: string;
  title: string;
  isActive?: boolean;
  description?: string;
  image?: File | null;
  date?: string;
  timeRange?: {
    from: number;
    to: number;
  };
  location?: string;
  rules?: string | string[];
  cost?: string | number;
  organizer?: string;
};
