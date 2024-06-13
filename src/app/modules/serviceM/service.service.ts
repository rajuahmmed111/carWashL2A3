import { TService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: TService) => {
  const result = await Service.create(payload);
  //   console.log(result);
  return result;
};

export const Services = {
  createService,
};
