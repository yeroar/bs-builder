import figma from "@figma/code-connect";
import GiftCardSearch from "./GiftCardSearch";

figma.connect(GiftCardSearch, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=103-10843", {
  props: {
    // All props controlled by parent (Flow)
  },
  example: () => (
    <GiftCardSearch
      searchValue=""
      onSearchChange={() => {}}
      onBack={() => {}}
      redemptionMethodLabel="Redemption method"
      redemptionMethodActive={false}
      onRedemptionMethodPress={() => {}}
      categoriesLabel="Categories"
      categoriesActive={false}
      onCategoriesPress={() => {}}
      recentSearches={[
        { label: "Chewy", brand: "Chewy" },
        { label: "Uber", brand: "Chewy" },
      ]}
      onClearRecentSearches={() => {}}
      onRecentSearchPress={() => {}}
      recommendedCards={[
        { title: "Amazon", cashback: "Up to 1.75% sats back", availability: "Online and in-store", brand: "Chewy" },
      ]}
      onCardPress={() => {}}
    />
  ),
});
