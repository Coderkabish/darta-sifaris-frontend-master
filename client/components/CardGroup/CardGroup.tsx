/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { IconArrowUpRightCircle } from '@tabler/icons';

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
    <div className="label-div">
      <p className="label text-truncate" title={label}>{label}</p>
      <p className="stats red col-4 text-end"><IconArrowUpRightCircle />+16.24%</p>
    </div>

    <h5 className="count">{count}</h5>

    <div className="logo-div">
      <a href="">See details</a>
      {icon}
    </div>
  </div>
);

export default function CardGroup({ cards }: Props) {
  return (
    <div className="card-group-gap mb-5">
      {cards?.map(({ icon, count, label }, index) => (
        <Card key={index} icon={icon} count={count} label={label} />
      ))}
    </div>
  );
}
