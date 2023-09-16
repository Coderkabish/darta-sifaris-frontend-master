/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';

type CardProps = {
  icon: React.ReactNode;
  count: number;
  label: string;
};

type Props = {
  cards: CardProps[];
};

const Card = ({ icon, count, label }: CardProps) => (
  <div className="card">
    <div className="logo-div">{icon}</div>
    <h5 className="count">{count}</h5>
    <div className="label-div">
      <p className="label text-truncate" title={label}>
        {label}
      </p>
    </div>
  </div>
);

export default function GunasoInfoCards({ cards }: Props) {
  return (
    <div className="gunaso-info-cards mb-5">
      {cards?.map(({ icon, count, label }, index) => (
        <Card key={index} icon={icon} count={count} label={label} />
      ))}
    </div>
  );
}
