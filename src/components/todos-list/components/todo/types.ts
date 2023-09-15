export type TodoListProps = {
  selected: boolean;
  onSelectionChange: (isSelected: boolean) => void;
  showCheckboxes: boolean;
  editable: boolean;
  onFinishEditing: () => void;
};
