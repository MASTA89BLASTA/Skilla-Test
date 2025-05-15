import React from "react";
import type Call from "../../redux/types/Call";

type TelephoneProps = {
  call: Call;
};
const Telephone = ({ call }: TelephoneProps): JSX.Element => {
  const formateTelephone = (): string | undefined => {
    const telephone = call.partner_data?.phone;
    if (telephone) {  
      const formateNumber = telephone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
      return formateNumber;
    }
    return telephone;
  }
  return (
    <div>
      <li className="call__item call__item--person">
        {formateTelephone()}
      </li>
    </div>
  );
};

export default Telephone;
