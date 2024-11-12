import { Column, ForeignKey, Table, Model, DataType } from "sequelize-typescript";
import PlayerTrait from "./player-trait.model";
import Report from "./report.model";

@Table
export default class ReportTrait extends Model<ReportTrait> {
    @ForeignKey(() => PlayerTrait)
    @Column({ type: DataType.UUID })
    traitId: string;

    @ForeignKey(() => Report)
    @Column({ type: DataType.UUID })
    reportId: string;
}