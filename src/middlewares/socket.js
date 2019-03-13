"use strict";

import { createAction, Storage } from "../utils";
import socketService from "../services/socket";

export const createSocketMiddleware = socket => store => {
  const { getState, dispatch } = store;
  socket.on("connect", async () => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~socket open");
    const {
      socket: { sessionListMap }
    } = getState();
    const restoreMap = await socketService.restoreSessionFromLocal(
      sessionListMap
    );
    const user = await Storage.get("murray/user");
    await dispatch(
      createAction("auth/modify")({
        userId: user.data._id,
        field: "socketId",
        value: socket.id
      })
    );
    await dispatch(createAction("socket/save")(socket));
    await dispatch(createAction("socket/restore_session")(restoreMap));
  });
  socket.on("disconnection", async () => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~socket close");
    const {
      socket: { sessionListMap }
    } = getState();
    await socketService.saveSessionToLocal(sessionListMap);
  });
  return next => action => {
    if (action.type === "socket/open") {
      const { token } = action.payload;
      socket.io.opts.transportOptions = {
        polling: {
          extraHeaders: {
            TOKEN: token
          }
        }
      };
      socket.open();
    }
    if (action.type === "socket/close") {
      socket.close();
    }
    return next(action);
  };
};
