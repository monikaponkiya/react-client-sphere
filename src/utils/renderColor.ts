export const renderTagColor = (status: string | boolean) => {
  if (status === 'Active' || status === true || status === 'success' || status === 'completed') {
    return 'green';
  } else if (
    status === 'Inactive' ||
    status === false ||
    status === 'In Progress' ||
    status === 'error' ||
    status === 'not_started' ||
    status === 'cancelled'
  ) {
    return 'red';
  } else if (status === 'Resolved' || status === 'in_progress') {
    return 'orange';
  } else if (status === 'confirm' || status === 'warning' || status === 'pending') {
    return 'yellow';
  } else if (status === 'info' || status === 'start') {
    return 'blue';
  } else {
    return;
  }
};
