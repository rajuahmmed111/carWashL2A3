import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Services } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await Services.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is created successfully!',
    data: result,
  });
});

export const ServicesController = {
  createService,
};
