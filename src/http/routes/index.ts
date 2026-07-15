import { Router } from "express";
import { provinceRouter } from "./provinceRoute";
import { municipalityRouter } from "./municipalityRoute";
import { districtRouter } from "./districtRoute";
import { userRouter } from "./userRoute";
import { criticalAreaRouter } from "./criticalAreaRoute";
import { clearEventRouter } from "./clearEventRoute";
import { volunteerRouter } from "./volunteerParticipationRoute";
import { relatoryRouter } from "./relatoryRoute";
import { authRouter } from "./authRoute";
import { materialRoutes } from "./materialRoute";
import { logsRouter } from "./logsRoute";
import { emailRouter } from "./emailRoute";

const systemRouter = Router()

//login route
    systemRouter.use("/eco-kitoto", authRouter)
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
//material route
    systemRouter.use("/eco-kitoto", materialRoutes)
//volunteer participation route
    systemRouter.use("/eco-kitoto", volunteerRouter)
//relatory route
    systemRouter.use("/eco-kitoto", relatoryRouter)
//logs route
    systemRouter.use("/eco-kitoto", logsRouter)
//send email route
    systemRouter.use("/eco-kitoto", emailRouter)

export { systemRouter }