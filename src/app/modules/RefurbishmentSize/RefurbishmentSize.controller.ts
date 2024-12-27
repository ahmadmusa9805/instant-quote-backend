import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RefurbishmentSizeServices } from './RefurbishmentSize.service';

const createRefurbishmentSize = catchAsync(async (req, res) => {
  const { RefurbishmentSize: RefurbishmentSizeData } = req.body;
  const result = await RefurbishmentSizeServices.createRefurbishmentSizeIntoDB(RefurbishmentSizeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentSize is created successfully',
    data: result,
  });
});

// Other controller methods...
