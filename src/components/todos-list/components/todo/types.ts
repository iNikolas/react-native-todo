export type TodoListProps = {
  selected: boolean;
  onSelectionChange: () => void;
  showCheckboxes: boolean;
  editable: boolean;
  onFinishEditing: () => void;
};
