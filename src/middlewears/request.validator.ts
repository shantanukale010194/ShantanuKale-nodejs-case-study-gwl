import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';


export function validateRequest(dtoClass: any){
return async (req: Request, res: Response, next: NextFunction) => {

  const dtoInstance = Object.assign(new dtoClass(), req.body);

  const errors = await validate(dtoInstance);

  if(errors.length> 0){
    const formatedErrorReponse = errors.map((error: any) => {
      return { 
      property: error.property,
      contraints: error.constraints
      }
    });

    res.status(400).json({errors: formatedErrorReponse});
  } else {
    next();
  }
}
}