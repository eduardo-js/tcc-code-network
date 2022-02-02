import { Technology } from 'models';
import { celebrate, Segments, Joi } from 'celebrate';

export const validateLoginData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export const validateUserData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    telephone: Joi.string().required(),
    permission: Joi.number().default(0),
  }),
});

export const validateCourseData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    details: Joi.array().required(),
    image: Joi.string().required(),
    technologies: Joi.number()
      .valid(...Object.values(Technology))
      .required(),
    lessons: Joi.array()
      .items(
        Joi.object().keys({
          lessonName: Joi.string(),
          lessonDescription: Joi.string().allow(''),
          videoDuration: Joi.string().allow(''),
          videoName: Joi.string().allow(''),
          videoPath: Joi.string().allow(''),
        }),
      )
      .required(),
  }),
});
