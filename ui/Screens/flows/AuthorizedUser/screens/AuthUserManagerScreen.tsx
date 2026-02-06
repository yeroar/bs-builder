import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserManagerSlot, { AuthorizedUser } from "../../../../Slots/AuthorizedUser/AuthUserManagerSlot";

interface AuthUserManagerScreenProps {
  authorizedUsers: AuthorizedUser[];
  onAddUser: () => void;
  onSelectUser?: (user: AuthorizedUser) => void;
  onBack: () => void;
}

export default function AuthUserManagerScreen({ authorizedUsers, onAddUser, onSelectUser, onBack }: AuthUserManagerScreenProps) {
  return (
    <FullscreenTemplate
      onLeftPress={onBack}
      scrollable
      navVariant="step"
      disableAnimation
    >
      <AuthUserManagerSlot
        authorizedUsers={authorizedUsers}
        onAddUser={onAddUser}
        onSelectUser={onSelectUser}
      />
    </FullscreenTemplate>
  );
}
