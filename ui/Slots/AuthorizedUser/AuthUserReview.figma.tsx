import figma from "@figma/code-connect";
import AuthUserReview from "./AuthUserReview";

figma.connect(AuthUserReview, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20187", {
  example: () => (
    <AuthUserReview
      formData={{
        firstName: "John",
        middleName: "",
        lastName: "Doe",
        email: "john@example.com",
        ssn: "1234",
        dobMonth: "01",
        dobDay: "15",
        dobYear: "1990",
        address: "123 Main St",
        apt: "",
        city: "Austin",
        state: "TX",
        zip: "78701",
      }}
    />
  ),
});
