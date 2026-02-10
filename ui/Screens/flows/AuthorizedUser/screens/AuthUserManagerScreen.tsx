import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserManager, { AuthorizedUser } from "../../../../Slots/AuthorizedUser/AuthUserManager";

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
      <AuthUserManager
        authorizedUsers={authorizedUsers}
        onAddUser={onAddUser}
        onSelectUser={onSelectUser}
      />
    </FullscreenTemplate>
  );
}
