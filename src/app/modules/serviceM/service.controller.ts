import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Services } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await Services.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully!',
    data: result,
  });
});

const getSingleServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Services.getSingleServiceById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const getAllService = catchAsync(async (req, res) => {
  const result = await Services.getAllService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Services.updateService(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deletedService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Services.deletedService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServicesController = {
  createService,
  getSingleServiceById,
  getAllService,
  updateService,
  deletedService,
};
