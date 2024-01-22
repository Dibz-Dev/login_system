import { NextFunction, Response, Request } from "express";
import axios from "axios";
import { nhlInstance } from "../../axiosInstances/nhlInstance";

export const teamsHandler = {
  getStandings: async (req: Request, res: Response, next: NextFunction) => {
    axios;
    nhlInstance
      .get("/standings/now")
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        res.status(response.status).json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
