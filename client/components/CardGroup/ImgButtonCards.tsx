/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { useRouter } from 'next/router';

type CardProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  buttonLink: string; // New prop for button link
  buttonName: string;
};

type Props = {
  cards: CardProps[];
};

const Card = ({ icon, description, label, buttonLink, buttonName }: CardProps) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push(buttonLink);
  };
  return (
    <div className="card">
      <div className="label-div">
        <p className="label text-center text-truncate" title={label}>
          {label}
        </p>
      </div>
      <p className="text-center muted-text mb-4 text-truncate">{description}</p>
      {icon}
      <button type="button" className="btn mt-4 btn-primary" onClick={handleSubmit}>
        {buttonName}
      </button>
    </div>
  );
};

export default function ImgButtonCards({ cards }: Props) {
  return (
    <div className="card-group-img-nav mb-5">
      {cards?.map(({ icon, description, label, buttonLink, buttonName },
                   index) => (
        <Card
          key={index}
          icon={icon}
          description={description}
          label={label}
          buttonLink={buttonLink}
          buttonName={buttonName}
        />
      ))}
    </div>
  );
}
