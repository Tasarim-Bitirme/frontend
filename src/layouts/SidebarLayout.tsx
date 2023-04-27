import { Box, Container, Flex, useDisclosure } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar/Sidebar';
import * as API from 'src/api';
import { useEffect } from 'react';
import { useUserStore } from 'src/flux/store/user.store';
import Loading from 'src/components/Preloader/Loading';
import { useAuthStore } from 'src/flux/store';

export default function SidebarLayout() {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: loading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();

  // const { setUser, setInitialUser } = useUserStore();
  const { setIsAuthenticated } = useAuthStore();

  // const fetchUser = async () => {
  //   onLoading();
  //   try {
  //     const { data } = await API.userAPI.getMe();

  //     setUser(data);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     setInitialUser();
  //     setIsAuthenticated(false);
  //     <Navigate to="/" />;
  //   } finally {
  //     onLoaded();
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  if (loading) return <Loading />;

  return (
    <Flex w="100%" minH={'100vh'} position={'relative'}>
      <Box
        w={isOpen ? ['100%', '25rem'] : '0'}
        h="100vh"
        position={['absolute', 'relative']}
        background={'gray.700'}
        transition={'all ease 0.3s'}
        zIndex={'overlay'}
      >
        <Box
          w="8"
          h="8"
          bg={isOpen ? 'gray.800' : 'gray.700'}
          position="absolute"
          top="16"
          right={'-4'}
          transform={'rotate(45deg)'}
          boxShadow={'dark-lg'}
          onClick={onToggle}
        />
        <Container w="100%" h="100%">
          <Sidebar isOpen={isOpen} />
        </Container>
      </Box>
      <Box w="100%" h="100vh" overflow="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
