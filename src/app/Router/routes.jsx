import adminRoutes from "./routes/route.admin";
import shopRoutes from "./routes/route.shop";
import userRoutes from "./routes/route.user";

const allRoutes = [...adminRoutes, ...shopRoutes, ...userRoutes];

export default allRoutes.map((route) => {
  const { Layout, Page, title } = route;
  return {
    path: route.path,
    type: route.type,
    title: title,
    element: (
      <Layout>
        <Page></Page>
      </Layout>
    ),
  };
});
