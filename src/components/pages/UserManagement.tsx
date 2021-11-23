import { Center, Wrap, WrapItem } from "@chakra-ui/layout";
import { memo, useEffect, VFC } from "react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { Spinner } from "@chakra-ui/spinner";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getUsers(), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: "4", md: "10" }} justify="center">
          {users.map((user) => (
            <WrapItem key={user.id}>
              <UserCard
                imageUrl={"https://source.unsplash.com/random"}
                userName={user.username}
                fullName={user.name}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
