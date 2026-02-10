import React from "react";
import IntroTemplate from "../../Templates/IntroTemplate";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { TrendUpIcon } from "../../../components/Icons/TrendUpIcon";
import { RoundUpsIcon } from "../../../components/Icons/RoundUpsIcon";

export default function RoundUpsIntro() {
  return (
    <IntroTemplate
      header="Round ups"
      body="Increase your bitcoin holdings automatically. Round up everyday purchases and boost your savings with multipliers."
    >
      <ListItem
        variant="feature"
        title="Pick the multiplier"
        secondaryText="Amplify your round-up and stack even more."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<TrendUpIcon />} />}
      />
      <ListItem
        variant="feature"
        title="Automatic buys"
        secondaryText="When your round-ups hit $10, we buy bitcoin for you."
        leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<RoundUpsIcon />} />}
      />
    </IntroTemplate>
  );
}
