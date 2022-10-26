type dataAdmin = any;
type dataPermission = any;

type valueAuth = {
  admin: any;
  updateAdminToken: (token: string, remember?: any) => void;
  updateAdmin: (data: dataAdmin) => void;
  clear: () => void;
  revalidate: () => void;
};

export type { dataAdmin, dataPermission, valueAuth };
