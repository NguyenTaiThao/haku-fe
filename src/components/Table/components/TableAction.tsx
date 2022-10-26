import { Stack, SvgIcon } from "@mui/material";
import { ReactComponent as Delete } from "assets/svg/delete.svg";
import { ReactComponent as Edit } from "assets/svg/edit.svg";
import IButton from "components/IButton";
import { useDialog } from "lib/providers";
import { UnknownObj } from "lib/types";
import { memo } from "react";
import { CellProps } from "react-table";
import { ActionColumnConfig } from "..";
import { CellContainer } from "./CellContainer";
import React from "react";
import { useHistory } from "react-router-dom";
import { useCheckPerm } from "lib/hooks";

interface TableActionProps<T extends object> extends CellProps<T> {
  actionConfig?: ActionColumnConfig;
  onActionEdit?(props: CellProps<T>): void;
  onActionDelete?(props: CellProps<T>): void;
  defaultActionEdit?: boolean;
  onActionShow?(props: CellProps<T>): void;
  tableId?: string;
}

const defaultConfig = {
  editText: "編集",
  deleteText: "削除",
  deleteConfirmText: "Do you want to delete this record?",
  needConfirm: false,
};

export const TableActionContainer = (
  <Stack onClick={(e) => e.stopPropagation()} />
);

function TableAction<T extends object>(props: TableActionProps<T>) {
  const {
    row,
    actionConfig,
    onActionEdit,
    onActionDelete,
    defaultActionEdit,
    tableId,
  } = props;

  const { hasDelete: hasDeletePerm, hasEdit: hasEditPerm } = useCheckPerm({
    tableId,
  });

  const { deleteConfirmText, needConfirm } = Object.assign(
    defaultConfig,
    actionConfig
  );

  const { original } = row;
  const history = useHistory();
  const dialog = useDialog();

  const hasEditFn = typeof onActionEdit === "function";
  const hasDeleteFn = typeof onActionDelete === "function";

  const defaultEditAction = () => {
    history.push(`edit/${(original as UnknownObj).id}`);
  };

  const handleEdit = () => {
    if (hasEditFn) {
      onActionEdit(props);
    } else {
      defaultEditAction();
    }
  };

  const _delete = () => {
    if (hasDeleteFn) {
      onActionDelete(props);
    }
  };

  const deleteConfirm = async () => {
    try {
      if (hasDeleteFn) {
        await dialog({
          description: deleteConfirmText,
          dialogProps: {
            maxWidth: "xs",
          },
        });
        onActionDelete(props);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (needConfirm) {
      deleteConfirm();
    } else {
      _delete();
    }
  };

  return (
    <CellContainer direction="row" height={41} spacing={1} width={60}>
      {!!(defaultActionEdit || hasEditFn) && hasEditPerm && (
        <IButton onClick={handleEdit}>
          <SvgIcon viewBox="0 0 28 28" component={Edit} />
        </IButton>
      )}
      {hasDeleteFn && hasDeletePerm && (
        <IButton onClick={handleDelete}>
          <SvgIcon viewBox="0 0 28 28" component={Delete} />
        </IButton>
      )}
    </CellContainer>
  );
}

export default memo(TableAction) as typeof TableAction;
