import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Select = (props) => {
  const { options } = props;
  const items = Object.keys(options).map((option, i) =>
    <MenuItem key={i} value={option} primaryText={options[option]} />
  );

  return (
    <SelectField
      style={props.style}
      floatingLabelText={props.label}
      value={props.selected}
      onChange={props.onChange.bind(null, props.name)}
    >
      {items}
    </SelectField>
  );
};

Select.propTypes = {
  label: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  selected: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
};

Select.muiName = 'SelectField';

export default Select;
