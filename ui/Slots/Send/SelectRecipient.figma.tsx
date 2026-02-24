import figma from "@figma/code-connect";
import SelectRecipient from "./SelectRecipient";

figma.connect(
  SelectRecipient,
  "https://www.figma.com/design/R4RFmQy9VftRWuM56XSkrr/Benchamrk-to-Code?node-id=4-397",
  {
    example: () => (
      <SelectRecipient
        onSelect={(recipient) => console.log("Selected:", recipient)}
        onClose={() => console.log("Close")}
        onScanQR={() => console.log("Scan QR")}
        recents={[
          { address: "0xStashAddress", label: "Stash", transactionCount: 1 },
        ]}
        suggested={[
          { address: "0xb249abcd12349768", transactionCount: 1 },
        ]}
        addressBook={[
          { address: "0xd8dA6BF26964aF9D65e", label: "vitalik.eth", transactionCount: 0 },
        ]}
      />
    ),
  }
);
