import React from "react";

import classNames from 'classnames/bind';
import styles from "components/DayListItem.scss";

const classnames = classNames.bind(styles);

export default function DayListItem(props) {
  function formatSpots(spots) {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return `${spots} spot remaining`
    }

    return `${spots} spots remaining`
  }

  const dayListClasses = classnames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
    <li className={dayListClasses} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}