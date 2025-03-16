import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "~lib/auth";

export default function withAuth<T extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithAuth = (props: T) => {
    const accessToken = getAccessToken();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (accessToken === null) {
        navigate("/login");
      }
    }, []);

    return (<WrappedComponent {...props} />);
  };

  return ComponentWithAuth;
}