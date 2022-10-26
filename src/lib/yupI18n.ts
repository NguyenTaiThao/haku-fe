// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as yup from "yup";

export const localeEn = {
  mixed: {
    default: "${path} is invalid",
    required: "${path} is a required field",
    defined: "${path} must be defined",
    notNull: "${path} cannot be null",
    oneOf: "${path} must be one of the following values: ${values}",
    notOneOf: "${path} must not be one of the following values: ${values}",
  },
  string: {
    length: "${path} must be exactly ${length} characters",
    min: "${path} must be at least ${min} characters",
    max: "${path} must be at most ${max} characters",
    matches: '${path} must match the following: "${regex}"',
    email: "${path} must be a valid email",
    url: "${path} must be a valid URL",
    uuid: "${path} must be a valid UUID",
    trim: "${path} must be a trimmed string",
    lowercase: "${path} must be a lowercase string",
    uppercase: "${path} must be a upper case string",
  },
  number: {
    min: "${path} must be greater than or equal to ${min}",
    max: "${path} must be less than or equal to ${max}",
    lessThan: "${path} must be less than ${less}",
    moreThan: "${path} must be greater than ${more}",
    positive: "${path} must be a positive number",
    negative: "${path} must be a negative number",
    integer: "${path} must be an integer",
  },
  date: {
    min: "${path} field must be later than ${min}",
    max: "${path} field must be at earlier than ${max}",
  },
  boolean: {
    isValue: "${path} field must be ${value}",
  },
  object: {
    noUnknown: "${path} field has unspecified keys: ${unknown}",
  },
  array: {
    min: "${path} field must have at least ${min} items",
    max: "${path} field must have less than or equal to ${max} items",
    length: "${path} must have ${length} items",
  },
};

export const yupLocale = {
  mixed: {
    default: ({ path }) => ({
      key: "validations.mixed.default",
      values: { path },
    }),
    required: ({ path }) => ({
      key: "validations.mixed.required",
      values: { path },
    }),
    defined: ({ path }) => ({
      key: "validations.mixed.defined",
      values: { path },
    }),
    notNull: ({ path }) => ({
      key: "validations.mixed.notNull",
      values: { path },
    }),
    oneOf: (values) => ({
      key: "validations.mixed.oneOf",
      values,
    }),
    notOneOf: (values) => ({
      key: "validations.mixed.oneOf",
      values,
    }),
    notType: (values) => ({
      key: "validations.common.typeError",
      values,
    }),
  },
  string: {
    length: (values) => ({
      key: "validations.string.length",
      values,
    }),
    min: (values) => ({
      key: "validations.string.min",
      values,
    }),
    max: (values) => ({
      key: "validations.string.max",
      values,
    }),
    matches: (values) => ({
      key: "validations.string.matches",
      values,
    }),
    email: (values) => ({
      key: "validations.string.email",
      values,
    }),
    url: (values) => ({
      key: "validations.string.url",
      values,
    }),
    uuid: (values) => ({
      key: "validations.string.uuid",
      values,
    }),
    trim: (values) => ({
      key: "validations.string.trim",
      values,
    }),
    lowercase: (values) => ({
      key: "validations.string.lowercase",
      values,
    }),
    uppercase: (values) => ({
      key: "validations.string.uppercase",
      values,
    }),
  },
  number: {
    min: (values) => ({
      key: "validations.number.min",
      values,
    }),
    max: (values) => ({
      key: "validations.number.max",
      values,
    }),
    lessThan: (values) => ({
      key: "validations.number.lessThan",
      values,
    }),
    moreThan: (values) => ({
      key: "validations.number.moreThan",
      values,
    }),
    positive: (values) => ({
      key: "validations.number.positive",
      values,
    }),
    negative: (values) => ({
      key: "validations.number.negative",
      values,
    }),
    integer: (values) => ({
      key: "validations.number.integer",
      values,
    }),
  },
  date: {
    min: (values) => ({
      key: "validations.date.min",
      values,
    }),
    max: (values) => ({
      key: "validations.date.max",
      values,
    }),
  },
  boolean: {
    isValue: (values) => ({
      key: "validations.boolean.isValue",
      values,
    }),
  },
  object: {
    noUnknown: (values) => ({
      key: "validations.object.noUnknown",
      values,
    }),
  },
  array: {
    min: (values) => ({
      key: "validations.array.min",
      values,
    }),
    max: (values) => ({
      key: "validations.array.max",
      values,
    }),
    length: (values) => ({
      key: "validations.array.length",
      values,
    }),
  },
};

yup.setLocale(localeJP);
