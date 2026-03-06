export function isAllSelected(
  displayIds: readonly string[],
  selected: ReadonlySet<string | number>,
): boolean {
  return displayIds.length > 0 && displayIds.every((id) => selected.has(id));
}

export function selectAll(
  prev: ReadonlySet<string | number>,
  displayIds: readonly string[],
  checked: boolean,
): Set<string | number> {
  const newSelected = new Set(prev);

  if (checked) {
    displayIds.forEach((id) => newSelected.add(id));
  } else {
    displayIds.forEach((id) => newSelected.delete(id));
  }

  return newSelected;
}

export function selectRow(
  prev: ReadonlySet<string | number>,
  id: string | number,
  checked: boolean,
): Set<string | number> {
  const newSelected = new Set(prev);
  if (checked) {
    newSelected.add(id);
  } else {
    newSelected.delete(id);
  }
  return newSelected;
}
