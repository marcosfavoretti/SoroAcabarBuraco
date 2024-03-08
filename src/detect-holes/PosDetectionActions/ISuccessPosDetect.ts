import { Usuario } from "src/login/entities/user.entity";
import { Patalogia } from "../entities/detect-hole.entity";

export interface ISuccessPosDetect {
    functionPosDetect(user: Usuario, hole: Patalogia)
}