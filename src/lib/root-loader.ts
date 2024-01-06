const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect('/login');
  }
  return null;
};