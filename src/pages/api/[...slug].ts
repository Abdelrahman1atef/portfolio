import app from '../../../api/index';

export const config = {
  api: {
    externalResolver: true,
    bodyParser: true, // Let Next.js parse the body
  },
};

export default function handler(req: any, res: any) {
  // Tell express.json() that the body is already parsed by Next.js
  req._body = true; 
  return app(req, res);
}

