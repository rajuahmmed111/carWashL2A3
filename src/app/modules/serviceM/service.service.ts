const createService = async (payLoad: TSemesterRegistration) => {
  const academicSemester = payLoad?.academicSemester;

  //Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester !`,
    );
  }

  //step-1 Check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester not found!',
    );
  }

  // step-2 Check if the semester is already registered!
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester is already exist!');
  }

  const result = await SemesterRegistration.create(payLoad);
  return result;
};

export const Services = {
  createService,
};
