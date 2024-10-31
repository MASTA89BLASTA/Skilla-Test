import React from "react";

type CallsIconsProps ={
  in_out: number;
  status: string;
}

function CallsIcons({ in_out, status }: CallsIconsProps): JSX.Element {
  let icon;
  if (in_out === 1 && status === "Дозвонился") {
    icon = (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z" fill="#002CFB" />
      </svg>
    );
  } else if (in_out === 0 && status === "Дозвонился") {
    icon = (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z" fill="#EA1A4F" />
      </svg>
    );
  } else if (in_out === 1 && status === "Не дозвонился") {
    icon = (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.00023365 11.3447L1.17728 12.5217L10.8524 2.8466L10.8524 8.34782H12.522L12.522 -1.04904e-05L4.17415 -1.04904e-05V1.66955L9.67536 1.66955L0.00023365 11.3447Z" fill="#28A879" />
      </svg>
    );
  } else if (in_out === 0 && status === "Не дозвонился") {
    icon = (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z" fill="#EA1A4F" />
      </svg>
    );
  }

  return <div className="call-icons__item">{icon}</div>;
}

export default CallsIcons;
