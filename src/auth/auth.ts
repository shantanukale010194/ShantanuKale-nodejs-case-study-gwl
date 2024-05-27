import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = 'galaxyWebLinkCodingTest2024'
export class Auth {
  constructor() {
  }

  // Function to create an access token
  public async createAccessToken(
    payload: object,
    expiresIn: string | number = "1h"
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, secretKey, { expiresIn }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  // Middleware to authenticate the token and protect routes
  public async authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    try {
      const verified: any = jwt.verify(token, secretKey);
  
      if (verified && verified.username === req.headers.username) {
        // If the token is valid and contains the expected information, proceed to the next middleware or route handler
        next();
      } else {
        // If the token is not valid or doesn't contain the expected information, send a Forbidden response
        return res.sendStatus(403); // Forbidden
      }
    } catch (err) {
      // If there's an error verifying the token, send a Forbidden response
      return res.sendStatus(403); // Forbidden
    }
  }
  
}
