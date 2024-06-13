import httpStatus from 'http-status';
import AppError from '../../Error/Apperror';
import { TService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleServiceById = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Service is not found !');
  }

  // check if the user is already deleted !
  const isDeleted = service?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This Service is deleted !');
  }
  return service;
};

const getAllService = async (payLoad: TService) => {
  const services = await Service.find(payLoad);
  if (!services) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Services are  not found !');
  }

  return services;
};

const updateService = async (id: string, payLoad: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payLoad, {
    new: true,
  });
  return result;
};

const deletedService = async (id: string) => {
  const service = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  // check if the user is already deleted !
  const isDeleted = service?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This Service is deleted !');
  }
  return service;
};

export const Services = {
  createService,
  getSingleServiceById,
  getAllService,
  updateService,
  deletedService,
};
