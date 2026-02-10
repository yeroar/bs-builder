import React from "react";
import IntroTemplate from "../../Templates/IntroTemplate";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { CalendarIcon } from "../../../components/Icons/CalendarIcon";
import { SettingsIcon } from "../../../components/Icons/SettingsIcon";
import { RocketIcon } from "../../../components/Icons/RocketIcon";

export default function BtcAutoStackIntro() {
  return (
    <IntroTemplate
      header="Auto stack"
      body="Set your savings on autopilot. Schedule daily, weekly, or bi-weekly bitcoin buys that fit your life."
    >
      <ListItem
        variant="feature"
        title="Pick the schedule"
        secondaryText="Choose how often you buy—then sit back and relax."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<CalendarIcon />} />}
      />
      <ListItem
        variant="feature"
        title="Set how much"
        secondaryText="Start with as little as $10."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<SettingsIcon />} />}
      />
      <ListItem
        variant="feature"
        title="No fees for Fold+"
        secondaryText="Fold+ members stack with zero fees."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<RocketIcon />} />}
      />
    </IntroTemplate>
  );
}
