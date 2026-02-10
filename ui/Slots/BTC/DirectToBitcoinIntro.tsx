import React from "react";
import IntroTemplate from "../../Templates/IntroTemplate";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import { CalendarIcon } from "../../../components/Icons/CalendarIcon";
import { RocketIcon } from "../../../components/Icons/RocketIcon";

export default function DirectToBitcoinIntro() {
  return (
    <IntroTemplate
      header="Direct to bitcoin"
      body="Get paid in bitcoin, effortlessly. Choose a percentage of your direct deposit to convert automatically."
    >
      <ListItem
        variant="feature"
        title="Passive stacking"
        secondaryText="Convert a percentage of each direct deposit."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<ClockIcon />} />}
      />
      <ListItem
        variant="feature"
        title="Flexible anytime"
        secondaryText="Start with as little as you like and change as you go."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<CalendarIcon />} />}
      />
      <ListItem
        variant="feature"
        title="No fees for Fold+"
        secondaryText="Fold+ members enjoy fee-free conversions."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<RocketIcon />} />}
      />
    </IntroTemplate>
  );
}
