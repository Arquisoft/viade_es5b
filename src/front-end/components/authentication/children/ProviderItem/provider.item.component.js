import React from "react";


type Props = {
  data: any,
  onSelect: Function,
  radioName: String,
  id: String,
  checked: Boolean
};

const ProviderItem = ({ data, onSelect, radioName, id, checked }: Props) => (
      <div className="img-group">
        <input
          type="radio"
          name={radioName}
          id={id}
          onChange={onSelect}
          value={data.registerLink}
          checked={checked}
        />
        <img src={data.image} alt="" width="50" height="50"/>
        <span className="label">{data.label}</span>
      </div>
);

export default ProviderItem;
