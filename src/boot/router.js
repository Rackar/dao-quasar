// Allow access router outside vue
let Router;
export default async ({ router }) => {
  Router = router;
};
export { Router };
