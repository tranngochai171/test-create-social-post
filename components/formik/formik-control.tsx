import React from 'react';
import Input from './input';
import Date from './date';
import Time from './time';
import AddBanner from './add-banner';
import Checkbox from './checkbox';
import RadioGroup from './radio-group';
import MultipleSelect from './multiple-select';

export const CONTROL_TYPE = {
  INPUT: 'input',
  DATE: 'data',
  TIME: 'time',
  ADD_BANNER: 'addBanner',
  CHECKBOX: 'checkbox',
  RADIO_GROUP: 'radioGroup',
  MULTIPLE_SELECT: 'multipleSelect',
};

type FormikControlProps = {
  control: string;
  [x: string]: any;
};

const FormikControl = (props: FormikControlProps) => {
  const { control, ...rest } = props;
  switch (control) {
    case CONTROL_TYPE.INPUT:
      return <Input {...rest} />;
    case CONTROL_TYPE.DATE:
      return <Date {...rest} />;
    case CONTROL_TYPE.TIME:
      return <Time {...rest} />;
    case CONTROL_TYPE.ADD_BANNER:
      return <AddBanner {...rest} />;
    case CONTROL_TYPE.CHECKBOX:
      return <Checkbox {...rest} />;
    case CONTROL_TYPE.RADIO_GROUP:
      return <RadioGroup {...rest} />;
    case CONTROL_TYPE.MULTIPLE_SELECT:
      return <MultipleSelect {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
