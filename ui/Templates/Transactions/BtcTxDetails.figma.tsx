import React from "react";
import BtcTxDetails from "./BtcTxDetails";
import figma from "@figma/code-connect";

figma.connect(
  BtcTxDetails,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=99-13049&t=ZAj1RhjHPnO3x8Ov-4",
  {
    props: {
      type: figma.enum("type", {
        buy: "buy",
        sell: "sell",
        send: "send",
        receieve: "receive", // Note: Figma has typo "receieve"
      }),
    },
    example: (props) => (
      <BtcTxDetails
        type={props.type}
        bitcoinPrice="$100,000.00"
        amountPrimary="90,000 sats"
        amountSecondary="$90"
        address="Bc1q981...J8t3xr5"
        processingFee="$10"
        total="$100"
      />
    ),
  }
);
