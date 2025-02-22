import { createRouteHandler } from "uploadthing/next-legacy";

import { uploadRouter } from "~/server/uploadthing/router";

export default createRouteHandler({
  router: uploadRouter,
});
