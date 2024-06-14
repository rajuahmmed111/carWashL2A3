import { Types } from 'mongoose';

export type TVehicleType = {
  Car: string;
  Truck: string;
  SUV: string;
  Van: string;
  Motorcycle: string;
  Bus: string;
  ElectricVehicle: string;
  HybridVehicle: string;
  Bicycle: string;
  Tractor: string;
};

export type TBooking = {
  customer?: Types.ObjectId;
  serviceId: Types.ObjectId;
  // slotId: Types.ObjectId;
  vehicleType: TVehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
