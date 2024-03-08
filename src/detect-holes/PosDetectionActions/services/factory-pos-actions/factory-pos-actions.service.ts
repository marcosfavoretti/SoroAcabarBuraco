import { Injectable } from '@nestjs/common';
import { EmailPosDetectHoleService } from '../email-pos-detect-hole/email-pos-detect-hole.service';
import { RankingUpdatePosDetectHoleService } from '../ranking-update-pos-detect-hole/ranking-update-pos-detect-hole.service';
import { ISuccessPosDetect } from '../../ISuccessPosDetect';

@Injectable()
export class FactoryPosActionsService {
    constructor(private emailpos: EmailPosDetectHoleService, private rankpos: RankingUpdatePosDetectHoleService) { }

    private posDetectActions: ISuccessPosDetect[] = [
        this.emailpos,
        this.rankpos
    ]

    getPosActions(): ISuccessPosDetect[] {
        const posDetectActions: ISuccessPosDetect[] = [
            this.emailpos,
            this.rankpos
        ]
        return posDetectActions
    }
}
