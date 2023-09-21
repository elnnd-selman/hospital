import React from "react";
import useLogin from "./useLogin";

interface RolePermissionProps {
  role: string;
  children: React.ReactNode;
}

const useRolePermission: React.FC<RolePermissionProps> = ({
  role,
  children,
}) => {
  const { user } = useLogin();
  

  if (!user || user.role !== role) {
    return null;
  }

  return children;
};

export default useRolePermission;
