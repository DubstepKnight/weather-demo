import { useLoaderData } from "react-router-dom";

function RootLayout() {
  const user = useLoaderData();

  console.log(user);

  return (
    <section className="" >
      <h1>Root Layout</h1>
    </section>
  )
}

export default RootLayout;
