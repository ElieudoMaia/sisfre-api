/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  id: yup
    .string()
    .typeError('id must be a string')
    .trim()
    .required('id is required')
    .uuid('id is invalid'),
  name: yup
    .string()
    .typeError('name must be a string')
    .trim()
    .required('name is required')
    .max(255, 'name must be less than 255 characters'),
  type: yup
    .string()
    .typeError('type must be a string')
    .trim()
    .required('type is required')
    .oneOf(
      ['GRADUATION', 'INTEGRATED', 'TECHNICAL'],
      'course type must be one of GRADUATION, INTEGRATED or TECHNICAL'
    ),
  coordinatorId: yup
    .string()
    .typeError('coordinatorId must be a string')
    .trim()
    .uuid('coordinatorId must be a valid uuid')
    .required('coordinatorId is required'),
  acronym: yup
    .string()
    .trim()
    .typeError('acronym must be a string')
    .max(10, 'acronym must be less than 10 characters')
    .matches(
      /^[A-Z]{3,10}$/,
      'acronym must be in the format [A-Z] and have between 3 and 10 characters'
    )
    .required('acronym is required'),
  duration: yup
    .number()
    .typeError('duration must be a number')
    .required('duration is required')
    .min(1, 'duration must be greater than 0')
});

export class UpdateCourseRequestValidator {
  async validate(data: any) {
    return await validationSchema.validate(data, {
      abortEarly: false
    });
  }
}
