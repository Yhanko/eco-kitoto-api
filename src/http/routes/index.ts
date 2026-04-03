import { Router } from "express";
import { provinceRouter } from "./provinceRoute";
import { municipalityRouter } from "./municipalityRoute";
import { districtRouter } from "./districtRoute";
import { userRouter } from "./userRoute";
import { criticalAreaRouter } from "./criticalAreaRoute";
import { clearEventRouter } from "./clearEventRoute";
import { volunteerRouter } from "./volunteerParticipationRoute";
import { relatoryRouter } from "./relatoryRoute";

const systemRouter = Router()

// province route
    systemRouter.use("/eco-kitoto", provinceRouter)
//municipality route
    systemRouter.use("/eco-kitoto", municipalityRouter)
//district route
    systemRouter.use("/eco-kitoto", districtRouter)
//user route
    systemRouter.use("/eco-kitoto", userRouter)
// critical area route
    systemRouter.use("/eco-kitoto", criticalAreaRouter)
//clear event route
    systemRouter.use("/eco-kitoto", clearEventRouter)
//volunteer participation route
    systemRouter.use("/eco-kitoto", volunteerRouter)
//relatory route
    systemRouter.use("/eco-kitoto", relatoryRouter)

export { systemRouter }