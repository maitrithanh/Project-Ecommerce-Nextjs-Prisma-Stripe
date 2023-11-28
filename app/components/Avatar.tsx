import Image from "next/image";
import React from "react";
import { CiUser } from "react-icons/ci";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <div className="border rounded-full p-1">
        <Image
          src={src}
          alt="Avatar"
          className="rounded-full"
          height={30}
          width={30}
        />
      </div>
    );
  }
  return (
    <div className="border rounded-full px-2">
      <CiUser size={24} />
    </div>
  );
};

export default Avatar;
