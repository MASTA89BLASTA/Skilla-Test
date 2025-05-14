import React from "react";
import "./Avatars.scss";
import Img1 from "@assets/img/avatars/avatar.png";
import Img2 from "@assets/img/avatars/avatar2.png";
import Img3 from "@assets/img/avatars/avatar3.png";
import ImgDefault from "@assets/img/avatars/avatarDefault.png";
import type Call from "../../redux/types/Call";

type AvatarsProps = {
  call: Call;
};
const imgArray = [Img1, Img2, Img3];

const Avatars = ({ call }: AvatarsProps): JSX.Element => {
  const randomAvatars = React.useMemo(() => {
    return [...imgArray].sort(() => Math.random() - 0.5).slice(0, 1) as string[];
  }, []);
  return (
    <div>
      {call.person_avatar ? (
        randomAvatars.map((avatar) => (
          <li key={avatar} className="call__item call__item--avatar">
            <img src={avatar} alt={`${call.person_name}`} />
          </li>
        ))
      ) : (
        <li className="call__item call__item--avatar">
          <img src={ImgDefault} alt={`${call.person_name}`} />
        </li>
      )}
    </div>
  );
};

export default Avatars;
