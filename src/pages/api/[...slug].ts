import app from '../../../server/src/index';

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default app;
