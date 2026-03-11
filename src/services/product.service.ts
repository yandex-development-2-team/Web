import { api } from './api.service';

export interface BoxProduct {
  id: string;
  title: string;
  isActive: boolean;
  description: string;
  image: File | null;
  date: string;
  timeRange: {
    from: number;
    to: number;
  };
  location: string;
  rules: string | string[];
  cost: string | number;
  organizer: string;
}

export interface SpecProduct {
  id: string;
  title: string;
  isActive: boolean;
  description: string;
  image: File | null;
}

export type UnitProductType = SpecProduct | BoxProduct;

export const ProductService = {
  creaetProduct: async (path: string, data: BoxProduct | SpecProduct) => {
    const response = await api.post(`/${path}`, data);
    return response.data;
  },
  editProduct: async (
    path: string,
    id: string,
    data: BoxProduct | SpecProduct,
  ) => {
    const response = await api.patch(`/${path}/${id}`, data);
    return response.data;
  },
};
