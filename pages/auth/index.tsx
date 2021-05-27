import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import AuthComponent from "../../components/auth";
import Container from "../../shared/ui/container";

const Auth: React.FC = () => {
  return (
    <Container>
      <AuthComponent />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default Auth;
