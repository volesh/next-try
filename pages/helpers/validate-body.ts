import { Schema, ValidationResult } from 'joi';

export const ValidateBody = (schema: Schema, body: any): ValidationResult => {
  return schema.validate(body);
};
