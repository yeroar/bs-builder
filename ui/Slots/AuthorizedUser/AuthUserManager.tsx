import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { UserIcon } from "../../../components/Icons/UserIcon";
import { PlusIcon } from "../../../components/Icons/PlusIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface AuthorizedUser {
  id: string;
  name: string;
  status: string;
}

interface AuthUserManagerProps {
  authorizedUsers: AuthorizedUser[];
  onAddUser: () => void;
  onSelectUser?: (user: AuthorizedUser) => void;
}

export default function AuthUserManager({
  authorizedUsers,
  onAddUser,
  onSelectUser,
}: AuthUserManagerProps) {
  return (
    <>
      <PrimaryHeader header="Authorized users" />

      <View style={styles.list}>
        {authorizedUsers.map((user) => (
          <ListItem
            key={user.id}
            variant="feature"
            title={user.name}
            secondaryText={user.status}
            leadingSlot={
              <IconContainer variant="default-fill" size="lg" icon={<UserIcon />} />
            }
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={() => onSelectUser?.(user)}
          />
        ))}
        <ListItem
          variant="feature"
          title="Add authorized user"
          leadingSlot={
            <IconContainer variant="default-stroke" size="lg" icon={<PlusIcon />} />
          }
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onAddUser}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing["500"],
  },
});
