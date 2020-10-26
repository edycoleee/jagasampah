import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//import DateFnsUtils from "@date-io/date-fns";
// pick a date util library
<<<<<<< HEAD
import MomentUtils from '@date-io/moment';
=======
import MomentUtils from "@date-io/moment";
>>>>>>> 3fefe25020948e70cc4a91a7b2e7fde7da64e22c

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="YYYY-MM-DD"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
