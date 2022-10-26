import { PERM } from "common/constant";
import { AuthContext } from "containers/AuthProvider";
import { useCallback, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

export type ActionPermission = {
  path: string;
  permission: Record<number, Action | Action[]>;
};

export enum Action {
  List,
  Full,
  Create,
  Detail,
  Edit,
  Delete,
}

const actionPermission: ActionPermission[] = [
  {
    path: "/",
    permission: {
      [PERM.ADMIN]: Action.Full,
    },
  },
  {
    path: "/contacts",
    permission: {
      [PERM.ADMIN]: Action.Full,
    },
  },
  {
    path: "/sponsors",
    permission: {
      [PERM.ADMIN]: Action.Full,
    },
  },
  {
    path: "/project",
    permission: {
      [PERM.ADMIN]: Action.Full,
      [PERM.PROJECT_OWNER]: Action.Edit,
    },
  },
  {
    path: "/affiliators",
    permission: {
      [PERM.ADMIN]: Action.Full,
    },
  },
  {
    path: "/networks",
    permission: {
      [PERM.ADMIN]: Action.Full,
    },
  },
  {
    path: "/tokens",
    permission: {
      [PERM.ADMIN]: Action.Full,
    },
  },
];

export type EnabledPermission = {
  hasCreate: boolean;
  hasEdit: boolean;
  hasDelete: boolean;
  hasDetail: boolean;
  hasDetailButton: boolean;
  isFullAction: boolean;
  permission: Action | Action[] | undefined;
};

export type UseCheckPremParams = {
  tableId?: string;
};

export const useCheckPerm = (props: UseCheckPremParams = {}) => {
  const { tableId } = props;
  const { admin } = useContext(AuthContext);
  const location = useLocation();

  const userPermission = useMemo(() => {
    if (admin) {
      if (admin?.project_owner_id) {
        return PERM.PROJECT_OWNER;
      }
      return PERM.ADMIN;
    }

    return null;
  }, [admin]);

  const getScreen = useCallback(
    (_path?: string) => {
      const path = _path || location.pathname;
      return actionPermission.find((perm) => path.includes(perm.path));
    },
    [location.pathname]
  );

  const enabledPermission = useMemo<EnabledPermission>(() => {
    const _path = tableId || undefined;
    const screenPerm = getScreen(_path);

    const permission = screenPerm?.permission[userPermission as number];
    const defaultPermObj: EnabledPermission = {
      hasCreate: false,
      hasEdit: false,
      hasDelete: false,
      hasDetail: false,
      hasDetailButton: false,
      permission: permission,
      isFullAction: false,
    };

    if (!permission) {
      return defaultPermObj;
    }

    if (permission === Action.Full) {
      return {
        hasCreate: true,
        hasEdit: true,
        hasDelete: true,
        hasDetail: true,
        hasDetailButton: false,
        permission: permission,
        isFullAction: true,
      };
    }

    const isFullAction = (permission as Action[]).includes(Action.Full);
    const hasCreate = (permission as Action[]).includes(Action.Create);
    const hasEdit = (permission as Action[]).includes(Action.Edit);
    const hasDelete = (permission as Action[]).includes(Action.Delete);
    const hasDetail = (permission as Action[]).includes(Action.Detail);
    const hasDetailButton = !hasDelete && !hasEdit && hasDetail;

    return {
      hasCreate,
      hasEdit,
      hasDelete,
      hasDetail,
      hasDetailButton,
      permission,
      isFullAction,
    };
  }, [getScreen, tableId]);

  return enabledPermission;
};
