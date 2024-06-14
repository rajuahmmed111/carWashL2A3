import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const slotData = req.body;
  const result = await SlotServices.createSlot(slotData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots created successfully',
    data: result,
  });
});

// const availableSlot = catchAsync(async (req, res) => {
//   const { date, serviceId } = req.query;

//   const queryParams: TSlotQueryParams = {
//     date: date as string,
//     serviceId: serviceId as string,
//   };

//   const result = await SlotServices.availableSlots(queryParams);

//   if (result.length === 0) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Available slots retrieved successfully',
//     data: result,
//   });
// });

export const SlotControllers = {
  createSlot,
  //   availableSlot,
};
